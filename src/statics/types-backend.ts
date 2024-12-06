export type CategoriesType = {
  id: string | number;
  title: string;
  image?: string | null | undefined;
  priority: boolean;
  state: number;
};

export type ProductType = {
  id: string | number;
  name: string;
  description: string;
  image?: string | null | undefined;
  price: string | number;
  quantity: number;
  rank: number;
};

export type StoreType = {
  id: string | number;
  name: string;
  image?: string | null | undefined;
  address?: string | null | undefined;
  description: string;
  products: ProductType[];
};

export type SubCategoriesType = {
  id: string | number;
  title: string;
  image?: string | null | undefined;
  category: number;
  state: number;
};

export type SuggestionType = {
  name: string;
  similarity: number;
};

export type SuggestionStoreType = {
  user_id: string | number;
  name: string;
};
