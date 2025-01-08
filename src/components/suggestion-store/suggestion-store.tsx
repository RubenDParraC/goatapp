import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import type { SuggestionStoreTypeProps } from "./types";

const SuggestionStore = ({ item, onClick }: SuggestionStoreTypeProps) => {
  const { name, id } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onClick}
      className="w-full bg-white mb-5 p-4 rounded-2xl flex flex-row items-center"
    >
      <Text className="text-base font-medium">{name}</Text>
    </TouchableOpacity>
  );
};

export default SuggestionStore;
