import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, FlatList, SafeAreaView, Text, View } from "react-native";
import {
  deleteLocationRequest,
  locationsRequest,
} from "../../../services/requests";
import type { LocationType } from "../../../statics/types-backend";
import { useColorScheme } from "nativewind";
import RenderLocationItem from "../../../components/list-item/render-location-item/render-location-item";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import Modal from "../../../components/modal/modal";
import Button from "../../../components/button/button";
import IconComponent from "../../../components/icon-component/icon-component";
import type { LocationListScreenNavigationProp } from "./types";
import Animated, { SlideInDown } from "react-native-reanimated";

export default function LocationList() {
  const navigation = useNavigation<LocationListScreenNavigationProp>();
  const { colorScheme } = useColorScheme();
  const [locations, setLocations] = useState<LocationType[]>();
  const [loadingLocations, setLoadingLocations] = useState<boolean>(true);
  const [loadingDeleteLocation, setLoadingDeleteLocation] =
    useState<boolean>(true);
  const [locationID, setLocationId] = useState<string>("");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snapPoints = ["25%"];

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

  useFocusEffect(
    useCallback(() => {
      locationsRequest({ setLocations, setLoadingLocations });
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-gray">
      <View
        className={`w-full p-5 pt-16 rounded-b-3xl mb-5 ${
          colorScheme === "dark" ? "bg-teritary" : "bg-primary"
        }`}
      >
        <Text className="text-2xl text-center text-white font-bold">
          Mis Ubicaciones
        </Text>
      </View>
      <View className="px-5 flex-1">
        <FlatList
          data={locations}
          renderItem={({ item, index }) => (
            <RenderLocationItem
              index={index}
              item={item}
              onClickUpdate={(location) =>
                navigation.navigate("LocationDetails", {
                  location: location,
                })
              }
              onClickDelete={(locationId) => {
                setLocationId(locationId);
                handlePresentModalPress();
              }}
            />
          )}
          keyExtractor={(item) => `location-${+item.id}`}
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
      <Animated.View
        entering={SlideInDown.delay(900).duration(500)}
        className="w-full flex items-center justify-center bg-white p-5 rounded-t-3xl"
      >
        <Button
          label="Crear Ubicación"
          iconLeft={
            <IconComponent
              icon="MaterialIcons"
              name="add-location-alt"
              color="white"
            />
          }
          className="p-1 !w-2/3"
          classNameLabel="text-xl"
          color={colorScheme === "dark" ? "teritary" : "secondary"}
          onClick={() =>
            navigation.navigate("LocationDetails", { location: null })
          }
        />
      </Animated.View>
      <Modal
        snapPoints={snapPoints}
        bottomSheetModalRef={bottomSheetModalRef}
        exteriorBackgorundColor="error"
        setIsOpen={setIsOpen}
      >
        <View className="w-full flex-1 flex justify-between p-5">
          <Text className="text-xl font-semibold text-center">
            ¿Esta seguro que desea eliminar esta ubicación?
          </Text>
          <View className="flex flex-row justify-between">
            <Button
              onClick={() => handlePresentModalPress()}
              className="w-[42%]"
              iconLeft={
                <IconComponent icon="AntDesign" name="close" color="white" />
              }
            />
            <Button
              onClick={async () => {
                await deleteLocationRequest({
                  locationID,
                  setLoadingDeleteLocation,
                });
                await locationsRequest({ setLocations, setLoadingLocations });
                setLocationId("");
                handlePresentModalPress();
              }}
              className="w-[42%]"
              color="error"
              iconLeft={
                <IconComponent icon="AntDesign" name="check" color="white" />
              }
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
