import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CollectionEntity } from './collection.entity';
import { CollectionCardEntity } from './collection-card.entity';
import { CardEntity } from '../cards/card.entity';
import { CardsService } from '../cards/cards.service';
import { UserEntity } from '../users/user.entity';
import type {
  CollectionWithStats,
  CollectionView,
  CollectionCardEntry,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '@lorcana/shared';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly em: EntityManager,
    private readonly cardsService: CardsService,
  ) {}

  async findAllForUser(user: UserEntity): Promise<CollectionWithStats[]> {
    const collections = await this.em.find(CollectionEntity, { user });
    const results: CollectionWithStats[] = [];

    for (const col of collections) {
      const stats = await this.getCollectionStats(col);
      results.push({
        id: col.id,
        name: col.name,
        description: col.description,
        filters: col.filters,
        createdAt: col.createdAt?.toISOString() || '',
        updatedAt: col.updatedAt?.toISOString() || '',
        ...stats,
      });
    }

    return results;
  }

  async create(user: UserEntity, dto: CreateCollectionDto): Promise<CollectionWithStats> {
    const collection = this.em.create(CollectionEntity, {
      user,
      name: dto.name,
      description: dto.description,
      filters: dto.filters,
    });
    await this.em.persistAndFlush(collection);

    const stats = await this.getCollectionStats(collection);
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      filters: collection.filters,
      createdAt: collection.createdAt?.toISOString() || '',
      updatedAt: collection.updatedAt?.toISOString() || '',
      ...stats,
    };
  }

  async findOneView(collectionId: string, user: UserEntity): Promise<CollectionView> {
    const collection = await this.em.findOne(CollectionEntity, { id: collectionId });
    if (!collection) throw new NotFoundException('Collection not found');
    if (collection.user !== user && collection.user?.id !== user.id) {
      await this.em.populate(collection, ['user']);
      if (collection.user.id !== user.id) throw new ForbiddenException();
    }

    const where = this.cardsService.buildFilterQuery(collection.filters);
    const matchingCards = await this.em.find(CardEntity, where, {
      orderBy: { cardNum: 'asc' },
      populate: ['set'],
    });

    const ownedMap = new Map<string, number>();
    const ownedRecords = await this.em.find(CollectionCardEntity, { collection });
    for (const cc of ownedRecords) {
      await this.em.populate(cc, ['card']);
      ownedMap.set(cc.card.uniqueId, cc.count);
    }

    const cards: CollectionCardEntry[] = matchingCards.map((c) => ({
      ...this.cardsService.toDto(c),
      ownedCount: ownedMap.get(c.uniqueId) || 0,
    }));

    const totalCards = cards.length;
    const ownedCards = cards.filter((c) => c.ownedCount > 0).length;

    return {
      collection: {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        filters: collection.filters,
        createdAt: collection.createdAt?.toISOString() || '',
        updatedAt: collection.updatedAt?.toISOString() || '',
      },
      cards,
      totalCards,
      ownedCards,
      completionPercent: totalCards > 0 ? Math.round((ownedCards / totalCards) * 100) : 0,
    };
  }

  async update(collectionId: string, user: UserEntity, dto: UpdateCollectionDto): Promise<CollectionWithStats> {
    const collection = await this.findOwnedCollection(collectionId, user);
    if (dto.name !== undefined) collection.name = dto.name;
    if (dto.description !== undefined) collection.description = dto.description;
    if (dto.filters !== undefined) collection.filters = dto.filters;
    await this.em.flush();

    const stats = await this.getCollectionStats(collection);
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      filters: collection.filters,
      createdAt: collection.createdAt?.toISOString() || '',
      updatedAt: collection.updatedAt?.toISOString() || '',
      ...stats,
    };
  }

  async remove(collectionId: string, user: UserEntity): Promise<void> {
    const collection = await this.findOwnedCollection(collectionId, user);
    await this.em.nativeDelete(CollectionCardEntity, { collection });
    await this.em.removeAndFlush(collection);
  }

  async setCardOwnership(
    collectionId: string,
    cardId: string,
    user: UserEntity,
    count: number,
  ): Promise<void> {
    const collection = await this.findOwnedCollection(collectionId, user);
    const card = await this.em.findOne(CardEntity, { uniqueId: cardId });
    if (!card) throw new NotFoundException('Card not found');

    let cc = await this.em.findOne(CollectionCardEntity, { collection, card });
    if (count <= 0) {
      if (cc) await this.em.removeAndFlush(cc);
      return;
    }

    if (cc) {
      cc.count = count;
    } else {
      cc = this.em.create(CollectionCardEntity, { collection, card, count });
      this.em.persist(cc);
    }
    await this.em.flush();
  }

  async removeCardOwnership(collectionId: string, cardId: string, user: UserEntity): Promise<void> {
    return this.setCardOwnership(collectionId, cardId, user, 0);
  }

  private async findOwnedCollection(collectionId: string, user: UserEntity): Promise<CollectionEntity> {
    const collection = await this.em.findOne(CollectionEntity, { id: collectionId }, { populate: ['user'] });
    if (!collection) throw new NotFoundException('Collection not found');
    if (collection.user.id !== user.id) throw new ForbiddenException();
    return collection;
  }

  private async getCollectionStats(collection: CollectionEntity) {
    const where = this.cardsService.buildFilterQuery(collection.filters);
    const totalCards = await this.em.count(CardEntity, where);
    const ownedCards = await this.em.count(CollectionCardEntity, { collection });
    return {
      totalCards,
      ownedCards,
      completionPercent: totalCards > 0 ? Math.round((ownedCards / totalCards) * 100) : 0,
    };
  }
}
