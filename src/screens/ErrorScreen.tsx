import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ErrorScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Algo deu errado!</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#721c24',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    padding: 12,
    backgroundColor: '#f5c6cb',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: '#721c24',
  },
});
