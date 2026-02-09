export interface Card {
  uniqueId: string;
  name: string;
  artist: string;
  setId: string;
  setName: string;
  cardNum: string;
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
  version?: string;
  layout?: string;
  moveCost?: number;
  legality?: string;
  priceUsd?: string;
  priceUsdFoil?: string;
  tcgplayerId?: number;
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
