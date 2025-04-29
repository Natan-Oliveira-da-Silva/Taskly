import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Checkbox from '../components/atoms/Checkbox';
import { COLORS } from '../utils/constants';

export default function LoginScreen() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

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

    const handleLogin = () => {
        if (validateFields()) {
            navigation.navigate('HomeScreen');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Text style={styles.logoText}>TASKLY</Text>
                <View style={styles.dot} />
            </View>

            <Input
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
            />

            <Input
                label="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                error={errors.password}
            />

            <View style={styles.checkboxContainer}>
                <Checkbox
                    label="Lembrar de mim"
                    value={rememberMe}
                    onValueChange={setRememberMe}
                />
            </View>

            <Button title="ENTRAR" variant="filled" onPress={handleLogin} />
            <Button
                title="CRIAR CONTA"
                variant="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            />
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
