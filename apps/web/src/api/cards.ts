import { api } from './client';
import type { Card, SetInfo, PaginatedResponse, CardFiltersResponse, CardQueryDto, CharacterDiscoveryResponse } from '@illumineer-vault/shared';

export const cardsApi = {
  list: (query: CardQueryDto = {}) => {
    const params = new URLSearchParams();
    if (query.sets?.length) params.set('sets', query.sets.join(','));
    if (query.colors?.length) params.set('colors', query.colors.join(','));
    if (query.types?.length) params.set('types', query.types.join(','));
    if (query.rarities?.length) params.set('rarities', query.rarities.join(','));
    if (query.classifications?.length) params.set('classifications', query.classifications.join(','));
    if (query.characterNames?.length) params.set('characterNames', query.characterNames.join(','));
    if (query.franchises?.length) params.set('franchises', query.franchises.join(','));
    if (query.artists?.length) params.set('artists', query.artists.join(','));
    if (query.search) params.set('search', query.search);
    if (query.page) params.set('page', String(query.page));
    if (query.pageSize) params.set('pageSize', String(query.pageSize));
    if (query.sort) params.set('sort', query.sort);
    return api.get<PaginatedResponse<Card>>(`/cards?${params}`).then((r) => r.data);
  },

  getOne: (uniqueId: string) =>
    api.get<Card>(`/cards/${uniqueId}`).then((r) => r.data),

  getSets: () =>
    api.get<SetInfo[]>('/cards/sets').then((r) => r.data),

  getFilters: () =>
    api.get<CardFiltersResponse>('/cards/filters').then((r) => r.data),

  getCharacters: (search?: string, franchise?: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (franchise) params.set('franchise', franchise);
    return api.get<CharacterDiscoveryResponse>(`/cards/characters?${params}`).then((r) => r.data);
  },
};
