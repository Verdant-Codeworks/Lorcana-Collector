import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import type { CreateCollectionDto, UpdateCollectionDto, SetCardOwnershipDto } from '@lorcana/shared';

@Controller('api/collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  findAll(@CurrentUser() user: UserEntity) {
    return this.collectionsService.findAllForUser(user);
  }

  @Post()
  create(@CurrentUser() user: UserEntity, @Body() dto: CreateCollectionDto) {
    return this.collectionsService.create(user, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.collectionsService.findOneView(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(id, user, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.collectionsService.remove(id, user);
  }

  @Post(':id/cards/:cardId')
  setOwnership(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: SetCardOwnershipDto,
  ) {
    return this.collectionsService.setCardOwnership(id, cardId, user, dto.count);
  }

  @Delete(':id/cards/:cardId')
  removeOwnership(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.collectionsService.removeCardOwnership(id, cardId, user);
  }
}
