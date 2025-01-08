import React, { useCallback, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// external components
import { useColorScheme } from "nativewind";

// components
import IconComponent from "../../../components/icon-component/icon-component";
import RenderStoreItem from "../../../components/list-item/render-store-item/render-store-item";
import HeaderComponent from "./components/header-components/header-components";

// types
import type { ProfileHomeScreenNavigationProp } from "./types";
import type { StoreType } from "../../../statics/types-backend";

// requests
import { featuredStoreRequest } from "../../../services/requests";

export default function ProfileHome() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<ProfileHomeScreenNavigationProp>();
  const [featuredStore, setFeaturedStore] = useState<StoreType[]>();
  const [loadingFeaturedStore, setLoadingFeaturedStore] =
    useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      featuredStoreRequest({ setFeaturedStore, setLoadingFeaturedStore });
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray">
      <View
        className={`w-full p-5 pt-16 rounded-b-3xl mb-5 ${
          colorScheme === "dark" ? "bg-teritary" : "bg-secondary"
        }`}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-full flex flex-row items-center p-5 bg-white rounded-xl gap-3"
          onPress={() =>
            navigation.navigate("StackHomeGroup", {
              screen: "SearchText",
            })
          }
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
                navigation.navigate("StackHomeGroup", {
                  screen: "StoreDetails",
                  params: { storeID: item.id.toString() },
                })
              }
              onClickProduct={(productID) =>
                navigation.navigate("StackHomeGroup", {
                  screen: "ProductDetails",
                  params: { productID: productID.toString() },
                })
              }
            />
          )}
          keyExtractor={(item) => `store${+item.id}`}
          ListHeaderComponent={() => (
            <HeaderComponent
              onClickLocations={() => navigation.navigate("LocationList")}
            />
          )}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
    </SafeAreaView>
  );
}
