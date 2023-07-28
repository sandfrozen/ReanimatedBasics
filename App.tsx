import React, {ReactElement} from 'react';
import PanGestureHandler from './components/PanGestureHandler';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App(): ReactElement {
  return (
    <View style={styles.container}>
      <PanGestureHandler />
    </View>
  );
}

export default App;
