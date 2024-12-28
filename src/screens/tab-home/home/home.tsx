import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import IconComponent from "../../../components/icon-component/icon-component";
import {
  categoriesRequest,
  featuredStoreRequest,
} from "../../../services/requests";
import type { CategoriesType, StoreType } from "../../../statics/types-backend";
import type { HomeScreenNavigationProp } from "./types";
import RenderStoreItem from "../../../components/list-item/render-store-item/render-store-item";
import HeaderComponent from "./components/header-component/header-component";

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colorScheme } = useColorScheme();
  const [categories, setCategories] = useState<CategoriesType[]>();
  const [featuredStore, setFeaturedStore] = useState<StoreType[]>();
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingFeaturedStore, setLoadingFeaturedStore] =
    useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      categoriesRequest({ setCategories, setLoadingCategories });
      featuredStoreRequest({ setFeaturedStore, setLoadingFeaturedStore });
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray">
      <View
        className={`w-full p-5 pt-16 rounded-b-3xl mb-5 ${
          colorScheme === "dark" ? "bg-teritary" : "bg-primary"
        }`}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-full flex flex-row items-center p-5 bg-white rounded-xl gap-3"
          onPress={() => navigation.navigate("SearchText")}
        >
          <IconComponent icon="Feather" name="search" color="gray_hard" />
          <Text className="text-base text-gray_hard">Buscar producto</Text>
        </TouchableOpacity>
      </View>
      <View className="px-5">
        <FlatList
          data={featuredStore}
          renderItem={({ item, index }) => (
            <RenderStoreItem
              index={index}
              item={item}
              onClickStore={() =>
                navigation.navigate("StoreDetails", {
                  storeID: item.id.toString(),
                })
              }
              onClickProduct={(productID) =>
                navigation.navigate("ProductDetails", {
                  productID: productID.toString(),
                })
              }
            />
          )}
          keyExtractor={(item) => `store${+item.id}`}
          ListHeaderComponent={() => (
            <HeaderComponent categories={categories} />
          )}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
    </SafeAreaView>
  );
}
