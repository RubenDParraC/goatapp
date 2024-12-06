import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type {
  AuthContextType,
  AuthProviderProps,
  LoginContextProps,
} from "./types";
import { loginRequest } from "../services/requests";

const defaultContextValue: AuthContextType = {
  userToken: null,
  isLoadingLogged: true,
  login: async () => {
    return Promise.resolve();
  },
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoadingLogged, setIsLoadingLogged] = useState<boolean>(true);

  const login = async ({
    email,
    password,
    setIsLoading,
    setIsError,
  }: LoginContextProps) => {
    loginRequest({ email, password, setUserToken, setIsLoading, setIsError });
  };

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
  };

  const isLoggedIn = async () => {
    try {
      setIsLoadingLogged(true);
      const storedToken = await AsyncStorage.getItem("userToken");
      setUserToken(storedToken);
      setIsLoadingLogged(false);
    } catch (error) {
      console.log(error);
      setIsLoadingLogged(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoadingLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
