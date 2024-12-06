import type { ImageSourcePropType } from "react-native";

export interface OnBoardingItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
  };
}
