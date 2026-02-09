export interface Card {
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
  imageUrl: string;
  dateAdded?: string;
  dateModified?: string;
  syncedAt: string;
}

export interface SetInfo {
  setId: string;
  name: string;
  setNum: number;
  releaseDate?: string;
  cardCount: number;
}
