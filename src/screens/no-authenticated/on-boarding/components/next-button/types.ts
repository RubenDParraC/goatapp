import type { GestureResponderEvent } from "react-native";

export interface NextButtonProps {
  scrollTo: (event: GestureResponderEvent) => void;
  percentage: number;
}
