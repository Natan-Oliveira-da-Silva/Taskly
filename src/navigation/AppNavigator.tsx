import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AvatarSelectionScreen from '../screens/AvatarSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from './types';
import { storage } from '../utils/storage';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await storage.getToken();
            setIsAuthenticated(!!token);
        };
        checkToken();
    }, []);

    if (isAuthenticated === null) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

                {isAuthenticated && (
                    <>
                        <Stack.Screen name="AvatarSelectionScreen" component={AvatarSelectionScreen} />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
