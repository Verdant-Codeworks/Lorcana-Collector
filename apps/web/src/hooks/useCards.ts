import { useQuery } from '@tanstack/react-query';
import { cardsApi } from '../api/cards';
import type { CardQueryDto } from '@lorcana/shared';

export function useCards(query: CardQueryDto = {}) {
  return useQuery({
    queryKey: ['cards', query],
    queryFn: () => cardsApi.list(query),
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
