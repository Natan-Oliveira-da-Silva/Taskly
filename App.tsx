import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';
import {AuthProvider} from './AuthContext.tsx';
import { COLORS } from './src/utils/constants';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
