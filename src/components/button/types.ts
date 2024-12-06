import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import type { colors } from "../separator/utils";

export type ButtonProps = {
  label?: string;
  className?: string;
  classNameLabel?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  color?: keyof typeof colors;
  onClick: (event: GestureResponderEvent) => void;
};
