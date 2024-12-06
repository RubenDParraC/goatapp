import React from "react";
import { ActivityIndicator } from "react-native";
import type { LoaderProps } from "./types";
import { colors } from "../icon-component/utils";

const Loader = ({ size = "small", color = "black" }: LoaderProps) => {
  return <ActivityIndicator size={size} color={colors[color]} />;
};

export default Loader;
