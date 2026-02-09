import type { CollectionFilters } from '../types/collection.js';

export interface CreateCollectionDto {
  name: string;
  description?: string;
  filters: CollectionFilters;
}

export interface UpdateCollectionDto {
  name?: string;
  description?: string;
  filters?: CollectionFilters;
}

export interface SetCardOwnershipDto {
  count: number;
}
