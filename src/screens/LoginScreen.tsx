import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import {COLORS} from "../utils/constants.ts";

export default function LoginScreen() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.logo}>TASKLY</Text>

                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor={COLORS.secondaryText}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    placeholderTextColor={COLORS.secondaryText}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                <View style={styles.checkboxRow}>
                    <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                    <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
                </View>

                <TouchableOpacity style={styles.filledButton}>
                    <Text style={styles.filledButtonText}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlinedButton}>
                    <Text style={styles.outlinedButtonText}>CRIAR CONTA</Text>
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
    logo: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 48,
        color: COLORS.mainText,
        marginBottom: 32,
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
        marginBottom: 12,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: 16,
        marginLeft: 8,
        color: COLORS.mainText,
    },
    filledButton: {
        width: 329,
        height: 47,
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    filledButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    outlinedButton: {
        width: 329,
        height: 47,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlinedButtonText: {
        color: COLORS.primaryLight,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
