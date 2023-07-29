import React from 'react';
import AnimatedGestureHandler from './components/AnimatedGestureHandler';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <AnimatedGestureHandler />
    </View>
  );
}
