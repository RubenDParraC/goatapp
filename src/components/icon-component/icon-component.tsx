import React from "react";
import { colors, iconSets } from "./utils";
import type { IconComponentProps, IconSet, IconComponentType } from "./types";
import { TouchableOpacity } from "react-native";

export default function IconComponent<T extends IconSet>({
  icon,
  name,
  color = "black",
  size = 24,
  onClick,
}: IconComponentProps<T>) {
  const Icon = iconSets[icon] as unknown as IconComponentType<T>;
  return (
    <>
      {onClick ? (
        <TouchableOpacity onPress={onClick}>
          <Icon name={name} size={size} color={colors[color]} />
        </TouchableOpacity>
      ) : (
        <Icon name={name} size={size} color={colors[color]} />
      )}
    </>
  );
}
