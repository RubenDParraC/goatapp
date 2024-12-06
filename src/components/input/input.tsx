import React from "react";
import { View, Text, TextInput } from "react-native";
import type { InputProps } from "./types";
import Separator from "../separator/separator";

const Input = ({
  value,
  placeholder,
  error,
  label,
  icon,
  hideSeparator = false,
  autoFocus = false,
  classNameContainer,
  classNameInput,
  autoCapitalize = "none",
  keyboardType,
  onChangeText,
  onBlur,
}: InputProps) => {
  return (
    <View className={`w-full flex flex-col gap-1 my-3 ${classNameContainer}`}>
      {label ? <Text className="text-gray_hard text-base">{label}</Text> : null}
      <View className="w-full flex flex-row items-center gap-1">
        <View className="max-w-10">{icon ? icon : null}</View>
        <View className="flex-1">
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#A9A9A9"}
            className={`bg-white w-full ${classNameInput}`}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
          />
        </View>
      </View>
      {hideSeparator ? (
        <Separator color={error ? "error" : "gray_hard"} />
      ) : null}
      {error ? <Text className="text-error text-sm">{error}</Text> : null}
    </View>
  );
};

export default Input;
