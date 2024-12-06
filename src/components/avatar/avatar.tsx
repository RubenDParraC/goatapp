import React from "react";
import { View, Text, ImageBackground } from "react-native";
import type { AvatarProps } from "./types";

const Avatar = ({ uri, className }: AvatarProps) => {
  return (
    <ImageBackground
      source={{
        uri,
      }}
      className={`h-10 w-10 rounded-full overflow-hidden ${className}`}
    />
  );
};

export default Avatar;
