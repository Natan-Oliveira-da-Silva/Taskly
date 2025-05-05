import React from 'react';
import { Modal, View, Text, Switch, StyleSheet } from 'react-native';

interface ModalPreferencesProps {
  visible: boolean;
  toggleDarkMode: () => void;
}

const ModalPreferences: React.FC<ModalPreferencesProps> = ({ visible, toggleDarkMode }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Preferências de Tema</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Modo Escuro</Text>
            <Switch onValueChange={toggleDarkMode} value={visible} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default ModalPreferences;



