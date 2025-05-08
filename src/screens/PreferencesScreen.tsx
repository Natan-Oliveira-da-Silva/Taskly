import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';

import FooterNav from '../components/atoms/FooterNav';
import SimpleButton from '../components/atoms/SimpleButton';

export default function PreferencesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f2f2f2' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Preferências</Text>

      <SimpleButton
        label="Escolher Tema"
        onPress={() => setModalVisible(true)}
        isDarkMode={isDarkMode}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha o tema</Text>

            <View style={styles.imageRow}>
              <TouchableOpacity onPress={() => {/* tema escuro */}}>
                <Image
                  source={require('../assets/avatars/moon.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {/* tema claro */}}>
                <Image
                  source={require('../assets/avatars/sun.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Agora não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FooterNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    margin: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
});


