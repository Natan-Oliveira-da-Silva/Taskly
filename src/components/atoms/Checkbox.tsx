import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

type Props = {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
};

export default function Checkbox({ label, value, onValueChange }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onValueChange(!value)}>
            <View style={[styles.box, value && styles.boxChecked]}>
                {value && <Text style={styles.check}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginLeft: 8,
    },
    box: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: COLORS.secondaryText,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxChecked: {
        borderColor: '#32C25B',
    },
    check: {
        color: '#32C25B',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 16,
        marginTop: -1,
    },
    label: {
        fontSize: 16,
        marginLeft: 8,
        color: COLORS.mainText,
    },
});
