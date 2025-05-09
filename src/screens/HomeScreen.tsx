import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/constants';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiometricModal from './modal/BiometricModal';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const { signOut } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

    useEffect(() => {
        const handleStartup = async () => {
            const firstLogin = await AsyncStorage.getItem('firstLogin');

            if (firstLogin === 'true') {
                await AsyncStorage.removeItem('firstLogin');
                navigation.replace('AvatarSelectionScreen');
                return;
            }

            const enabled = await AsyncStorage.getItem('biometricEnabled');
            const remember = await AsyncStorage.getItem('rememberMe');
            const creds = await AsyncStorage.getItem('biometricCredentials');

            if (!enabled && remember && creds) {
                setCredentials(JSON.parse(creds));
                setShowModal(true);
            }
        };

        handleStartup();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo ao Taskly!</Text>
            <Button title="Ir para Tarefa" variant="filled" onPress={() => {}} />
            <Button title="Sair" variant="outlined" onPress={signOut} />
            {showModal && credentials && (
                <BiometricModal
                    credentials={credentials}
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    text: {
        fontSize: 24,
        color: COLORS.mainText,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
