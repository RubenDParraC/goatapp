import type { Animated } from "react-native";

export type DynamicHeaderProps = {
  value: Animated.Value;
  HeaderMaxHeight: number;
  HeaderMinHeight: number;
  HeaderMaxlengthDescription: number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
};
