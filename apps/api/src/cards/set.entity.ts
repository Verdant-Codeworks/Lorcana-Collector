import { Entity, PrimaryKey, Property, Collection, OneToMany } from '@mikro-orm/core';
import { CardEntity } from './card.entity';

@Entity({ tableName: 'sets' })
export class SetEntity {
  @PrimaryKey()
  setId!: string;

  @Property()
  name!: string;

  @Property()
  setNum!: number;

  @Property({ nullable: true })
  releaseDate?: string;

  @Property({ default: 0 })
  cardCount: number = 0;

  @OneToMany(() => CardEntity, (card) => card.set)
  cards = new Collection<CardEntity>(this);
}
