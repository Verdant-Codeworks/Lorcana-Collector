import { api } from './client';
import type {
  CollectionWithStats,
  CollectionView,
  CreateCollectionDto,
  UpdateCollectionDto,
} from '@illumineer-vault/shared';

export const collectionsApi = {
  list: () =>
    api.get<CollectionWithStats[]>('/collections').then((r) => r.data),

  create: (data: CreateCollectionDto) =>
    api.post<CollectionWithStats>('/collections', data).then((r) => r.data),

  getView: (id: string) =>
    api.get<CollectionView>(`/collections/${id}`).then((r) => r.data),

  update: (id: string, data: UpdateCollectionDto) =>
    api.patch<CollectionWithStats>(`/collections/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    api.delete(`/collections/${id}`).then((r) => r.data),

  setCardOwnership: (collectionId: string, cardId: string, count: number) =>
    api.post(`/collections/${collectionId}/cards/${cardId}`, { count }).then((r) => r.data),

  removeCardOwnership: (collectionId: string, cardId: string) =>
    api.delete(`/collections/${collectionId}/cards/${cardId}`).then((r) => r.data),
};
