export interface CollectionFilters {
  sets?: string[];
  colors?: string[];
  types?: string[];
  rarities?: string[];
  classifications?: string[];
  characterNames?: string[];
  franchises?: string[];
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  filters: CollectionFilters;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionWithStats extends Collection {
  totalCards: number;
  ownedCards: number;
  completionPercent: number;
}

export interface CollectionCardEntry {
  uniqueId: string;
  name: string;
  artist: string;
  setId: string;
  setName: string;
  cardNum: number;
  color: string;
  type: string;
  rarity: string;
  cost: number;
  inkable: boolean;
  strength?: number;
  willpower?: number;
  lore?: number;
  bodyText?: string;
  flavorText?: string;
  classifications?: string;
  characterName?: string;
  franchise?: string;
  imageUrl: string;
  ownedCount: number;
}

export interface CollectionView {
  collection: Collection;
  cards: CollectionCardEntry[];
  totalCards: number;
  ownedCards: number;
  completionPercent: number;
}
