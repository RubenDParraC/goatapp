import type { ReactNode } from "react";
import type {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";

export type InputProps = {
  value: string;
  placeholder?: string;
  label?: string;
  error?: string;
  hideSeparator?: boolean;
  autoFocus?: boolean;
  icon?: ReactNode;
  classNameContainer?: string;
  classNameInput?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
};
