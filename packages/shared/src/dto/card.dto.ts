export interface CardQueryDto {
  sets?: string[];
  colors?: string[];
  types?: string[];
  rarities?: string[];
  classifications?: string[];
  characterNames?: string[];
  franchises?: string[];
  artists?: string[];
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface CardFiltersResponse {
  colors: string[];
  types: string[];
  rarities: string[];
  classifications: string[];
  characterNames: string[];
  franchises: string[];
  artists: string[];
}

export interface CharacterInfo {
  name: string;
  franchise?: string;
  cardCount: number;
  imageUrl: string;
}

export interface CharacterDiscoveryResponse {
  characters: CharacterInfo[];
  franchises: { name: string; characterCount: number }[];
}
