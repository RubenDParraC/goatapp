import React, { useEffect, useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import type { ModalProps } from "./types";
import IconComponent from "../icon-component/icon-component";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Modal = ({
  snapPoint = 50,
  setIsOpen,
  isOpen,
  children,
  enablePanDownToClose = true,
}: ModalProps) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const [visible, setVisible] = useState(isOpen); // Estado para controlar visibilidad

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Efecto para manejar la apertura y cierre
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
        runOnJS(setVisible)(false);
      });
    }
  }, [isOpen]); // Solo depende de `isOpen`, ya que `translateY` no es reactivo

  if (!visible) return null; // Evita renderizar el modal innecesariamente

  return (
    <View className="absolute w-screen h-full z-50 bg-black/50">
      <View className="flex-1 justify-end">
        <Animated.View
          style={[
            animatedStyle,
            { height: `${snapPoint}%` }, // Aplica la altura dinámicamente
          ]}
          className="w-full bg-white rounded-t-3xl p-5"
        >
          {enablePanDownToClose && (
            <TouchableOpacity
              activeOpacity={0.6}
              className="w-full bg-gray mb-2 flex items-center justify-center rounded-full"
              onPress={() => setIsOpen(false)}
            >
              <IconComponent
                icon="MaterialCommunityIcons"
                name="drag-horizontal-variant"
                color="gray_hard"
              />
            </TouchableOpacity>
          )}
          {children}
        </Animated.View>
      </View>
    </View>
  );
};

export default Modal;
