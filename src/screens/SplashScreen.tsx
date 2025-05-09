import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 2000); // 2 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Text style={styles.logoText}>TASKLY</Text>
                <View style={styles.dot} />
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
    logoWrapper: {
        position: 'relative',
        width: 169,
        height: 56,
        justifyContent: 'center',
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
        top: 2.25,
        right: -22,
    },
});
