import type {
  CategoriesType,
  StoreType,
  SubCategoriesType,
  SuggestionStoreType,
  SuggestionType,
} from "../statics/types-backend";

export type LoginMethodProps = {
  email: string;
  password: string;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
};

export type RegisterMethodProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  handlePresentModalPress: () => void;
};

export type CategoriesMethodProps = {
  setCategories: React.Dispatch<
    React.SetStateAction<CategoriesType[] | undefined>
  >;
  setLoadingCategories: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FeaturedStoreMethodProps = {
  setFeaturedStore: React.Dispatch<
    React.SetStateAction<StoreType[] | undefined>
  >;
  setLoadingFeaturedStore: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SubcategoriesMethodProps = {
  categoryID: string | number;
  setSubcategories: React.Dispatch<
    React.SetStateAction<SubCategoriesType[] | undefined>
  >;
  setLoadingSubcategories: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SearchByCategoryMethodProps = {
  categoryID: string | number;
  setStoreData: React.Dispatch<React.SetStateAction<StoreType[] | undefined>>;
  setLoadingStoreData: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SearchBySubcategoryMethodProps = {
  subcategoryID: string | number;
  setStoreData: React.Dispatch<React.SetStateAction<StoreType[] | undefined>>;
  setLoadingStoreData: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SuggestionSearchMethodProps = {
  currentText: string;
  signal: AbortSignal;
  setSuggestionsData: React.Dispatch<
    React.SetStateAction<SuggestionType[] | undefined>
  >;
  setLoadingSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  setSuggestionsStoresData: React.Dispatch<
    React.SetStateAction<SuggestionStoreType[] | undefined>
  >;
};

export type searchStoresBySuggestionMethodProps = {
  suggestion: string;
  setStoreData: React.Dispatch<React.SetStateAction<StoreType[] | undefined>>;
  setLoadingStoreData: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StoreDetailsMethodProps = {
  storeID: string;
  setStoreData: React.Dispatch<React.SetStateAction<StoreType | undefined>>;
  setLoadingStoreData: React.Dispatch<React.SetStateAction<boolean>>;
};