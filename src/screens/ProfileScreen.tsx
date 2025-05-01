import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ActionCard from '../components/atoms/ActionCard';
import ProfileInfo from '../components/atoms/ProfileInfo';
import SimpleButton from '../components/atoms/SimpleButton';
import FooterNav from '../components/atoms/FooterNav';
import ActionModal from '../components/atoms/ActionModal';
import carouselData from '../data/carouselData';

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

export default function ProfileScreen() {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  const handleCardPress = (id: string) => {
    setSelectedActionId(id);
  };

  const closeModal = () => setSelectedActionId(null);

  const config = selectedActionId ? modalConfigs[selectedActionId] : null;

  return (
    <View style={styles.container}>
      <ProfileInfo />

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
          />
        )}
      />

      <View style={styles.buttons}>
        <SimpleButton label="Preferências" />
        <SimpleButton label="Termos e regulamentos" />
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
    paddingBottom: 64,
  },
  buttons: {
    marginTop: 40,
    marginBottom: 120,
  },
});









