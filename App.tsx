import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';
import { COLORS } from './constants';
import {AuthProvider} from './AuthContext.tsx';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </GestureHandlerRootView>
    );
}
