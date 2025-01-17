import type {
  CategoriesType,
  LocationType,
  ProductType,
  StoreType,
  SubCategoriesType,
  SuggestionStoreType,
  SuggestionType,
} from "../statics/types-backend";
import type { ApiResponse } from "./services";

export function ParseCategoriesData(data: ApiResponse): CategoriesType[] {
  const categories: CategoriesType[] = data.map(
    ({ id, title, image, priority, state }: CategoriesType) => ({
      id,
      title,
      image,
      priority,
      state,
    })
  );
  return categories;
}

export function ParseStoresData(data: ApiResponse): StoreType[] {
  const stores: StoreType[] = data.map(
    ({ id, name, image, description, products }: StoreType) => ({
      id,
      name,
      image,
      description,
      products: products.map(
        ({
          id,
          name,
          description,
          image,
          price,
          quantity,
          rank,
        }: ProductType) => ({
          id,
          name,
          description,
          image,
          price,
          quantity,
          rank,
        })
      ),
    })
  );
  return stores;
}

export function ParseStoreData(store: ApiResponse): StoreType {
  const { id, name, image, description, products, address } = store;
  const parsedStore: StoreType = {
    id,
    name,
    image,
    description,
    address,
    products: products.map(
      ({
        id,
        name,
        description,
        image,
        price,
        quantity,
        rank,
      }: ProductType) => ({
        id,
        name,
        description,
        image,
        price,
        quantity,
        rank,
      })
    ),
  };
  return parsedStore;
}

export function ParseSubCategoriesData(data: ApiResponse): SubCategoriesType[] {
  const subCategories: SubCategoriesType[] = data.map(
    ({ id, title, image, category, state }: SubCategoriesType) => ({
      id,
      title,
      image,
      category,
      state,
    })
  );
  return subCategories;
}

export function ParseSuggestionsData(data: ApiResponse): SuggestionType[] {
  const suggestions: SuggestionType[] = data.map(
    ({ name, similarity }: SuggestionType) => ({
      name,
      similarity,
    })
  );
  return suggestions;
}

export function ParseSuggestionsStoresData(
  data: ApiResponse
): SuggestionStoreType[] {
  const suggestions: SuggestionStoreType[] = data.map(
    ({ name, id }: SuggestionStoreType) => ({
      name,
      id,
    })
  );
  return suggestions;
}

export function ParseProductData({
  id,
  name,
  description,
  image,
  price,
  quantity,
  percentage_discount,
}: ApiResponse): ProductType {
  return {
    id,
    name,
    description,
    image: image || null,
    price,
    quantity,
    rank: 0,
    percentage_discount: percentage_discount || "0",
  };
}

export function ParseLocationsData(data: ApiResponse): LocationType[] {
  const locations: LocationType[] = data.map(
    ({
      id,
      name,
      ak,
      address,
      description,
      user,
      city,
      state,
    }: LocationType) => ({
      id,
      name,
      ak,
      address,
      description,
      user,
      city,
      state,
    })
  );
  return locations;
}
