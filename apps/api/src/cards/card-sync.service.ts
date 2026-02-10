import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MikroORM } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import axios from 'axios';
import { CardEntity } from './card.entity';
import { SetEntity } from './set.entity';
import { ConfigService } from '@nestjs/config';
import { franchiseMap } from './franchise-map';

interface LorcastSet {
  id: string;
  name: string;
  code: string;
  released_at: string;
  prereleased_at?: string;
}

interface LorcastCard {
  id: string;
  name: string;
  version: string;
  layout: string;
  released_at: string;
  image_uris: {
    digital: {
      small: string;
      normal: string;
      large: string;
    };
  };
  cost: number;
  inkwell: boolean;
  ink: string | null;
  type: string[];
  classifications: string[] | null;
  text: string;
  move_cost: number | null;
  strength: number | null;
  willpower: number | null;
  lore: number | null;
  rarity: string;
  illustrators: string[];
  collector_number: string;
  lang: string;
  flavor_text: string | null;
  tcgplayer_id: number;
  legalities: {
    core: string;
  };
  set: {
    id: string;
    code: string;
    name: string;
  };
  prices: {
    usd: string | null;
    usd_foil: string | null;
  };
}

interface LorcastResponse<T> {
  results: T[];
}

@Injectable()
export class CardSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CardSyncService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly orm: MikroORM,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('LORCAST_API_URL', 'https://api.lorcast.com/v0');
  }

  async onApplicationBootstrap() {
    const em = this.orm.em.fork() as SqlEntityManager;
    const count = await em.count(CardEntity);
    if (count === 0) {
      this.logger.log('No cards in DB, running initial sync...');
      await this.syncCards();
    }
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async syncCards() {
    this.logger.log('Starting card sync from Lorcast...');
    try {
      const em = this.orm.em.fork() as SqlEntityManager;
      const sets = await this.syncSets(em);
      await this.syncAllCards(em, sets);
      this.logger.log('Card sync completed successfully');
    } catch (error) {
      this.logger.error('Card sync failed', error instanceof Error ? error.stack : error);
    }
  }

  private async syncSets(em: SqlEntityManager): Promise<LorcastSet[]> {
    const { data } = await axios.get<LorcastResponse<LorcastSet>>(`${this.apiUrl}/sets`);
    const sets = data.results;
    this.logger.log(`Fetched ${sets.length} sets from Lorcast`);

    for (let i = 0; i < sets.length; i++) {
      const apiSet = sets[i];
      const existing = await em.findOne(SetEntity, { setId: apiSet.code });
      if (existing) {
        existing.name = apiSet.name;
        existing.setNum = i + 1;
        existing.releaseDate = apiSet.released_at;
      } else {
        const set = em.create(SetEntity, {
          setId: apiSet.code,
          name: apiSet.name,
          setNum: i + 1,
          releaseDate: apiSet.released_at,
          cardCount: 0,
        });
        em.persist(set);
      }
    }
    await em.flush();
    return sets;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async syncAllCards(em: SqlEntityManager, sets: LorcastSet[]) {
    const now = new Date();
    let totalCards = 0;

    for (const apiSet of sets) {
      await this.delay(100);

      const { data } = await axios.get<LorcastCard[]>(
        `${this.apiUrl}/sets/${apiSet.code}/cards`,
      );
      const cards = data;
      this.logger.log(`Fetched ${cards.length} cards for set "${apiSet.name}" (${apiSet.code})`);

      const set = await em.findOneOrFail(SetEntity, { setId: apiSet.code });
      set.cardCount = cards.length;

      for (const apiCard of cards) {
        const existing = await em.findOne(CardEntity, { uniqueId: apiCard.id });
        const characterName = apiCard.version ? apiCard.name : undefined;
        const franchise = characterName ? franchiseMap[characterName] : undefined;

        const cardData = {
          name: apiCard.name,
          artist: apiCard.illustrators.join(', '),
          set,
          setName: apiCard.set.name,
          cardNum: apiCard.collector_number.padStart(4, '0'),
          color: apiCard.ink ?? '',
          type: apiCard.type.join(', '),
          rarity: apiCard.rarity.replace(/_/g, ' '),
          cost: apiCard.cost,
          inkable: apiCard.inkwell,
          strength: apiCard.strength ?? undefined,
          willpower: apiCard.willpower ?? undefined,
          lore: apiCard.lore ?? undefined,
          bodyText: apiCard.text || undefined,
          flavorText: apiCard.flavor_text ?? undefined,
          classifications: apiCard.classifications?.join(', ') || undefined,
          characterName,
          franchise,
          imageUrl: apiCard.image_uris.digital.large,
          version: apiCard.version || undefined,
          layout: apiCard.layout || undefined,
          moveCost: apiCard.move_cost ?? undefined,
          legality: apiCard.legalities.core || undefined,
          priceUsd: apiCard.prices.usd ?? undefined,
          priceUsdFoil: apiCard.prices.usd_foil ?? undefined,
          tcgplayerId: apiCard.tcgplayer_id ?? undefined,
          dateAdded: undefined,
          dateModified: undefined,
          syncedAt: now,
        };

        if (existing) {
          Object.assign(existing, cardData);
        } else {
          const card = em.create(CardEntity, {
            uniqueId: apiCard.id,
            ...cardData,
          });
          em.persist(card);
        }
      }

      await em.flush();
      em.clear();
      totalCards += cards.length;
    }

    this.logger.log(`Synced ${totalCards} total cards across ${sets.length} sets`);
  }
}
