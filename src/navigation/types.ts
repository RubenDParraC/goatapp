import type { CategoriesType, LocationType } from "../statics/types-backend";

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Search: { category: CategoriesType };
  SearchText: undefined;
  Categories: undefined;
  ProductDetails: { productID: string };
  StoreDetails: { storeID: string };
  ProfileHome: undefined;
  LocationDetails: { location: LocationType | undefined | null };
  LocationList: undefined;
  OrderDetails: undefined;
  OrderList: undefined;
  CartShop: undefined;
  TabGroup: undefined;
  StackHomeGroup: {
    screen: keyof HomeStackParamList;
    params?: HomeStackParamList[keyof HomeStackParamList];
  };
};

export type HomeStackParamList = {
  Home: undefined;
  Search: { category: CategoriesType };
  SearchText: undefined;
  ProductDetails: { productID: string };
  StoreDetails: { storeID: string };
};
