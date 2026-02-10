import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionsApi } from '../api/collections';
import type { CreateCollectionDto, UpdateCollectionDto } from '@lorcana/shared';

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => collectionsApi.list(),
  });
}

export function useCollectionView(id: string) {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionsApi.getView(id),
    enabled: !!id,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCollectionDto) => collectionsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCollectionDto }) =>
      collectionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => collectionsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}

export function useSetCardOwnership(collectionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, count }: { cardId: string; count: number }) =>
      count > 0
        ? collectionsApi.setCardOwnership(collectionId, cardId, count)
        : collectionsApi.removeCardOwnership(collectionId, cardId),
    onMutate: async ({ cardId, count }) => {
      await queryClient.cancelQueries({ queryKey: ['collection', collectionId] });
      const previous = queryClient.getQueryData(['collection', collectionId]);
      queryClient.setQueryData(['collection', collectionId], (old: any) => {
        if (!old) return old;
        const cards = old.cards.map((c: any) =>
          c.uniqueId === cardId ? { ...c, ownedCount: count } : c,
        );
        const ownedCards = cards.filter((c: any) => c.ownedCount > 0).length;
        return {
          ...old,
          cards,
          ownedCards,
          completionPercent: old.totalCards > 0 ? Math.round((ownedCards / old.totalCards) * 100) : 0,
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['collection', collectionId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['collection'] });
      queryClient.invalidateQueries({ queryKey: ['collections'] });
    },
  });
}
