import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
}

export default function SimpleButton({ label }: Props) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
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
