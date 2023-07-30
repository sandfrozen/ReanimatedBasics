import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from './Page';
import React from 'react';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

const WORDS = ['Scroll', 'left', 'to', 'see', 'more!'];

// Episode 3
export default function AnimatedScrollView() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      style={styles.scrollView}>
      {WORDS.map((word, index) => (
        <Page index={index} word={word} key={word} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  );
}
