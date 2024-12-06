import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import type { SuggestionTypeProps } from "./types";
import IconComponent from "../icon-component/icon-component";

const Suggestion = ({ item, onClick }: SuggestionTypeProps) => {
  const { name, similarity } = item;
  const percent = similarity * 100;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onClick}
      className="w-full bg-white mb-5 p-4 rounded-2xl flex flex-row items-center justify-between"
    >
      <Text className="text-base font-medium">{name}</Text>
      <IconComponent
        icon="FontAwesome"
        name="circle"
        size={10}
        color={
          percent < 25
            ? "error"
            : percent >= 25 && percent < 50
            ? "secondary"
            : percent >= 50 && percent < 75
            ? "primary"
            : "success"
        }
      />
    </TouchableOpacity>
  );
};

export default Suggestion;
