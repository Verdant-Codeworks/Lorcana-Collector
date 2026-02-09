import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardSyncService } from './card-sync.service';
import { CardEntity } from './card.entity';
import { SetEntity } from './set.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CardEntity, SetEntity])],
  controllers: [CardsController],
  providers: [CardsService, CardSyncService],
  exports: [CardsService],
})
export class CardsModule {}
