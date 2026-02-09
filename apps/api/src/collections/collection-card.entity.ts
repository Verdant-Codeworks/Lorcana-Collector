import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { CollectionEntity } from './collection.entity';
import { CardEntity } from '../cards/card.entity';

@Entity({ tableName: 'collection_cards' })
@Unique({ properties: ['collection', 'card'] })
export class CollectionCardEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => CollectionEntity)
  collection!: CollectionEntity;

  @ManyToOne(() => CardEntity)
  card!: CardEntity;

  @Property({ default: 1 })
  count: number = 1;

  @Property({ nullable: true })
  addedAt?: Date = new Date();
}
