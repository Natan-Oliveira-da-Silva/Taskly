import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
    const { signOut } = useAuth();

    return (
      <View style={styles.container}>
          <Text style={styles.text}>Bem-vindo ao Taskly!</Text>
          <Button title="Sair" variant="outlined" onPress={signOut} />
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
