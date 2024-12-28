import { View, Text, Animated, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import type { DynamicHeaderProps } from "./types";
import { ConstantClass } from "../../statics/config";

const DynamicHeader = ({
  value,
  HeaderMaxHeight,
  HeaderMinHeight,
  HeaderMaxlengthDescription,
  title,
  subtitle,
  description,
  image,
  isOpacityPercentInitial = 0.5,
}: DynamicHeaderProps) => {
  const Scroll_Distance = HeaderMaxHeight - HeaderMinHeight;

  const [numberOfLines, setNumberOfLines] = useState(
    HeaderMaxlengthDescription
  );

  useEffect(() => {
    const listenerId = value.addListener(({ value: scrollValue }) => {
      const lines = Math.ceil(
        HeaderMaxlengthDescription -
          ((HeaderMaxlengthDescription - 1) *
            Math.min(scrollValue, Scroll_Distance)) /
            Scroll_Distance
      );
      setNumberOfLines(lines);
    });

    return () => {
      value.removeListener(listenerId);
    };
  }, [value, HeaderMaxlengthDescription, Scroll_Distance]);

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [HeaderMaxHeight, HeaderMinHeight],
    extrapolate: "clamp",
  });

  const animatedHeaderOpacity = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [isOpacityPercentInitial, 0.9],
    extrapolate: "clamp",
  });

  const animatedHeaderTitle = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [28, 18],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      className="absolute top-0 left-0 right-0 z-10 bg-gray_hard"
      style={{
        height: animatedHeaderHeight,
      }}
    >
      <ImageBackground
        source={{ uri: `${ConstantClass.webserviceName}${image}` }}
        className="w-full h-full"
      >
        <Animated.View
          className="w-full h-full flex items-center justify-center bg-black absolute"
          style={{
            opacity: animatedHeaderOpacity,
          }}
        />
        <View className="w-full h-full flex items-center justify-center gap-2 z-10 absolute p-5 pt-10">
          {title ? (
            <Animated.Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: animatedHeaderTitle }}
              className="font-bold text-white text-center "
            >
              {title}
            </Animated.Text>
          ) : null}
          {subtitle ? (
            <Text numberOfLines={2} className="font-bold text-base text-white">
              {subtitle}
            </Text>
          ) : null}
          {description ? (
            <Text
              numberOfLines={numberOfLines}
              ellipsizeMode="tail"
              className="font-light text-md text-white text-center"
            >
              {description}
            </Text>
          ) : null}
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default DynamicHeader;
