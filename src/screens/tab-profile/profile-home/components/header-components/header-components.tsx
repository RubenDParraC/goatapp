import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// components
import Separator from "../../../../../components/separator/separator";

// types
import type { HeaderComponentProps } from "./types";
import IconComponent from "../../../../../components/icon-component/icon-component";

const HeaderComponent = ({ onClickLocations }: HeaderComponentProps) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        className="w-full flex flex-row items-center gap-2 justify-between py-2"
      >
        <View className="flex flex-row items-center">
          <View className="w-10">
            <IconComponent
              icon="MaterialIcons"
              name="shopping-cart-checkout"
              size={20}
              color="teritary"
            />
          </View>
          <Text className="text-base font-bold text-teritary">Mis Pedidos</Text>
        </View>
        <IconComponent
          icon="AntDesign"
          name="right"
          size={16}
          color="teritary"
        />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        activeOpacity={0.6}
        className="w-full flex flex-row items-center gap-2 justify-between py-2"
      >
        <View className="flex flex-row items-center">
          <View className="w-10">
            <IconComponent
              icon="Entypo"
              name="user"
              size={20}
              color="teritary"
            />
          </View>
          <Text className="text-base font-bold text-teritary">Mis Perfil</Text>
        </View>
        <IconComponent
          icon="AntDesign"
          name="right"
          size={16}
          color="teritary"
        />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        activeOpacity={0.6}
        className="w-full flex flex-row items-center gap-2 justify-between py-2"
      >
        <View className="flex flex-row items-center">
          <View className="w-10">
            <IconComponent
              icon="MaterialIcons"
              name="favorite"
              size={16}
              color="teritary"
            />
          </View>
          <Text className="text-base font-bold text-teritary">
            Mis Favoritos
          </Text>
        </View>
        <IconComponent
          icon="AntDesign"
          name="right"
          size={16}
          color="teritary"
        />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onClickLocations}
        className="w-full flex flex-row items-center gap-2 justify-between py-2"
      >
        <View className="flex flex-row items-center">
          <View className="w-10">
            <IconComponent
              icon="MaterialIcons"
              name="location-pin"
              size={20}
              color="teritary"
            />
          </View>
          <Text className="text-base font-bold text-teritary">
            Mis Ubicaciones
          </Text>
        </View>
        <IconComponent
          icon="AntDesign"
          name="right"
          size={16}
          color="teritary"
        />
      </TouchableOpacity>
      <Separator />
    </View>
  );
};

export default HeaderComponent;
