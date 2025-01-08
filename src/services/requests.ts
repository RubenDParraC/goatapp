import AsyncStorage from "@react-native-async-storage/async-storage";
import { Paths } from "../statics/config";
import { asyncSendApis, type ApiRequestData } from "./services";
import type {
  CategoriesMethodProps,
  FeaturedStoreMethodProps,
  LocationCreateMethodProps,
  LocationDeleteMethodProps,
  LocationsMethodProps,
  LocationUpdateMethodProps,
  LoginMethodProps,
  ProductDetailsMethodProps,
  RegisterMethodProps,
  SearchByCategoryMethodProps,
  SearchBySubcategoryMethodProps,
  searchStoresBySuggestionMethodProps,
  StoreDetailsMethodProps,
  SubcategoriesMethodProps,
  SuggestionSearchMethodProps,
} from "./types";
import {
  ParseCategoriesData,
  ParseLocationsData,
  ParseProductData,
  ParseStoreData,
  ParseStoresData,
  ParseSubCategoriesData,
  ParseSuggestionsData,
  ParseSuggestionsStoresData,
} from "./utils";

export const loginRequest = async ({
  email,
  password,
  setUserToken,
  setIsLoading,
  setIsError,
}: LoginMethodProps) => {
  try {
    const data: ApiRequestData = {
      credentials: "omit",
      method: "POST",
      body: {
        email,
        password,
      },
    };
    const response = await asyncSendApis(`${Paths.login}`, data);
    if (response.status) {
      setIsLoading(false);
      await setUserToken(response.key);
      AsyncStorage.setItem("userToken", response.key);
    } else {
      setIsLoading(false);
      setIsError("Credenciales invalidas, intentelo de nuevo");
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setIsError("Credenciales invalidas, intentelo de nuevo");
  }
};

export const registerRequest = async ({
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword,
  setIsLoading,
  setIsError,
  handlePresentModalPress,
}: RegisterMethodProps) => {
  try {
    const data: ApiRequestData = {
      credentials: "omit",
      method: "POST",
      body: {
        customer: {
          phone,
        },
        email,
        password,
        repeat_password: confirmPassword,
        first_name: firstName,
        last_name: lastName,
      },
    };
    const response = await asyncSendApis(`${Paths.register}`, data);
    console.log(response);
    if (response.status) {
      setIsLoading(false);
      handlePresentModalPress();
    } else {
      setIsLoading(false);
      if (response.email) {
        setIsError("El email ya existe, por favor ingrese un dato valido.");
      } else {
        setIsError(
          "No fue posible realizar el registro, por favor intentelo nuevamente."
        );
      }
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setIsError(
      "No fue posible realizar el registro, por favor intentelo nuevamente."
    );
  }
};

export const categoriesRequest = async ({
  setCategories,
  setLoadingCategories,
}: CategoriesMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(`${Paths.categories}`, data);
    if (response.status) {
      setCategories(ParseCategoriesData(response));
      setLoadingCategories(false);
    } else {
      setLoadingCategories(false);
    }
  } catch (error) {
    setLoadingCategories(false);
    console.log(error);
  }
};

export const featuredStoreRequest = async ({
  setFeaturedStore,
  setLoadingFeaturedStore,
}: FeaturedStoreMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(`${Paths.featured_store}`, data);
    if (response.status) {
      setFeaturedStore(ParseStoresData(response));
      setLoadingFeaturedStore(false);
    } else {
      setLoadingFeaturedStore(false);
    }
  } catch (error) {
    setLoadingFeaturedStore(false);
    console.log(error);
  }
};

export const subcategoriesRequest = async ({
  categoryID,
  setSubcategories,
  setLoadingSubcategories,
}: SubcategoriesMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.subcategories}${categoryID}`,
      data
    );
    if (response.status) {
      setSubcategories(ParseSubCategoriesData(response));
      setLoadingSubcategories(false);
    } else {
      setLoadingSubcategories(false);
    }
  } catch (error) {
    setLoadingSubcategories(false);
    console.log(error);
  }
};

export const searchByCategoryRequest = async ({
  categoryID,
  setStoreData,
  setLoadingStoreData,
}: SearchByCategoryMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.search_by_category}${categoryID}`,
      data
    );
    if (response.status) {
      setStoreData(ParseStoresData(response));
      setLoadingStoreData(false);
    } else {
      setLoadingStoreData(false);
    }
  } catch (error) {
    setLoadingStoreData(false);
    console.log(error);
  }
};

