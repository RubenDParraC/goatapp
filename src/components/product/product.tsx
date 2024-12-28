import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import type { ProductProps } from "./types";
import { ConstantClass } from "../../statics/config";
import IconComponent from "../icon-component/icon-component";
import Animated, { FadeInDown } from "react-native-reanimated";

const Product = ({
  index = 1,
  item,
  isHorizontal,
  onClick,
  onClickCartShop,
}: ProductProps) => {
  const { name, image, description, price } = item;

  return (
    <Animated.View
      entering={FadeInDown.delay(500).duration((index + 1) * 500)}
      className={`border-[1px] border-gray_hard rounded-lg p-2 flex flex-col gap-2 ${
        isHorizontal ? "w-40 mr-5" : "w-[45%] mb-4"
      }`}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={onClick}>
        <ImageBackground
          source={{ uri: `${ConstantClass.webserviceName}${image}` }}
          className="w-full h-28 bg-gray rounded-xl overflow-hidden"
        >
          <View className="w-full h-full flex flex-row items-start justify-end absolute p-1">
            <View className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <IconComponent
                icon="Ionicons"
                name="add-circle"
                size={35}
                color="success"
                onClick={onClickCartShop}
              />
            </View>
          </View>
        </ImageBackground>
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-base font-semibold uppercase text-teritary"
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className="text-xs font-light text-gray_hard text-justify"
          >
            {description}
          </Text>
        </View>
        <View>
          <Text
            numberOfLines={1}
            className="text-lg font-bold uppercase text-teritary"
          >
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(price))}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Product;
