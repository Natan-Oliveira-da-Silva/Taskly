import React from 'react';
import { StatusBar } from 'react-native';
import {COLORS} from "./src/utils/constants.ts";
import SplashScreen from "./src/screens/SplashScreen.tsx";

export default function App() {
    return (
        <>
            <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
            <SplashScreen />
        </>
    );
}
