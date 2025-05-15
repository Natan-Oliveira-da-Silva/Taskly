// ActionCard.tsx
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  label: string;
  icon: string;
  onPress?: () => void;
  isDarkMode?: boolean;
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
        <View style={styles.content}>
          <Text style={[styles.cardLabel, { color: isDarkMode ? '#fff' : '#000000' }]}>
            {label}
          </Text>
          <Icon name={icon} size={28} color={isDarkMode ? '#fff' : '#444'} />
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 3,
    marginBottom: 10,
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
});
