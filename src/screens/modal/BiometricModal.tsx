import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function BiometricModal() {
    const navigation = useNavigation<any>();

    const handleSkip = () => {
        navigation.navigate('AvatarSelectionScreen');
    };

    const handleActivate = () => {
        // No futuro: aqui integrará a biometria real
        navigation.navigate('AvatarSelectionScreen');
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modalCard}>
                <Text style={styles.title}>Ative desbloqueio por Biometria</Text>
                <Text style={styles.description}>
                    Deseja ativar o login com biometria para facilitar o acesso ao app?
                </Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.outlinedButton} onPress={handleSkip}>
                        <Text style={styles.outlinedButtonText}>AGORA NÃO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filledButton} onPress={handleActivate}>
                        <Text style={styles.filledButtonText}>ATIVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalCard: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 20,
        color: COLORS.mainText,
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: COLORS.secondaryText,
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    filledButton: {
        flex: 1,
        height: 47,
        backgroundColor: COLORS.primaryLight,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    filledButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    outlinedButton: {
        flex: 1,
        height: 47,
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    outlinedButtonText: {
        color: COLORS.primaryLight,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
