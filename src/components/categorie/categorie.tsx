import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { CategorieProps } from "./types";
import { ConstantClass } from "../../statics/config";
import Avatar from "../avatar/avatar";
import IconComponent from "../icon-component/icon-component";

const Categorie = ({ item, onClick }: CategorieProps) => {
  const { title, image } = item;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onClick}
      className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl min-w-28 max-w-32 mr-3"
    >
      {image ? (
        <Avatar uri={`${ConstantClass.webserviceName}${image}`} />
      ) : (
        <View className="p-2 bg-gray rounded-full">
          <IconComponent
            icon="MaterialIcons"
            name="hide-image"
            size={20}
            color="gray_hard"
          />
        </View>
      )}
      <Text className="text-sm text-gray_hard font-medium text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Categorie;
