import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '../hooks/useUserProfile';
import { useTheme } from '../context/ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import FooterNav from '../components/atoms/FooterNav';

type NavigationProp = StackNavigationProp<RootStackParamList, 'EditProfileScreen'>;

export default function EditProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { profile, updateProfile } = useUserProfile();
  const { isDarkMode } = useTheme();

  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setPhoneNumber(profile.phone_number || '');
      setEmail(profile.email || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({ name, phone_number, email });
      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' }]}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={[styles.backText, { color: isDarkMode ? '#fff' : '#fff' }]}>‹  VOLTAR</Text>
            </TouchableOpacity>
              <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>EDIÇÃO DE PERFIL</Text>
              <View style={{ width: 80 }} />
            </View>
      <Text style={[styles.labelname, { color: isDarkMode ? '#fff' : '#000' }]}>Nome</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#eee', color: isDarkMode ? '#fff' : '#000' }]}
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Telefone</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#eee', color: isDarkMode ? '#fff' : '#000' }]}
        value={phone_number}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>Email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#eee', color: isDarkMode ? '#fff' : '#000' }]}
        value={email}
        editable={false}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  labelname: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    marginTop:80,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#5B3CC4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  backText: {
    paddingTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#1E1E1E',
    marginRight: 50,
    marginLeft: 5,
    padding: 10,
    borderRadius:20,
  },
});
