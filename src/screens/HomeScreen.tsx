import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo ao Taskly!</Text>
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
    text: {
        fontSize: 24,
        color: COLORS.mainText,
        fontWeight: 'bold',
    },
});
