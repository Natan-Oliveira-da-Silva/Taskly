import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { COLORS } from './src/utils/constants';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from "./src/context/AuthContext.tsx";
import AppNavigator from "./src/navigation/AppNavigator.tsx";
import {ErrorModalProvider} from "./src/context/ErrorModalContext.tsx";
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <PaperProvider>
                        <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
                        <AuthProvider>
                            <ErrorModalProvider>
                                <AppNavigator />
                            </ErrorModalProvider>
                        </AuthProvider>
                </PaperProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}

