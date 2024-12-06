import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, SafeAreaView, BackHandler, FlatList } from "react-native";
import IconComponent from "../../../components/icon-component/icon-component";
import Input from "../../../components/input/input";
import type {
  StoreType,
  SuggestionStoreType,
  SuggestionType,
} from "../../../statics/types-backend";
import {
  searchStoresBySuggestionRequest,
  suggestionSearch,
} from "../../../services/requests";
import RenderSuggestionItem from "../../../components/list-item/render-suggestion-item/render-suggestion-item";
import { useColorScheme } from "nativewind";
import Separator from "../../../components/separator/separator";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "../../../components/modal/modal";
import RenderStoreItem from "../../../components/list-item/render-store-item/render-store-item";
import type { SearchTextScreenNavigationProp } from "./types";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "./components/header-component/header-component";

const SearchText = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<SearchTextScreenNavigationProp>();
  const [currentText, setCurrentText] = useState<string>("");
  const [suggestionsStoresData, setSuggestionsStoresData] =
    useState<SuggestionStoreType[]>();
  const [suggestionsData, setSuggestionsData] = useState<SuggestionType[]>();
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(true);
  const [storeData, setStoreData] = useState<StoreType[]>();
  const [loadingStoreData, setLoadingStoreData] = useState<boolean>(true);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snapPoints = ["90%"];

  const handlePresentModalPress = useCallback(() => {
    if (bottomSheetModalRef.current) {
      if (!isOpen) {
        bottomSheetModalRef.current?.present();
        setIsOpen(true);
      } else {
        bottomSheetModalRef.current.dismiss();
        setIsOpen(false);
      }
    }
  }, [isOpen]);

  // Signal for canceling network requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch suggestions when search changes
  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    suggestionSearch({
      signal,
      currentText,
      setSuggestionsData,
      setLoadingSuggestions,
      setSuggestionsStoresData,
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [currentText]);

  // Cerrar el BottomSheetModal al presionar el botón de volver
  useEffect(() => {
    const handleBackPress = () => {
      if (isOpen && bottomSheetModalRef.current) {
        bottomSheetModalRef.current.dismiss(); // Cierra el modal
        setIsOpen(false);
        return true; // Evita la acción predeterminada del botón de volver
      }
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [isOpen]);

  return (
    <SafeAreaView className="flex-1 pt-16 p-5 bg-gray">
      <View className="w-full flex flex-row items-center px-5 py-1 bg-white rounded-xl gap-3">
        <Input
          placeholder="Buscar por..."
          value={currentText}
          autoFocus
          onChangeText={(text) => setCurrentText(text)}
          autoCapitalize="none"
          icon={
            <IconComponent icon="Feather" name="search" color="gray_hard" />
          }
        />
      </View>
      <Separator
        color={colorScheme === "dark" ? "teritary" : "secondary"}
        className="my-5"
      />
      <FlatList
        data={suggestionsData}
        renderItem={({ item }) => (
          <RenderSuggestionItem
            item={item}
            onClick={async () => {
              console.log("suggestion ID:", item);
              await searchStoresBySuggestionRequest({
                suggestion: item.name,
                setStoreData,
                setLoadingStoreData,
              });
              handlePresentModalPress();
            }}
          />
        )}
        ListHeaderComponent={() => (
          <HeaderComponent
            suggestionStores={suggestionsStoresData ?? []}
            visibleSeparator={
              !!suggestionsData?.length && !!suggestionsStoresData?.length
            }
          />
        )}
        keyExtractor={(_, index) => `suggestion-item-${+index}`}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
      <Modal
        snapPoints={snapPoints}
        bottomSheetModalRef={bottomSheetModalRef}
        exteriorBackgorundColor="secondary"
        setIsOpen={setIsOpen}
      >
        <View className="w-full flex-1">
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
            keyExtractor={(item) => `store-${+item.id}`}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchText;
