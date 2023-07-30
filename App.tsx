import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedScrollView from './components/AnimatedScrollView';

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
      <AnimatedScrollView />
    </View>
  );
}
