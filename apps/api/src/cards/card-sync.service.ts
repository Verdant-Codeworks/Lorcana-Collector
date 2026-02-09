import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MikroORM } from '@mikro-orm/core';
import { SqlEntityManager } from '@mikro-orm/postgresql';
import axios from 'axios';
import { CardEntity } from './card.entity';
import { SetEntity } from './set.entity';
import { ConfigService } from '@nestjs/config';

interface LorcanaApiCard {
  Unique_ID: string;
  Name: string;
  Artist: string;
  Set_ID: string;
  Set_Name: string;
  Card_Num: number;
  Color: string;
  Type: string;
  Rarity: string;
  Cost: number;
  Inkable: boolean;
  Strength?: number;
  Willpower?: number;
  Lore?: number;
  Body_Text?: string;
  Flavor_Text?: string;
  Classifications?: string;
  Image: string;
  Date_Added?: string;
  Date_Modified?: string;
}

interface LorcanaApiSet {
  Set_ID: string;
  Name: string;
  Set_Num: number;
  Release_Date?: string;
  Card_Count: number;
}

@Injectable()
export class CardSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CardSyncService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly orm: MikroORM,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get('LORCANA_API_URL', 'https://api.lorcana-api.com');
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
    this.logger.log('Starting card sync...');
    try {
      const em = this.orm.em.fork() as SqlEntityManager;
      await this.syncSets(em);
      await this.syncAllCards(em);
      this.logger.log('Card sync completed successfully');
    } catch (error) {
      this.logger.error('Card sync failed', error instanceof Error ? error.stack : error);
    }
  }

  private async syncSets(em: SqlEntityManager) {
    const { data } = await axios.get<LorcanaApiSet[]>(`${this.apiUrl}/bulk/sets`);
    this.logger.log(`Fetched ${data.length} sets from API`);

    for (const apiSet of data) {
      const existing = await em.findOne(SetEntity, { setId: apiSet.Set_ID });
      if (existing) {
        existing.name = apiSet.Name;
        existing.setNum = apiSet.Set_Num;
        existing.releaseDate = apiSet.Release_Date;
        existing.cardCount = apiSet.Card_Count;
      } else {
        const set = em.create(SetEntity, {
          setId: apiSet.Set_ID,
          name: apiSet.Name,
          setNum: apiSet.Set_Num,
          releaseDate: apiSet.Release_Date,
          cardCount: apiSet.Card_Count,
        });
        em.persist(set);
      }
    }
    await em.flush();
  }

  private async syncAllCards(em: SqlEntityManager) {
    const { data } = await axios.get<LorcanaApiCard[]>(`${this.apiUrl}/bulk/cards`);
    this.logger.log(`Fetched ${data.length} cards from API`);

    const now = new Date();
    const batchSize = 100;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      for (const apiCard of batch) {
        const existing = await em.findOne(CardEntity, { uniqueId: apiCard.Unique_ID });
        const set = await em.findOneOrFail(SetEntity, { setId: apiCard.Set_ID });

        if (existing) {
          existing.name = apiCard.Name;
          existing.artist = apiCard.Artist;
          existing.set = set;
          existing.setName = apiCard.Set_Name;
          existing.cardNum = apiCard.Card_Num;
          existing.color = apiCard.Color;
          existing.type = apiCard.Type;
          existing.rarity = apiCard.Rarity;
          existing.cost = apiCard.Cost;
          existing.inkable = apiCard.Inkable;
          existing.strength = apiCard.Strength;
          existing.willpower = apiCard.Willpower;
          existing.lore = apiCard.Lore;
          existing.bodyText = apiCard.Body_Text;
          existing.flavorText = apiCard.Flavor_Text;
          existing.classifications = apiCard.Classifications;
          existing.imageUrl = apiCard.Image;
          existing.dateAdded = apiCard.Date_Added;
          existing.dateModified = apiCard.Date_Modified;
          existing.syncedAt = now;
        } else {
          const card = em.create(CardEntity, {
            uniqueId: apiCard.Unique_ID,
            name: apiCard.Name,
            artist: apiCard.Artist,
            set,
            setName: apiCard.Set_Name,
            cardNum: apiCard.Card_Num,
            color: apiCard.Color,
            type: apiCard.Type,
            rarity: apiCard.Rarity,
            cost: apiCard.Cost,
            inkable: apiCard.Inkable,
            strength: apiCard.Strength,
            willpower: apiCard.Willpower,
            lore: apiCard.Lore,
            bodyText: apiCard.Body_Text,
            flavorText: apiCard.Flavor_Text,
            classifications: apiCard.Classifications,
            imageUrl: apiCard.Image,
            dateAdded: apiCard.Date_Added,
            dateModified: apiCard.Date_Modified,
            syncedAt: now,
          });
          em.persist(card);
        }
      }
      await em.flush();
      em.clear();
    }
  }
}
