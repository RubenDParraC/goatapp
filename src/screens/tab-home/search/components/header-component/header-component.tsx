import React from "react";
import { View, FlatList, Text } from "react-native";
import Separator from "../../../../../components/separator/separator";
import { useColorScheme } from "nativewind";
import type { HeaderComponentProps } from "./types";
import RenderSubcategoryItem from "../../../../../components/list-item/render-subcategory-item/render-subcategory-item";
import IconComponent from "../../../../../components/icon-component/icon-component";

const HeaderComponent = React.memo(
  ({
    searchName,
    subcategories,
    handleSubcategoryChange,
  }: HeaderComponentProps) => {
    const { colorScheme } = useColorScheme();

    return (
      <View>
        <FlatList
          horizontal
          data={subcategories}
          renderItem={({ item, index }) => (
            <RenderSubcategoryItem
              index={index}
              item={item}
              onClick={() => handleSubcategoryChange(item)}
            />
          )}
          keyExtractor={(item) => `categorie${+item.id}`}
          showsHorizontalScrollIndicator={false}
        />
        <Separator
          color={colorScheme === "dark" ? "teritary" : "primary"}
          className="my-5"
        />
        <View className="w-full flex flex-row items-center gap-2 mb-5">
          <IconComponent icon="Foundation" name="results" color="secondary" />
          <Text className="text-lg text-teritary font-medium">
            {`Resultados para "${searchName}"`}
          </Text>
        </View>
      </View>
    );
  }
);

export default HeaderComponent;
