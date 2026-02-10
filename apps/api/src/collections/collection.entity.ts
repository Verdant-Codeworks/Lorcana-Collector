import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserEntity } from '../users/user.entity';
import type { CollectionFilters } from '@lorcana/shared';

@Entity({ tableName: 'collections' })
export class CollectionEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: 'json' })
  filters: CollectionFilters = {};

  @Property({ nullable: true })
  createdAt?: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
