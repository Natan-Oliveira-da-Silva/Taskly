import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/constants';

type Props = {
    title: string;
    variant?: 'filled' | 'outlined' | 'green' | 'danger';
    onPress: () => void;
    height?: number;
    width?: number;
    style?: ViewStyle;
};

export default function Button({ title, variant = 'filled', onPress, height = 47, width, style }: Props) {
    const buttonStyle: ViewStyle[] = [
        styles.base,
        { height },
        width ? { width } : {},
        variant === 'filled' && styles.filled,
        variant === 'outlined' && styles.outlined,
        variant === 'green' && styles.green,
        variant === 'danger' && styles.danger,
        style,
    ].filter(Boolean) as ViewStyle[];

    const textStyle = [
        styles.text,
        variant === 'outlined' && { color: COLORS.primaryLight },
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        width: 329,
        borderRadius: 8,
        paddingHorizontal: 16,
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
    green: {
        backgroundColor: COLORS.secondaryText,
    },
    danger: {
        backgroundColor: COLORS.error,
    },
    text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
