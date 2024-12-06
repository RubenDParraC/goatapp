import type { GestureResponderEvent } from "react-native";

export type ButtonSectionProps = {
  label: string;
  className?: string;
  classNameLabel?: string;
  onClick: (event: GestureResponderEvent) => void;
};
