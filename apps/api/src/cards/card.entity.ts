import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core';
import { SetEntity } from './set.entity';

@Entity({ tableName: 'cards' })
export class CardEntity {
  @PrimaryKey()
  uniqueId!: string;

  @Property()
  name!: string;

  @Property()
  artist!: string;

  @ManyToOne(() => SetEntity, { fieldName: 'set_id' })
  @Index()
  set!: SetEntity;

  @Property()
  setName!: string;

  @Property()
  cardNum!: number;

  @Property()
  @Index()
  color!: string;

  @Property()
  @Index()
  type!: string;

  @Property()
  @Index()
  rarity!: string;

  @Property()
  cost!: number;

  @Property()
  inkable!: boolean;

  @Property({ nullable: true })
  strength?: number;

  @Property({ nullable: true })
  willpower?: number;

  @Property({ nullable: true })
  lore?: number;

  @Property({ nullable: true, type: 'text' })
  bodyText?: string;

  @Property({ nullable: true, type: 'text' })
  flavorText?: string;

  @Property({ nullable: true })
  classifications?: string;

  @Property({ nullable: true })
  @Index()
  characterName?: string;

  @Property({ nullable: true })
  @Index()
  franchise?: string;

  @Property({ length: 512 })
  imageUrl!: string;

  @Property({ nullable: true })
  dateAdded?: string;

  @Property({ nullable: true })
  dateModified?: string;

  @Property()
  syncedAt: Date = new Date();
}
