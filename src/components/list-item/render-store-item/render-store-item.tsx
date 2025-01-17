import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { ConstantClass } from "../../../statics/config";
import Separator from "../../separator/separator";
import type { RenderStoreItemProps } from "./types";
import RenderProductItem from "../render-product-item/render-product-item";
import Animated, { FadeInDown } from "react-native-reanimated";

const RenderStoreItem = ({
  index = 1,
  item,
  onClickStore,
  onClickProduct,
}: RenderStoreItemProps) => {
  const { name, description, image, products } = item;

  return (
    <Animated.View
      entering={FadeInDown.delay(500).duration((index + 1) * 500)}
      className="flex flex-col bg-white p-5 mb-5 rounded-xl"
    >
      <ImageBackground
        source={{ uri: `${ConstantClass.webserviceName}${image}` }}
        className="w-full h-28 rounded-xl overflow-hidden bg-gray"
      >
        <View className="w-full h-full flex items-center justify-center bg-black opacity-70 absolute" />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClickStore}
          className="w-full h-full flex items-center justify-center gap-1 z-10 absolute p-3"
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-bold text-2xl text-white text-center"
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="font-light text-md text-white text-center w-2/3"
          >
            {description}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <Separator color="gray" className="my-4" />
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => `store${+item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RenderProductItem
            index={index}
            item={item}
            isHorizontal
            onClick={() => onClickProduct(item.id)}
            onClickCartShop={() =>
              console.log("Product cartshop ID: ", item.id)
            }
          />
        )}
      />
    </Animated.View>
  );
};

export default RenderStoreItem;
