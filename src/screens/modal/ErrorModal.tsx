import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorModalProps {
    visible: boolean;
    message: string;
    onClose: () => void;
}

export default function ErrorModal({ visible, message, onClose }: ErrorModalProps) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Ops! Ocorreu um problema</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>FECHAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        marginBottom: 24,
        textAlign: 'center',
    },
    button: {
        borderWidth: 1.5,
        borderColor: '#583CC4',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: '#583CC4',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
