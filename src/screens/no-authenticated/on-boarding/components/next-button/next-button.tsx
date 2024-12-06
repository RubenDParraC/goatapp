import type React from "react";
import { useEffect, useRef } from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import IconComponent from "../../../../../components/icon-component/icon-component";
import type { NextButtonProps } from "./types";

const NextButton: React.FC<NextButtonProps> = ({ scrollTo, percentage }) => {
  const size = 50;
  const strokeWidth = 0;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle | null>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [progressAnimation, circumference]);

  return (
    <View className="w-full flex flex-1 items-center justify-center">
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center},${center}`}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#FF724C"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        className="absolute bg-secondary rounded-full p-1"
        activeOpacity={0.6}
        onPress={scrollTo}
      >
        <IconComponent
          icon="AntDesign"
          name="arrowright"
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
