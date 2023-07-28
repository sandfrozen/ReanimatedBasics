import React, {ReactElement, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const ELEMENT_SIZE = 100;

const styles = StyleSheet.create({
  element: {
    height: ELEMENT_SIZE,
    width: ELEMENT_SIZE,
    backgroundColor: 'blue',
  },
});

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

// Episode 1
function AnimatedElement(): ReactElement {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const animateElement = () => {
    progress.value = withRepeat(withSpring(0.5, {duration: 500}), 4, true);
    scale.value = withRepeat(withSpring(1, {duration: 500}), 4, true);
  };

  useEffect(() => {
    animateElement();
  });

  const reanimatedElement = useAnimatedStyle(() => ({
    opacity: progress.value,
    borderRadius: (ELEMENT_SIZE * progress.value) / 2,
    transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
  }));

  return (
    <Animated.View
      style={[styles.element, reanimatedElement]}
      onTouchEnd={animateElement}
    />
  );
}

export default AnimatedElement;
