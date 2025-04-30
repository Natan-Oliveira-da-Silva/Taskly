import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { COLORS } from '../utils/constants';

export default function RegisterScreen() {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const validateFields = () => {
        const newErrors = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        };

        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Nome é obrigatório.';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'E-mail é obrigatório.';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Formato de e-mail inválido.';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Celular é obrigatório.';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Senha é obrigatória.';
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirme a senha.';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = () => {
        if (validateFields()) {
            setShowModal(true); // ativa o modal
        }
    };

    const handleSkip = () => {
        setShowModal(false);
        navigation.navigate('AvatarSelectionScreen');
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigation.navigate('AvatarSelectionScreen');
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
              <Text style={styles.title}>Cadastro</Text>

              <Input label="Nome completo" value={name} onChangeText={setName} error={errors.name} />
              <Input label="E-mail" value={email} onChangeText={setEmail} maskType="email" error={errors.email} />
              <Input label="Celular" value={phone} onChangeText={setPhone} maskType="cel-phone" error={errors.phone} />
              <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry error={errors.password} />
              <Input label="Confirmar senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={errors.confirmPassword} />

              <Button title="CRIAR CONTA" variant="filled" onPress={handleRegister} />

              <Modal visible={showModal} transparent animationType="fade">
                  <View style={styles.overlay}>
                      <View style={styles.card}>
                          <Text style={styles.modalTitle}>Ative desbloqueio por Biometria</Text>
                          <Text style={styles.modalDescription}>
                              Use sua impressão digital para acessar seu app de tarefas com rapidez e segurança. Se preferir, você ainda poderá usar a senha sempre que quiser.
                          </Text>

                          <View style={styles.buttonRow}>
                              <Button title="AGORA NÃO" variant="outlined" onPress={handleSkip} height={39} style={{ width: '48%' }} />
                              <Button title="ATIVAR" variant="filled" onPress={handleConfirm} height={39} style={{ width: '48%' }} />
                          </View>
                      </View>
                  </View>
              </Modal>
          </ScrollView>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.mainText,
        marginBottom: 24,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 24,
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: 20,
        color: COLORS.mainText,
        marginBottom: 12,
    },
    modalDescription: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: COLORS.secondaryText,
        marginBottom: 24,
        textAlign: 'left',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 12,
    },
});
