import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/constants';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
        <AppNavigator />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
