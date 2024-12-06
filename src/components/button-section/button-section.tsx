import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { ButtonSectionProps } from "./types";
import IconComponent from "../icon-component/icon-component";

const ButtonSection = ({
  label,
  className,
  classNameLabel,
  onClick,
}: ButtonSectionProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.6}
      className={`w-full flex flex-row items-center justify-end gap-2 ${className}`}
    >
      <Text className={`text-teritary text-lg font-bold ${classNameLabel}`}>
        {label}
      </Text>
      <IconComponent
        icon="MaterialIcons"
        name="arrow-forward-ios"
        color="teritary"
        size={16}
      />
    </TouchableOpacity>
  );
};

export default ButtonSection;
