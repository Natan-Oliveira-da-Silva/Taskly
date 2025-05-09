import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Checkbox from '../components/atoms/Checkbox';
import { COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useErrorModal } from '../context/ErrorModalContext';
import { parseApiError } from '../utils/parseApiError';

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useErrorModal();

    const handleSignIn = useCallback(
        async (email: string, password: string) => {
            try {
                await auth.signIn(email, password);
            } catch (err) {
                showError(parseApiError(err));
            }
        },
        [auth, showError]
    );

    useEffect(() => {
        if (route.params?.email) setEmail(route.params.email);
        if (route.params?.password) setPassword(route.params.password);
    }, [route.params]);

    useEffect(() => {
        const tryBiometricLogin = async () => {
            const enabled = await AsyncStorage.getItem('biometricEnabled');
            const token = await AsyncStorage.getItem('biometricCredentials');
            if (!enabled || !token) return;

            const rnBiometrics = new ReactNativeBiometrics();
            const { available } = await rnBiometrics.isSensorAvailable();
            if (!available) return;

            const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Login com biometria' });
            if (success) {
                try {
                    const { email, password } = JSON.parse(token);
                    await handleSignIn(email, password);
                } catch {
                    Alert.alert('Erro', 'Falha no login biométrico.');
                }
            }
        };

        tryBiometricLogin();
    }, [handleSignIn]);

    const validateFields = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'E-mail é obrigatório.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Formato de e-mail inválido.';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Senha é obrigatória.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validateFields()) return;

        setIsLoading(true);
        try {
            await handleSignIn(email, password);
            await AsyncStorage.setItem('lastLogin', JSON.stringify({ email, password }));

            if (rememberMe) {
                await AsyncStorage.setItem('rememberMe', 'true');
                await AsyncStorage.setItem('biometricCredentials', JSON.stringify({ email, password }));
            } else {
                await AsyncStorage.removeItem('rememberMe');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Text style={styles.logoText}>TASKLY</Text>
                <View style={styles.dot} />
            </View>

            <Input label="E-mail" value={email} onChangeText={setEmail} maskType="email" error={errors.email} />
            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry error={errors.password} />

            <View style={styles.checkboxContainer}>
                <Checkbox label="Lembrar de mim" value={rememberMe} onValueChange={setRememberMe} />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primaryLight} />
            ) : (
                <>
                    <Button title="ENTRAR" variant="filled" onPress={handleLogin} />
                    <Button title="CRIAR CONTA" variant="outlined" onPress={() => navigation.navigate('RegisterScreen')} />
                </>
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
    logoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        position: 'relative',
    },
    logoText: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 48,
        color: COLORS.mainText,
    },
    dot: {
        position: 'absolute',
        width: 19.5,
        height: 19.5,
        borderRadius: 9.75,
        backgroundColor: COLORS.primaryLight,
        top: 8,
        right: -24,
    },
    checkboxContainer: {
        width: 329,
        alignItems: 'flex-start',
        marginBottom: 20,
    },
});
