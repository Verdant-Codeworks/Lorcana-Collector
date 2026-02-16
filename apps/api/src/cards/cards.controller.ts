import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardSyncService } from './card-sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CardQueryDto } from '@illumineer-vault/shared';

@Controller('api/cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cardSyncService: CardSyncService,
  ) {}

  @Get()
  async findAll(
    @Query('sets') sets?: string,
    @Query('colors') colors?: string,
    @Query('types') types?: string,
    @Query('rarities') rarities?: string,
    @Query('classifications') classifications?: string,
    @Query('characterNames') characterNames?: string,
    @Query('franchises') franchises?: string,
    @Query('artists') artists?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('sort') sort?: string,
  ) {
    const query: CardQueryDto = {
      sets: sets ? sets.split(',') : undefined,
      colors: colors ? colors.split(',') : undefined,
      types: types ? types.split(',') : undefined,
      rarities: rarities ? rarities.split(',') : undefined,
      classifications: classifications ? classifications.split(',') : undefined,
      characterNames: characterNames ? characterNames.split(',') : undefined,
      franchises: franchises ? franchises.split(',') : undefined,
      artists: artists ? artists.split(',') : undefined,
      search,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      sort,
    };
    return this.cardsService.findAll(query);
  }

  @Get('sets')
  async findSets() {
    return this.cardsService.findSets();
  }

  @Get('filters')
  async findFilters() {
    return this.cardsService.findFilters();
  }

  @Get('characters')
  async findCharacters(
    @Query('search') search?: string,
    @Query('franchise') franchise?: string,
  ) {
    return this.cardsService.findCharacters(search, franchise);
  }

  @Post('sync')
  async sync() {
    await this.cardSyncService.syncCards();
    return { message: 'Card sync completed' };
  }

  @Get(':uniqueId')
  async findOne(@Param('uniqueId') uniqueId: string) {
    const card = await this.cardsService.findOne(uniqueId);
    if (!card) {
      throw new NotFoundException(`Card ${uniqueId} not found`);
    }
    return card;
  }
}
