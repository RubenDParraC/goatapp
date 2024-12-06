import type React from "react";
import { useContext } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import Avatar from "../avatar/avatar";
import { useColorScheme } from "nativewind";
import IconComponent from "../icon-component/icon-component";
import { AuthContext } from "../../context/auth-context";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout } = useContext(AuthContext);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: colorScheme === "dark" ? "#2A2C41" : "#FF724C",
        }}
      >
        <View className="w-full flex flex-col gap-2 p-1 pb-5">
          <Avatar
            uri="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
            className="w-28 h-28"
          />
          <View className="w-full flex flex-col">
            <Text className="text-2xl text-white font-medium">Ruben Parra</Text>

            <Text className="text-lg text-white font-light">¡Bienvenido!</Text>
          </View>
        </View>
        <View className="bg-white py-2 -m-4 mt-0">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="flex flex-col gap-4 p-5 border-[1px] border-t-gray_hard">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-xl font-medium text-teritary">Modo oscuro</Text>
          <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-full flex flex-row justify-between items-center"
        >
          <Text className="text-xl font-medium text-teritary">Soporte</Text>
          <IconComponent
            icon="AntDesign"
            name="infocirlce"
            color="teritary"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          className="w-full flex flex-row justify-between items-center"
        >
          <Text className="text-xl font-medium text-teritary">Acerca de</Text>
          <IconComponent
            icon="AntDesign"
            name="questioncircle"
            color="teritary"
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => logout()}
          className="w-full flex flex-row justify-between items-center"
        >
          <Text className="text-xl font-medium text-error">Cerrar sesión</Text>
          <IconComponent
            icon="MaterialIcons"
            name="exit-to-app"
            color="error"
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
