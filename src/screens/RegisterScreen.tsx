import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native';
import { COLORS } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const validate = () => {
        const newErrors = { name: '', email: '', phoneNumber: '', password: '', confirmPassword: '' };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório.';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'E-mail é obrigatório.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Formato de e-mail inválido.';
            isValid = false;
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Número de celular é obrigatório.';
            isValid = false;
        } else if (phoneNumber.replace(/\D/g, '').length < 10) {
            newErrors.phoneNumber = 'Formato de número inválido.';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Senha é obrigatória.';
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = () => {
        if (validate()) {
            navigation.navigate('BiometricModal');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Criar Conta</Text>

                <TextInput
                    placeholder="Nome completo"
                    placeholderTextColor={COLORS.secondaryText}
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor={COLORS.secondaryText}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                <TextInputMask
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                    }}
                    placeholder="Número de celular"
                    placeholderTextColor={COLORS.secondaryText}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={styles.input}
                    keyboardType="numeric"
                />
                {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

                <TextInput
                    placeholder="Senha"
                    placeholderTextColor={COLORS.secondaryText}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                <TextInput
                    placeholder="Confirmar senha"
                    placeholderTextColor={COLORS.secondaryText}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                />
                {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

                <TouchableOpacity style={styles.filledButton} onPress={handleRegister}>
                    <Text style={styles.filledButtonText}>CRIAR CONTA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 32,
        color: COLORS.mainText,
        marginBottom: 24,
    },
    input: {
        width: 329,
        height: 47,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        borderColor: COLORS.primaryLight,
        fontSize: 16,
        color: COLORS.mainText,
        marginBottom: 40,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginBottom: 8,
    },
    filledButton: {
        width: 329,
        height: 47,
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    filledButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
