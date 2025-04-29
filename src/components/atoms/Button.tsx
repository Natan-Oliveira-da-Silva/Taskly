import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../../utils/constants';

type Props = TouchableOpacityProps & {
    title: string;
    variant?: 'filled' | 'outlined';
};

export default function Button({ title, variant = 'filled', ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, variant === 'outlined' ? styles.outlined : styles.filled]}
            {...rest}
        >
            <Text style={[styles.text, variant === 'outlined' ? styles.outlinedText : styles.filledText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 329,
        height: 47,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    filled: {
        backgroundColor: COLORS.primaryLight,
    },
    outlined: {
        borderWidth: 2,
        borderColor: COLORS.primaryLight,
        backgroundColor: 'transparent',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    filledText: {
        color: '#FFF',
    },
    outlinedText: {
        color: COLORS.primaryLight,
    },
});
