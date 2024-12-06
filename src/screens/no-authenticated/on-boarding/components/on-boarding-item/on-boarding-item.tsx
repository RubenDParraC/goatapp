import React from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";
import type { OnBoardingItemProps } from "./types";

export default function OnBoardingItem({
  item,
}: OnBoardingItemProps): JSX.Element {
  const { width } = useWindowDimensions();

  return (
    <View style={[{ width }]} className="h-full">
      <Image
        source={item.image}
        style={[{ width, resizeMode: "cover" }]}
        className="h-[70%]"
      />
      <View style={[{ width }]} className="p-5 flex flex-col gap-5">
        <Text className="text-white font-bold text-2xl">{item.title}</Text>
        <Text className="text-teritary text-justify text-base">
          {item.description}
        </Text>
      </View>
    </View>
  );
}
