import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/types";

export type LocationDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LocationDetails"
>;

export type ValuesLocationSubmitType = {
  name: string;
  address: string;
  description: string;
};
