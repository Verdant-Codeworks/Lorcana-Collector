import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/postgresql';
import { CardEntity } from './card.entity';
import { SetEntity } from './set.entity';
import type { CardQueryDto, PaginatedResponse, Card, CardFiltersResponse, SetInfo } from '@lorcana/shared';

@Injectable()
export class CardsService {
  constructor(private readonly em: EntityManager) {}

  async findAll(query: CardQueryDto): Promise<PaginatedResponse<Card>> {
    const page = query.page || 1;
    const pageSize = Math.min(query.pageSize || 20, 100);
    const where: FilterQuery<CardEntity> = {};

    if (query.sets?.length) {
      where.set = { setId: { $in: query.sets } };
    }
    if (query.colors?.length) {
      where.color = { $in: query.colors };
    }
    if (query.types?.length) {
      where.type = { $in: query.types };
    }
    if (query.rarities?.length) {
      where.rarity = { $in: query.rarities };
    }
    if (query.classifications?.length) {
      where.classifications = { $re: query.classifications.join('|') };
    }
    if (query.search) {
      where.name = { $ilike: `%${query.search}%` };
    }

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    if (query.sort) {
      const [field, dir] = query.sort.split(':');
      orderBy[field] = (dir as 'asc' | 'desc') || 'asc';
    } else {
      orderBy.cardNum = 'asc';
    }

    const [cards, total] = await this.em.findAndCount(CardEntity, where, {
      orderBy,
      limit: pageSize,
      offset: (page - 1) * pageSize,
      populate: ['set'],
    });

    return {
      data: cards.map((c) => this.toDto(c)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async findOne(uniqueId: string): Promise<Card | null> {
    const card = await this.em.findOne(CardEntity, { uniqueId }, { populate: ['set'] });
    return card ? this.toDto(card) : null;
  }

  async findSets(): Promise<SetInfo[]> {
    const sets = await this.em.findAll(SetEntity, { orderBy: { setNum: 'asc' } });
    return sets.map((s) => ({
      setId: s.setId,
      name: s.name,
      setNum: s.setNum,
      releaseDate: s.releaseDate,
      cardCount: s.cardCount,
    }));
  }

  async findFilters(): Promise<CardFiltersResponse> {
    const knex = this.em.getKnex();

    const [colors, types, rarities, classifications] = await Promise.all([
      knex('cards').distinct('color').orderBy('color').then((r) => r.map((row) => row.color)),
      knex('cards').distinct('type').orderBy('type').then((r) => r.map((row) => row.type)),
      knex('cards').distinct('rarity').orderBy('rarity').then((r) => r.map((row) => row.rarity)),
      knex('cards').distinct('classifications')
        .whereNotNull('classifications')
        .where('classifications', '!=', '')
        .orderBy('classifications')
        .then((r) => {
          const all = new Set<string>();
          r.forEach((row) => {
            if (row.classifications) {
              row.classifications.split(',').forEach((c: string) => all.add(c.trim()));
            }
          });
          return Array.from(all).sort();
        }),
    ]);

    return { colors, types, rarities, classifications };
  }

  buildFilterQuery(filters: {
    sets?: string[];
    colors?: string[];
    types?: string[];
    rarities?: string[];
    classifications?: string[];
  }): FilterQuery<CardEntity> {
    const where: FilterQuery<CardEntity> = {};
    if (filters.sets?.length) {
      where.set = { setId: { $in: filters.sets } };
    }
    if (filters.colors?.length) {
      where.color = { $in: filters.colors };
    }
    if (filters.types?.length) {
      where.type = { $in: filters.types };
    }
    if (filters.rarities?.length) {
      where.rarity = { $in: filters.rarities };
    }
    if (filters.classifications?.length) {
      where.classifications = { $re: filters.classifications.join('|') };
    }
    return where;
  }

  toDto(card: CardEntity): Card {
    return {
      uniqueId: card.uniqueId,
      name: card.name,
      artist: card.artist,
      setId: card.set.setId,
      setName: card.setName,
      cardNum: card.cardNum,
      color: card.color,
      type: card.type,
      rarity: card.rarity,
      cost: card.cost,
      inkable: card.inkable,
      strength: card.strength,
      willpower: card.willpower,
      lore: card.lore,
      bodyText: card.bodyText,
      flavorText: card.flavorText,
      classifications: card.classifications,
      imageUrl: card.imageUrl,
      dateAdded: card.dateAdded,
      dateModified: card.dateModified,
      syncedAt: card.syncedAt.toISOString(),
    };
  }
}
