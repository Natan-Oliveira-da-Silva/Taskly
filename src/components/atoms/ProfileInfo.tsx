import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileInfo() {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.name}>Rafaela Santos</Text>
      <Text style={styles.email}>rafaela.santos@compasso.com.br</Text>
      <Text style={styles.phone}>(81) 98650 - 9240</Text>
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
    color: '#666',
    marginBottom: 5,
  },
  phone: {
    fontSize: 18,
    color: '#666',
    marginBottom: 18,
  },
});