export const searchBySubcategoryRequest = async ({
  subcategoryID,
  setStoreData,
  setLoadingStoreData,
}: SearchBySubcategoryMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.search_by_subcategory}${subcategoryID}`,
      data
    );
    if (response.status) {
      setStoreData(ParseStoresData(response));
      setLoadingStoreData(false);
    } else {
      setLoadingStoreData(false);
    }
  } catch (error) {
    setLoadingStoreData(false);
    console.log(error);
  }
};

export const suggestionSearch = async ({
  signal,
  currentText,
  setSuggestionsData,
  setLoadingSuggestions,
  setSuggestionsStoresData,
}: SuggestionSearchMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      signal,
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.search_suggestions}${currentText}`,
      data
    );
    if (response.status) {
      setSuggestionsStoresData(ParseSuggestionsStoresData(response.store));
      setSuggestionsData(ParseSuggestionsData(response.suggestion_word));
      setLoadingSuggestions(false);
    } else {
      setLoadingSuggestions(false);
    }
  } catch (error) {
    setLoadingSuggestions(false);
    console.log(error);
  }
};

export const searchStoresBySuggestionRequest = async ({
  suggestion,
  setStoreData,
  setLoadingStoreData,
}: searchStoresBySuggestionMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.search_by_suggestions}${suggestion}`,
      data
    );
    if (response.status) {
      setStoreData(ParseStoresData(response));
      setLoadingStoreData(false);
    } else {
      setLoadingStoreData(false);
    }
  } catch (error) {
    setLoadingStoreData(false);
    console.log(error);
  }
};

export const storeDetailsRequest = async ({
  storeID,
  setStoreData,
  setLoadingStoreData,
}: StoreDetailsMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.store_details}${storeID}`,
      data
    );
    if (response.status) {
      setStoreData(ParseStoreData(response));
      setLoadingStoreData(false);
    } else {
      setLoadingStoreData(false);
    }
  } catch (error) {
    setLoadingStoreData(false);
    console.log(error);
  }
};

export const productDetailsRequest = async ({
  productID,
  setProductData,
  setLoadingProductData,
}: ProductDetailsMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.product_details}${productID}`,
      data
    );
    if (response.status) {
      setProductData(ParseProductData(response));
      setLoadingProductData(false);
    } else {
      setLoadingProductData(false);
    }
  } catch (error) {
    setLoadingProductData(false);
    console.log(error);
  }
};

export const locationsRequest = async ({
  setLocations,
  setLoadingLocations,
}: LocationsMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "GET",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(`${Paths.locations}`, data);
    if (response.status) {
      setLocations(ParseLocationsData(response));
      setLoadingLocations(false);
    } else {
      setLoadingLocations(false);
    }
  } catch (error) {
    setLoadingLocations(false);
    console.log(error);
  }
};

export const deleteLocationRequest = async ({
  locationID,
  setLoadingDeleteLocation,
}: LocationDeleteMethodProps) => {
  try {
    setLoadingDeleteLocation(true);
    const data: ApiRequestData = {
      method: "DELETE",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
    };
    const response = await asyncSendApis(
      `${Paths.locations}/${locationID}`,
      data
    );
    if (response.status) {
      setLoadingDeleteLocation(false);
    } else {
      setLoadingDeleteLocation(false);
    }
  } catch (error) {
    setLoadingDeleteLocation(false);
    console.log(error);
  }
};

export const locationCreateRequest = async ({
  name,
  address,
  description,
  setIsError,
  setIsLoading,
  onNavigation,
}: LocationCreateMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "POST",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
      body: {
        name,
        address,
        description,
        ak: "coords",
      },
    };
    const response = await asyncSendApis(`${Paths.locations}`, data);
    if (response.status) {
      setIsLoading(false);
      onNavigation();
    } else {
      console.log(response);
      setIsLoading(false);
      setIsError(
        "Ocurrio un error al crear la ubicación, intentelo nuevamente."
      );
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setIsError("Ocurrio un error al crear la ubicación, intentelo nuevamente.");
  }
};

export const locationUpdateRequest = async ({
  id,
  name,
  address,
  description,
  setIsError,
  setIsLoading,
  onNavigation,
}: LocationUpdateMethodProps) => {
  try {
    const data: ApiRequestData = {
      method: "PATCH",
      token: (await AsyncStorage.getItem("userToken")) ?? "",
      body: {
        name,
        address,
        description,
        ak: "coords",
      },
    };
    const response = await asyncSendApis(`${Paths.locations}/${id}`, data);
    if (response.status) {
      setIsLoading(false);
      onNavigation();
    } else {
      console.log(response);
      setIsLoading(false);
      setIsError(
        "Ocurrio un error al actualizar la ubicación, intentelo nuevamente."
      );
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setIsError(
      "Ocurrio un error al actualizar la ubicación, intentelo nuevamente."
    );
  }
};
