import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from '../users/user.entity';
import { CardEntity } from '../cards/card.entity';

@Entity({ tableName: 'user_cards' })
@Unique({ properties: ['user', 'card'] })
export class UserCardEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @ManyToOne(() => CardEntity)
  card!: CardEntity;

  @Property({ default: 1 })
  count: number = 1;

  @Property({ nullable: true })
  addedAt?: Date = new Date();
}
