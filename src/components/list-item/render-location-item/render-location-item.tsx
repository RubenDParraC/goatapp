import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { RenderLocationItemProps } from "./types";
import Separator from "../../separator/separator";
import IconComponent from "../../icon-component/icon-component";
import Animated, { FadeInDown } from "react-native-reanimated";

const RenderLocationItem = ({
  index,
  item,
  onClickDelete,
  onClickUpdate,
}: RenderLocationItemProps) => {
  const { id, address, name, description } = item;
  return (
    <>
      <Animated.View
        entering={FadeInDown.delay(500).duration((index + 1) * 500)}
        className="w-full flex flex-row justify-between"
      >
        <View className="flex-1 flex flex-col">
          <Text className="text-xl font-bold text-teritary mb-3">{name}</Text>
          <Text className="text-base font-medium text-gray_hard">
            {address}
          </Text>
          <Text className="text-base font-medium text-gray_hard">
            {description}
          </Text>
        </View>
        <View className="w-10 flex flex-col justify-between items-end">
          <IconComponent
            icon="Entypo"
            name="trash"
            color="error"
            onClick={() => onClickDelete(id.toString())}
          />
          <IconComponent
            icon="MaterialIcons"
            name="edit-location-alt"
            color="primary"
            onClick={() => onClickUpdate(item)}
          />
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(500).duration((index + 1) * 600)}
        className="mb-10"
      >
        <Separator />
      </Animated.View>
    </>
  );
};

export default RenderLocationItem;
