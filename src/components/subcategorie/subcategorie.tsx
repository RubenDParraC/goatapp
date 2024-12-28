import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { ConstantClass } from "../../statics/config";
import Avatar from "../avatar/avatar";
import IconComponent from "../icon-component/icon-component";
import type { SubcategorieProps } from "./types";
import Animated, { FadeInRight } from "react-native-reanimated";

const Subcategorie = ({ index = 1, item, onClick }: SubcategorieProps) => {
  const { title, image } = item;
  return (
    <Animated.View
      entering={FadeInRight.delay(500).duration((index + 1) * 500)}
      className="w-40 flex flex-col items-center gap-2 bg-white rounded-xl min-w-28 max-w-40 max-h-20 mr-3"
    >
      <ImageBackground
        source={{ uri: `${ConstantClass.webserviceName}${image}` }}
        className="w-full h-full rounded-xl overflow-hidden bg-gray"
      >
        <View className="w-full h-full flex items-center justify-center bg-black opacity-50 absolute" />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClick}
          className="w-full h-full flex items-center justify-center gap-1 z-10 absolute p-3"
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-bold text-sm text-white text-center"
          >
            {title}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </Animated.View>
  );
};

export default Subcategorie;
