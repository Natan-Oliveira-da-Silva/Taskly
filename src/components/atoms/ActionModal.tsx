import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel: string;
  confirmColor: string;
  isDarkMode?: boolean;
  onConfirm: () => void; // <-- Adicionado
};

export default function ActionModal({
  visible,
  onClose,
  title,
  description,
  confirmLabel,
  confirmColor,
  isDarkMode = false,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? '#fff' : '#000' },
            ]}
          >
            {title}
          </Text>
          {description ? (
            <Text
              style={[
                styles.description,
                { color: isDarkMode ? '#fff' : '#444' },
              ]}
            >
              {description}
            </Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text
                style={[
                  styles.cancelText,
                  { color: isDarkMode ? '#fff' : '#5B3CC4' },
                ]}
              >
                Agora não
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onConfirm();
              }}
              style={[styles.confirm, { backgroundColor: confirmColor }]}
            >
              <Text style={styles.confirmText}>{confirmLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancel: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontWeight: '600',
  },
  confirm: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});

