import React, { useCallback, useRef, useState } from "react";
import { Animated, SafeAreaView, View } from "react-native";
import DynamicHeader from "../../../components/dynamic-header/dynamic-header";
import type { StoreType } from "../../../statics/types-backend";
import {
  type RouteProp,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { storeDetailsRequest } from "../../../services/requests";
import type { RootStackParamList } from "../../../navigation/types";
import RenderProductItem from "../../../components/list-item/render-product-item/render-product-item";

export default function StoreDetails() {
  const route = useRoute<RouteProp<RootStackParamList, "StoreDetails">>();
  const { storeID } = route.params;
  const [storeData, setStoreData] = useState<StoreType>();
  const [loadingStoreData, setLoadingStoreData] = useState<boolean>(true);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      storeDetailsRequest({ storeID, setStoreData, setLoadingStoreData });
    }, [storeID])
  );

  console.log(storeData?.address);
  return (
    <SafeAreaView className="flex-1 bg-gray">
      <DynamicHeader
        value={scrollOffsetY}
        HeaderMaxHeight={320}
        HeaderMinHeight={160}
        HeaderMaxlengthDescription={8}
        title={storeData?.name ?? ""}
        subtitle={storeData?.address ?? ""}
        description={storeData?.description ?? ""}
        image={storeData?.image ?? ""}
      />
      <View className="p-10 py-5">
        <Animated.FlatList
          data={storeData?.products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderProductItem
              item={item}
              onClick={() => console.log("Product ID: ", item.id)}
              onClickCartShop={() =>
                console.log("Product cartshop ID: ", item.id)
              }
            />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 320 }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
    </SafeAreaView>
  );
}
