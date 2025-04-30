import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/atoms/Button';
import { COLORS } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function BiometricModal() {
    const navigation = useNavigation<any>();

    const handleConfirm = () => {
        navigation.navigate('AvatarSelectionScreen');
    };

    const handleSkip = () => {
        navigation.navigate('AvatarSelectionScreen');
    };

    return (
      <View style={styles.overlay}>
          <View style={styles.card}>
              <Text style={styles.title}>Ative desbloqueio por Biometria</Text>
              <Text style={styles.description}>
                  Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar a senha sempre que quiser.
              </Text>

              <View style={styles.buttonRow}>
                  <Button title="AGORA NÃO" variant="outlined" onPress={handleSkip} height={39} />
                  <Button title="ATIVAR" variant="filled" onPress={handleConfirm} height={39} />
              </View>
          </View>
      </View>
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
