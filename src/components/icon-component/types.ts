import type {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import type { colors } from "./utils";
import type { GestureResponderEvent } from "react-native";

// Definimos el tipo de conjuntos de iconos disponibles
export type IconSet =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial";

export type IconNames = {
  AntDesign: keyof typeof AntDesign.glyphMap;
  Entypo: keyof typeof Entypo.glyphMap;
  EvilIcons: keyof typeof EvilIcons.glyphMap;
  Feather: keyof typeof Feather.glyphMap;
  FontAwesome: keyof typeof FontAwesome.glyphMap;
  Fontisto: keyof typeof Fontisto.glyphMap;
  Foundation: keyof typeof Foundation.glyphMap;
  Ionicons: keyof typeof Ionicons.glyphMap;
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap;
  MaterialIcons: keyof typeof MaterialIcons.glyphMap;
  Octicons: keyof typeof Octicons.glyphMap;
  SimpleLineIcons: keyof typeof SimpleLineIcons.glyphMap;
  Zocial: keyof typeof Zocial.glyphMap;
};

export type IconProps<T extends IconSet> = {
  name: IconNames[T];
  size?: number;
  color?: keyof typeof colors;
  onClick?: (event: GestureResponderEvent) => void;
};

export type IconComponentProps<T extends IconSet> = {
  icon: T;
} & IconProps<T>;

export type IconComponentType<T extends IconSet> = React.ComponentType<{
  name: IconNames[T];
  size: number;
  color: string;
}>;
