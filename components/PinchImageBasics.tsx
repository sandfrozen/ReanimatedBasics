import {Dimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,256,0.2)',
  },
});

const imageSource = {
  uri: 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const {width, height} = Dimensions.get('window');

export default function PinchImageBasics() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.rootView}>
          <AnimatedImage
            style={[styles.image, rImageStyle]}
            source={imageSource}
          />
          <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
}
