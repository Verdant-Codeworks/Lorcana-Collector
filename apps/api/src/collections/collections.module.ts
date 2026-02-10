import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionEntity } from './collection.entity';
import { UserCardEntity } from './user-card.entity';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([CollectionEntity, UserCardEntity]),
    CardsModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
