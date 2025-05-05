import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  isDarkMode?: boolean;
}

export default function ProfileInfo({ isDarkMode = false }: Props) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.avatarPlaceholder} />
      <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>Rafaela Santos</Text>
      <Text style={[styles.email, { color: isDarkMode ? '#fff' : '#000' }]}>rafaela.santos@compasso.com.br</Text>
      <Text style={[styles.phone, { color: isDarkMode ? '#fff' : '#000' }]}> (81) 98650 - 9240 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 44,
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 5,
  },
  phone: {
    fontSize: 18,
    marginBottom: 18,
  },
});

