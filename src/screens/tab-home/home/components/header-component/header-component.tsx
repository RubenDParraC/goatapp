import React from "react";
import { View, FlatList } from "react-native";
import Separator from "../../../../../components/separator/separator";
import { useColorScheme } from "nativewind";
import type { HeaderComponentProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import type { HomeScreenNavigationProp } from "../../types";
import RenderCategoryItem from "../../../../../components/list-item/render-category-item/render-category-item";

const HeaderComponent = ({ categories }: HeaderComponentProps) => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <RenderCategoryItem
            item={item}
            onClick={() => navigation.navigate("Search", { category: item })}
          />
        )}
        keyExtractor={(item) => `categorie${+item.id}`}
        showsHorizontalScrollIndicator={false}
      />
      <Separator
        color={colorScheme === "dark" ? "teritary" : "primary"}
        className="my-5"
      />
    </View>
  );
};

export default HeaderComponent;
