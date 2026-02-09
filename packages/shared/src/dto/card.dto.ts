export interface CardQueryDto {
  sets?: string[];
  colors?: string[];
  types?: string[];
  rarities?: string[];
  classifications?: string[];
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
}
