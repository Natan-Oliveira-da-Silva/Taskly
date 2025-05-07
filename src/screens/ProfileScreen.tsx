// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, Switch, SafeAreaView } from 'react-native';
import ActionCard from '../components/atoms/ActionCard';
import ProfileInfo from '../components/atoms/ProfileInfo';
import SimpleButton from '../components/atoms/SimpleButton';
import FooterNav from '../components/atoms/FooterNav';
import ActionModal from '../components/atoms/ActionModal';
import carouselData from '../data/carouselData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import axios from 'axios';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const modalConfigs = {
    '1': {
      title: 'Deseja editar suas informações?',
      confirmLabel: 'EDITAR',
      confirmColor: '#28a745',
    },
    '2': {
      title: 'Ativar biometria',
      description: 'Deseja ativar a autenticação por biometria? Isso permitirá um acesso mais rápido e seguro ao app.',
      confirmLabel: 'HABILITAR',
      confirmColor: '#28a745',
    },
    '3': {
      title: 'Deseja sair?',
      description: 'Tem certeza que deseja sair do aplicativo? Você poderá se conectar novamente a qualquer momento.',
      confirmLabel: 'SAIR',
      confirmColor: '#dc3545',
    },
    '4': {
      title: 'Excluir conta',
      description: 'Tem certeza que deseja excluir sua conta? Essa ação é permanente e todos os seus dados serão perdidos.',
      confirmLabel: 'EXCLUIR',
      confirmColor: '#dc3545',
    },
  };

  const handleCardPress = (id: string) => setSelectedActionId(id);
  const closeModal = () => setSelectedActionId(null);
  const config = selectedActionId ? modalConfigs[selectedActionId as keyof typeof modalConfigs] : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmOWEwNTBkYzRhZTgyOGMyODcxYzMyNTYzYzk5ZDUwMjc3ODRiZTUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9obiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wYi1jb21wYXNzLTIwMjUwMyIsImF1ZCI6InBiLWNvbXBhc3MtMjAyNTAzIiwiYXV0aF90aW1lIjoxNzQ2NjQ1MDA0LCJ1c2VyX2lkIjoibVBuYUUyalJBVldJSUJuSURkVlBTY0c2amRLMiIsInN1YiI6Im1QbmFFMmpSQVZXSUlCbklEZFZQU2NHNmpkSzIiLCJpYXQiOjE3NDY2NDUwMDQsImV4cCI6MTc0NjY0ODYwNCwiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb2huQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.D8Z6SyCc3OjXg9OTsRQBU8RnSVsqyUUGvOTCU2gUECi6a_ldjuVe1fDmEPm9dPtHVjKIZ856YYv1xptlr_dr_luEBrUuvtmes_lCXLlANcfSrqJMdrFflHmqK4pb8giLkrJ9w5HeMR7oUGheS6iIDWHLiw7op4-ZYy44kwFEwnTwwLShJdqfhVcwMWVJJx0--_rzRFn3fWPtLwktrAC9XlgUamL6WkpPH9PVdlLfpLori9CM3S7JXWrxibaJr0OL9spDUsznjuGjVtP5Ot4pQIZhWYcZBgikDCJA-8hTVlvBKZid6dAsafSXPBzmfTXg0uJL7VVoCbsCnZIUlAKDvA';
        const response = await axios.get('http://15.229.11.44:3000', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, phone, email } = response.data;
        setUserName(name);
        setUserPhone(phone);
        setUserEmail(email);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }]}>
      <ProfileInfo
        isDarkMode={isDarkMode}
        name={userName}
        phone={userPhone}
        email={userEmail}
      />

      <FlatList
        horizontal
        data={carouselData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActionCard
            label={item.label}
            icon={item.icon}
            onPress={() => handleCardPress(item.id)}
            isDarkMode={isDarkMode}
          />
        )}
      />

      <View style={styles.buttons}>
        <SimpleButton label="Preferências >" onPress={() => setIsModalVisible(true)} isDarkMode={isDarkMode} />
        <SimpleButton
          label="Termos e regulamentos >"
          onPress={() => navigation.navigate('TermsScreen')}
          isDarkMode={isDarkMode}
        />
      </View>

      <FooterNav backgroundColor={isDarkMode ? '#000000' : '#f2f2f2'} />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Preferências</Text>
            <Text style={styles.modalLabel}>Modo Dark</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
            <SimpleButton label="Fechar" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {config && (
        <ActionModal
          visible={!!selectedActionId}
          onClose={closeModal}
          title={config.title}
          description={config.description}
          confirmLabel={config.confirmLabel}
          confirmColor={config.confirmColor}
          isDarkMode={isDarkMode}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 64,
  },
  buttons: {
    marginTop: 40,
    marginBottom: 120,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});







