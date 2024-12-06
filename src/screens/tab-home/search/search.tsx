import {
  type RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import type { RootStackParamList } from "../../../navigation/types";
import IconComponent from "../../../components/icon-component/icon-component";
import type {
  StoreType,
  SubCategoriesType,
} from "../../../statics/types-backend";
import {
  searchByCategoryRequest,
  searchBySubcategoryRequest,
  subcategoriesRequest,
} from "../../../services/requests";
import type { SearchScreenNavigationProp } from "./types";
import HeaderComponent from "./components/header-component/header-component";
import RenderStoreItem from "../../../components/list-item/render-store-item/render-store-item";

export default function Search() {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [currentSubcategory, setCurrentSubcategory] = useState<
    SubCategoriesType | undefined
  >(undefined);
  const [subcategories, setSubcategories] = useState<SubCategoriesType[]>();
  const [storeData, setStoreData] = useState<StoreType[]>();
  const [loadingSubcategories, setLoadingSubcategories] =
    useState<boolean>(true);
  const [loadingStoreData, setLoadingStoreData] = useState<boolean>(true);
  const route = useRoute<RouteProp<RootStackParamList, "Search">>();
  const { category } = route.params;

  const handleSubcategoryChange = async (subcategory: SubCategoriesType) => {
    console.log(subcategory);
    await setCurrentSubcategory(subcategory);
    searchBySubcategoryRequest({
      subcategoryID: subcategory.id,
      setStoreData,
      setLoadingStoreData,
    });
  };

  useFocusEffect(
    useCallback(() => {
      subcategoriesRequest({
        categoryID: category.id,
        setSubcategories,
        setLoadingSubcategories,
      });
      searchByCategoryRequest({
        categoryID: category.id,
        setStoreData,
        setLoadingStoreData,
      });
    }, [category])
  );

  return (
    <SafeAreaView className="flex-1 pt-16 p-5 bg-gray">
      <TouchableOpacity
        activeOpacity={0.6}
        className="w-full flex flex-row items-center p-5 bg-white rounded-xl gap-3 mb-5"
        onPress={() => navigation.navigate("SearchText")}
      >
        <IconComponent icon="Feather" name="search" color="gray_hard" />
        <Text className="text-base text-gray_hard">Buscar producto</Text>
      </TouchableOpacity>
      <FlatList
        data={storeData}
        renderItem={({ item }) => (
          <RenderStoreItem
            item={item}
            onClickStore={() =>
              navigation.navigate("StoreDetails", {
                storeID: item.id.toString(),
              })
            }
          />
        )}
        ListHeaderComponent={() => (
          <HeaderComponent
            searchName={
              currentSubcategory ? currentSubcategory.title : category.title
            }
            subcategories={subcategories}
            handleSubcategoryChange={handleSubcategoryChange}
          />
        )}
        keyExtractor={(item) => `subcategorie-${+item.id}`}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </SafeAreaView>
  );
}
