// PreferencesScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import FooterNav from '../components/atoms/FooterNav';
import SimpleButton from '../components/atoms/SimpleButton';
import { useTheme } from '../context/ThemeContext';

export default function PreferencesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode, setTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f2f2f2' }]}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={[styles.backText, { color: isDarkMode ? '#fff' : '#fff' }]}>‹  VOLTAR</Text>
      </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Preferências</Text>
        <View style={{ width: 80 }} />
      </View>

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
              <TouchableOpacity onPress={() => { setTheme('dark'); setModalVisible(false); }}>
                <Image source={require('../assets/avatars/moon.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setTheme('light'); setModalVisible(false); }}>
                <Image source={require('../assets/avatars/sun.png')} style={styles.image} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  modalContent: {
    margin: 32,
    backgroundColor: '#d3d3d3',
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
    color: '#008000',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    //borderWidth: 1,
    //borderColor: '#808080',
  },
  backText: {
    paddingTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#1E1E1E',
    marginRight: 50,
    marginLeft: 30,
    padding: 10,
    borderRadius:20,
  },
});




