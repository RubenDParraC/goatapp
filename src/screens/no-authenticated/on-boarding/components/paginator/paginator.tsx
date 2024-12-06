import type React from "react";
import { View, Animated, useWindowDimensions } from "react-native";
import type { PaginatorProps } from "./types";

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex flex-row">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            className="bg-teritary rounded-full mx-2"
            style={{
              width: dotWidth,
              opacity,
              height: 20,
            }}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
