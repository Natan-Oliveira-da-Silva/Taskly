import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/utils/constants';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
            <AppNavigator />
        </GestureHandlerRootView>
    );
}