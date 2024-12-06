import type React from "react";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerGroup, StackNoAuthGroup } from "./Navigation";
import { AuthContext } from "../context/auth-context";
import type { AuthContextType } from "../context/types";

const AppNav: React.FC = () => {
  const { userToken } = useContext<AuthContextType>(AuthContext);

  return (
    <NavigationContainer>
      {userToken !== null ? <DrawerGroup /> : <StackNoAuthGroup />}
    </NavigationContainer>
  );
};

export default AppNav;
