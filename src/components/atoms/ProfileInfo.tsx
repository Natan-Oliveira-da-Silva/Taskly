import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  isDarkMode?: boolean;
  name: string;
  phone: string;
  email: string;
  picture: string;
}

export default function ProfileInfo({ isDarkMode = false, name, phone, email, picture }: Props) {
  return (
    <View style={styles.profileContainer}>
      <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>{name}</Text>
      <Text style={[styles.email, { color: isDarkMode ? '#fff' : '#000' }]}>{email}</Text>
      <Text style={[styles.phone, { color: isDarkMode ? '#fff' : '#000' }]}>{phone}</Text>
      <Text style={[styles.picture, { color: isDarkMode ? '#fff' : '#000' }]}>{picture}</Text>
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
  picture: {
    fontSize: 40,
    marginBottom: 18,
  },
});



