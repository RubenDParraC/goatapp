import type { CategoriesType } from "../statics/types-backend";

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Search: { category: CategoriesType };
  SearchText: undefined;
  Categories: undefined;
  ProductDetails: undefined;
  StoreDetails: { storeID: string };
  ProfileHome: undefined;
  LocationDetails: undefined;
  LocationList: undefined;
  OrderDetails: undefined;
  OrderList: undefined;
  CartShop: undefined;
  TabGroup: undefined;
};
