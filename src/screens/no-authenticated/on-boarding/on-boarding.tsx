import React, { useContext, useRef, useState } from "react";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { SafeAreaView, FlatList, Animated, View } from "react-native";
import { AuthContext } from "../../../context/auth-context";
import { slides } from "./utils";
import OnBoardingItem from "./components/on-boarding-item/on-boarding-item";
import Paginator from "./components/paginator/paginator";
import NextButton from "./components/next-button/next-button";
import type { AuthContextType } from "../../../context/types";
import type { Slide } from "./types";
import type { RootStackParamList } from "../../../navigation/types";

export default function OnBoarding(): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoadingLogged } = useContext<AuthContextType>(AuthContext);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide> | null>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const firstViewableItem = viewableItems[0];
      if (firstViewableItem?.index !== null) {
        setCurrentIndex(firstViewableItem.index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = (): void => {
    if (currentIndex < slides.length - 1 && slidesRef.current) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView
      className={`flex flex-1  flex-col justify-between items-center ${
        currentIndex === 0
          ? "bg-slate-200"
          : currentIndex === 1
          ? "bg-yellow-200"
          : "bg-red-100"
      }`}
    >
      <View className="h-[90%]">
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View className="h-[10%] w-full flex flex-row justify-between items-center px-10">
        <View>
          <Paginator data={slides} scrollX={scrollX} />
        </View>
        <View>
          <NextButton
            scrollTo={scrollTo}
            percentage={(currentIndex + 1) * (100 / slides.length)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
