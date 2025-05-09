import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ActionCard from '../components/atoms/ActionCard';
import ProfileInfo from '../components/atoms/ProfileInfo';
import SimpleButton from '../components/atoms/SimpleButton';
import FooterNav from '../components/atoms/FooterNav';
import ActionModal from '../components/atoms/ActionModal';
import carouselData from '../data/carouselData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import { useUserProfile } from '../hooks/useUserProfile';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useTheme();
  const { profile, avatarSource } = useUserProfile();


  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

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
  console.log('🖥️ ProfileScreen foi montada');


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#f2f2f2' }]}>
      <ProfileInfo
      isDarkMode={isDarkMode}
      name={profile?.name || ''}
      phone_number={profile?.phone_number || ''}
      email={profile?.email || ''}
      avatarSource={avatarSource}
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
        <SimpleButton
          label="Preferências >"
          onPress={() => navigation.navigate('PreferencesScreen')}
          isDarkMode={isDarkMode}
        />
        <SimpleButton
          label="Termos e regulamentos >"
          onPress={() => navigation.navigate('TermsScreen')}
          isDarkMode={isDarkMode}
        />
      </View>

      <FooterNav />

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
});



















