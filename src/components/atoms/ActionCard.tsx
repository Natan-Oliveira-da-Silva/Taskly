import React from 'react';
import {Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  label: string;
  icon: string;
  onPress?: () => void;
  isDarkMode?: boolean; // <-- novo prop
}

export default function ActionCard({ label, icon, onPress, isDarkMode = false }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#000000' : '#fff' },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.cardLabel, { color: isDarkMode ? '#fff' : '#000000' }]}>
        {label}
      </Text>
      <Icon name={icon} size={28} color={isDarkMode ? '#fff' : '#444'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
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

