import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  onPress?: () => void;
  isDarkMode?: boolean;
}

export default function SimpleButton({ label, onPress, isDarkMode = false }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isDarkMode ? '#000000' : '#fff' },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: isDarkMode ? '#fff' : '#000' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});



