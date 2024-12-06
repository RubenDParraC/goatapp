import React from "react";
import { Text, TouchableOpacity } from "react-native";
import type { ButtonProps } from "./types";
import { colors } from "../separator/utils";

const Button = ({
  label,
  className,
  classNameLabel,
  iconLeft,
  iconRight,
  disabled = false,
  color = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.6}
      disabled={disabled}
      className={`w-full flex flex-row items-center justify-center gap-3 p-4 rounded-2xl ${colors[color]} ${className}`}
    >
      {iconLeft ? iconLeft : null}
      {label ? (
        <Text className={`text-white text-2xl font-bold ${classNameLabel}`}>
          {label}
        </Text>
      ) : null}
      {iconRight ? iconRight : null}
    </TouchableOpacity>
  );
};

export default Button;
