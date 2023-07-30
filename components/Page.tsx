import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type PageProps = {
  index: number;
  word: string;
  translateX: Animated.SharedValue<number>;
};

const {height, width} = Dimensions.get('window');

const SQUARE_SIZE = width * 0.7;

const styles = StyleSheet.create({
  view: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default function Page({index, word, translateX}: PageProps) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const animatedSquareStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      SQUARE_SIZE / 2,
      0,
    ]);
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-1.7, 1, -1.7],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 4, 1, -height / 4],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}, {scale}],
    };
  });

  return (
    <View
      style={[
        styles.view,
        {backgroundColor: `rgba(0, 0, 255, 0.${index + 1})`},
      ]}>
      <Animated.View style={[styles.square, animatedSquareStyle]} />
      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.text}>{word}</Text>
      </Animated.View>
    </View>
  );
}
