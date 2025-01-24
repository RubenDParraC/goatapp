import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import DynamicHeader from "../../../components/dynamic-header/dynamic-header";
import type { StoreType } from "../../../statics/types-backend";
import {
  type RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { storeDetailsRequest } from "../../../services/requests";
import type { RootStackParamList } from "../../../navigation/types";
import RenderProductItem from "../../../components/list-item/render-product-item/render-product-item";
import type { StoreDetailsScreenNavigationProp } from "./types";
import Modal from "../../../components/modal/modal";
import Separator from "../../../components/separator/separator";

export default function StoreDetails() {
  const navigation = useNavigation<StoreDetailsScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "StoreDetails">>();
  const { storeID } = route.params;
  const [storeData, setStoreData] = useState<StoreType>();
  const [loadingStoreData, setLoadingStoreData] = useState<boolean>(true);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Cerrar el BottomSheetModal al presionar el botón de volver
  useEffect(() => {
    const handleBackPress = () => {
      if (isOpen) {
        setIsOpen(false);
        return true; // Evita la acción predeterminada del botón de volver
      }
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isOpen]);

  useFocusEffect(
    useCallback(() => {
      storeDetailsRequest({ storeID, setStoreData, setLoadingStoreData });
    }, [storeID])
  );

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
        onClick={() => setIsOpen(!isOpen)}
      />
      <View className="p-10 py-5">
        <Animated.FlatList
          data={storeData?.products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item, index }) => (
            <RenderProductItem
              index={index}
              item={item}
              onClick={(productID) =>
                navigation.navigate("ProductDetails", {
                  productID: productID.toString(),
                })
              }
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
      <Modal snapPoint={50} isOpen={isOpen} setIsOpen={setIsOpen}>
        <ScrollView>
          <Text className="font-bold text-teritary text-center text-2xl mb-3">
            {storeData?.name}
          </Text>
          <Text className="font-medium text-gray_hard text-center text-base">
            {storeData?.address}
          </Text>
          <Separator className="my-6" />
          <Text className="font-medium text-gray_hard text-base text-justify">
            {storeData?.description}
          </Text>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}
