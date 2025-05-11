import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNavigation } from '@react-navigation/native';

const avatarMap = {
  avatar_1: require('../assets/avatars/avatar1.png'),
  avatar_2: require('../assets/avatars/avatar2.png'),
  avatar_3: require('../assets/avatars/avatar3.png'),
  avatar_4: require('../assets/avatars/avatar4.png'),
  avatar_5: require('../assets/avatars/avatar5.png'),
};

export default function EditProfileScreen() {
  const { profile, updateProfile } = useUserProfile();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar_1');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setPhoneNumber(profile.phone_number || '');
      setSelectedAvatar(profile.picture || 'avatar_1');
    }
  }, [profile]);

  const handleAvatarSelect = (avatarKey: string) => {
    setSelectedAvatar(avatarKey);
    setModalVisible(false);
  };

  const handleSave = async () => {
    setLoading(true);
    await updateProfile(name, phoneNumber, selectedAvatar);
    setLoading(false);
    navigation.goBack();
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        placeholder="Apenas números"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={profile.email}
        editable={false}
      />

      <Text style={styles.label}>Avatar</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={avatarMap[selectedAvatar]} style={styles.avatarPreview} />
      </TouchableOpacity>

      <Button title={loading ? 'Salvando...' : 'Salvar'} onPress={handleSave} disabled={loading} />

      {/* Modal de seleção de avatar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha seu avatar</Text>
            <View style={styles.avatarGrid}>
              {Object.keys(avatarMap).map((key) => (
                <TouchableOpacity key={key} onPress={() => handleAvatarSelect(key)}>
                  <Image
                    source={avatarMap[key]}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === key && styles.selectedAvatar,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginBottom: 12,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#555',
  },
  avatarPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#007BFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});





