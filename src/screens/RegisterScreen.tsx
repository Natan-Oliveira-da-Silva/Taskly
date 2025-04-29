import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { COLORS } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../services/api';

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
        } else if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Formato de telefone inválido.';
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

    const handleRegister = async () => {
        if (validate()) {
            try {
                await registerUser({
                    name,
                    email,
                    phone_number: phoneNumber.replace(/\D/g, ''),
                    password,
                });
                navigation.navigate('BiometricModal');
            } catch (error) {
                console.error('Erro ao registrar usuário:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Criar Conta</Text>

                <InputField value={name} onChangeText={setName} placeholder="Nome completo" error={errors.name} />
                <InputField value={email} onChangeText={setEmail} placeholder="E-mail" error={errors.email} />

                <MaskedInput
                    type="cel-phone"
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                    }}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder="Número de celular"
                    placeholderTextColor={COLORS.secondaryText}
                    style={styles.input}
                    keyboardType="numeric"
                />
                {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

                <InputField value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry error={errors.password} />
                <InputField value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirmar senha" secureTextEntry error={errors.confirmPassword} />

                <TouchableOpacity style={styles.filledButton} onPress={handleRegister}>
                    <Text style={styles.filledButtonText}>CRIAR CONTA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function InputField({ value, onChangeText, placeholder, error, secureTextEntry = false }: any) {
    return (
        <>
            <TextInputMask
                type={null}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={COLORS.secondaryText}
                secureTextEntry={secureTextEntry}
                style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
    );
}

const MaskedInput = TextInputMask;

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
        marginBottom: 4,
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
