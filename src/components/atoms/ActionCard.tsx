import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  label: string;
  icon: string;
}

export default function ActionCard({ label, icon }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Icon name={icon} size={28} color="#444" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width:  160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 10,
  },
  cardLabel: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 8,
  },
});
