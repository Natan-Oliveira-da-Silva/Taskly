import React from 'react';
import { View, Text, StyleSheet, Alert, Modal } from 'react-native';
import Button from '../../components/atoms/Button';
import { COLORS } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';

type BiometricModalProps = {
    visible: boolean;
    credentials: {
        email: string;
        password: string;
    };
    onClose: () => void;
};

export default function BiometricModal({ visible, credentials, onClose }: BiometricModalProps) {
    const handleConfirm = async () => {
        const rnBiometrics = new ReactNativeBiometrics();
        const { available } = await rnBiometrics.isSensorAvailable();

        if (!available) {
            Alert.alert('Biometria indisponível', 'Seu dispositivo não suporta biometria ou não há nenhuma digital cadastrada.');
            return onClose();
        }

        const { success } = await rnBiometrics.simplePrompt({
            promptMessage: 'Confirme sua digital para ativar o login por biometria',
            fallbackPromptMessage: 'Usar senha',
        });

        if (success) {
            await AsyncStorage.setItem('biometricEnabled', 'true');
            await AsyncStorage.setItem('biometricCredentials', JSON.stringify(credentials));
        } else {
            Alert.alert('Erro', 'Não foi possível ativar a biometria.');
        }

        onClose();
    };

    const handleSkip = () => {
        onClose();
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.title}>Ative desbloqueio por Biometria</Text>
                    <Text style={styles.description}>
                        Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar a senha sempre que quiser.
                    </Text>
                    <View style={styles.buttonRow}>
                        <Button title="AGORA NÃO" variant="outlined" onPress={handleSkip} height={39} width={140} />
                        <Button title="ATIVAR" variant="filled" onPress={handleConfirm} height={39} width={140} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 24,
        alignItems: 'flex-start',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 20,
        color: COLORS.mainText,
        marginBottom: 12,
    },
    description: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: COLORS.mainText,
        marginBottom: 24,
        textAlign: 'left',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
});
