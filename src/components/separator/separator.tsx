import React from "react";
import { Text, View } from "react-native";
import type { SeparatorProps } from "./types";
import { colors } from "./utils";

const Separator = ({ color = "gray_hard", className }: SeparatorProps) => {
  return (
    <View className={`w-full p-[1px] my-2 ${colors[color]} ${className}`} />
  );
};

export default Separator;
