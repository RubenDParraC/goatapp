import {
  type RouteProp,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated as RNAnimated,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import type { RootStackParamList } from "../../../navigation/types";
import type { ProductType } from "../../../statics/types-backend";
import { productDetailsRequest } from "../../../services/requests";
import DynamicHeader from "../../../components/dynamic-header/dynamic-header";
import IconComponent from "../../../components/icon-component/icon-component";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

export default function ProductDetails() {
  const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();
  const { productID } = route.params;
  const [productData, setProductData] = useState<ProductType>();
  const [loadingProductData, setLoadingProductData] = useState<boolean>(true);
  const scrollOffsetY = useRef(new RNAnimated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      productDetailsRequest({
        productID,
        setProductData,
        setLoadingProductData,
      });
    }, [productID])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray">
      <Animated.View entering={FadeInDown.delay(500).duration(500)}>
        <DynamicHeader
          value={scrollOffsetY}
          HeaderMaxHeight={400}
          HeaderMinHeight={160}
          HeaderMaxlengthDescription={8}
          image={productData?.image ?? ""}
          isOpacityPercentInitial={0.0}
        />
      </Animated.View>
      <ScrollView
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        className="mt-[400px] p-5"
      >
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          className="w-full flex flex-row justify-between items-center mb-3"
        >
          <View className="flex flex-row items-center gap-2">
            <Text className="text-2xl font-extrabold mb-5 text-teritary">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(Number(productData?.price))}
            </Text>
            {Number(productData?.percentage_discount) > 0 ? (
              <Text className="bg-yellow-200 px-3 py-1 rounded-lg text-lg font-medium mb-5 text-teritary">
                {`-${productData?.percentage_discount}%`}
              </Text>
            ) : null}
            {Number(productData?.percentage_discount) > 0 ? (
              <Text className="text-lg font-medium mb-5 text-gray_hard line-through">
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(Number(productData?.price))}
              </Text>
            ) : null}
          </View>
          <IconComponent icon="AntDesign" name="heart" color="error" />
        </Animated.View>
        <Animated.Text
          entering={FadeInDown.delay(700).duration(500)}
          className="text-xl font-semibold mb-3 text-teritary"
        >
          {productData?.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(800).duration(500)}
          className="text-lg text-gray_hard font-medium"
        >
          {productData?.description}
        </Animated.Text>
      </ScrollView>
      <Animated.View
        entering={SlideInDown.delay(900).duration(500)}
        className="w-full flex items-center justify-center bg-white p-5 rounded-t-3xl"
      >
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-2/3 p-3 border-secondary border rounded-lg flex flex-row items-center justify-center gap-4"
        >
          <IconComponent
            icon="FontAwesome"
            name="cart-plus"
            color="secondary"
          />
          <Text className="text-xl text-secondary font-bold">
            Añadir al carrito
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
