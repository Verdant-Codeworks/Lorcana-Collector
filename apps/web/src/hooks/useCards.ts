import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { cardsApi } from '../api/cards';
import type { CardQueryDto } from '@illumineer-vault/shared';

export function useCards(query: CardQueryDto = {}) {
  return useQuery({
    queryKey: ['cards', query],
    queryFn: () => cardsApi.list(query),
  });
}

export function useInfiniteCards(query: Omit<CardQueryDto, 'page'>) {
  return useInfiniteQuery({
    queryKey: ['cards-infinite', query],
    queryFn: ({ pageParam }) => cardsApi.list({ ...query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
}

export function useCard(uniqueId: string) {
  return useQuery({
    queryKey: ['card', uniqueId],
    queryFn: () => cardsApi.getOne(uniqueId),
    enabled: !!uniqueId,
  });
}

export function useSets() {
  return useQuery({
    queryKey: ['sets'],
    queryFn: () => cardsApi.getSets(),
  });
}

export function useCardFilters() {
  return useQuery({
    queryKey: ['cardFilters'],
    queryFn: () => cardsApi.getFilters(),
  });
}

export function useCharacters(search?: string, franchise?: string) {
  return useQuery({
    queryKey: ['characters', search, franchise],
    queryFn: () => cardsApi.getCharacters(search, franchise),
  });
}
