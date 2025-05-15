// ProfileScreen.tsx
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
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
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { isDarkMode } = useTheme();
    const { profile, avatarSource } = useUserProfile();
    const { signOut } = useAuth();

    const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

    const modalConfigs = {
        '1': {
            title: 'Deseja editar suas informações?',
            description: '',
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

    const handleModalConfirm = async () => {
        if (selectedActionId === '1') {
            navigation.navigate('EditProfileScreen');
        } else if (selectedActionId === '3') {
            try {
                await signOut();
                await AsyncStorage.clear();
                navigation.navigate('AuthStack', {
                    screen: 'LoginScreen',
                });
            } catch (error) {
                Alert.alert('Erro', 'Erro ao sair da conta');
            }
        }
        closeModal();
    };

    const config = selectedActionId ? modalConfigs[selectedActionId as keyof typeof modalConfigs] : null;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#f2f2f2' }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <ProfileInfo
                    isDarkMode={isDarkMode}
                    name={profile?.name || ''}
                    phone_number={profile?.phone_number || ''}
                    email={profile?.email || ''}
                    avatarSource={avatarSource}
                />

                <View style={styles.carouselWrapper}>
                    <FlatList
                        horizontal
                        data={carouselData}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.cardWrapper}>
                                <ActionCard
                                    label={item.label}
                                    icon={item.icon}
                                    onPress={() => handleCardPress(item.id)}
                                    isDarkMode={isDarkMode}
                                />
                            </View>
                        )}
                        contentContainerStyle={styles.carouselContainer}
                    />
                </View>

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

                <View style={{ height: 50 }} />
            </ScrollView>

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
                    onConfirm={handleModalConfirm}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: 16, paddingBottom: 64 },
    carouselWrapper: { marginTop: -80 },
    carouselContainer: { paddingLeft: 8, height: 165, alignItems: 'center' },
    cardWrapper: { width: 135, height: 140, marginRight: 12 },
    buttons: { marginTop: 20, gap: 12 },
});
