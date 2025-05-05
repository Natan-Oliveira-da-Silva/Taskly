import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, Switch, SafeAreaView } from 'react-native';
import ActionCard from '../components/atoms/ActionCard';
import ProfileInfo from '../components/atoms/ProfileInfo';
import SimpleButton from '../components/atoms/SimpleButton';
import FooterNav from '../components/atoms/FooterNav';
import ActionModal from '../components/atoms/ActionModal';
import carouselData from '../data/carouselData';
import { WebView } from 'react-native-webview';

export default function ProfileScreen() {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPrefsModalVisible, setIsPrefsModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f2f2f2' }]}>
      <ProfileInfo isDarkMode={isDarkMode} />

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
        <SimpleButton label="Preferências >" onPress={() => setIsPrefsModalVisible(true)} isDarkMode={isDarkMode} />
        <SimpleButton label="Termos e regulamentos >" onPress={() => setIsTermsModalVisible(true)} isDarkMode={isDarkMode} />
      </View>

      <FooterNav backgroundColor={isDarkMode ? '#000000' : '#f2f2f2'} />

      <Modal visible={isPrefsModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Preferências</Text>
            <Text style={styles.modalLabel}>Modo Dark</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
            <SimpleButton label="Fechar" onPress={() => setIsPrefsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={isTermsModalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <SimpleButton label="Fechar" onPress={() => setIsTermsModalVisible(false)} />
          <WebView source={{ uri: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/' }} style={{ flex: 1 }} />
        </SafeAreaView>
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




