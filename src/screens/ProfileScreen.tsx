import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

export default function ProfileScreen() {
  const TOKEN_KEY = 'TOKEN_KEY';
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useTheme();
 

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await AsyncStorage.setItem(TOKEN_KEY,'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5MWYxNWRlZTg0OTUzNjZjOTgyZTA1MTMzYmNhOGYyNDg5ZWFjNzIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoibGV0aWNpYSBkYW1hc2Nlbm8iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGItY29tcGFzcy0yMDI1MDMiLCJhdWQiOiJwYi1jb21wYXNzLTIwMjUwMyIsImF1dGhfdGltZSI6MTc0NjUwNzkzNywidXNlcl9pZCI6InRJMnZUVENsTGplekFZU2RsUUtUc1o1cTQ3bTIiLCJzdWIiOiJ0STJ2VFRDbExqZXpBWVNkbFFLVHNaNXE0N20yIiwiaWF0IjoxNzQ2Nzk0MjgzLCJleHAiOjE3NDY3OTc4ODMsImVtYWlsIjoibGV0aWNpYUBlbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibGV0aWNpYUBlbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.EWEpfFQDuc-OJIBTNN8Mc9ftWlAZD-GJT__s-gN_cHfijuOPW1YpPZG1MCdVDww3wBcV2hjIdclFmOlLnMaK2w-zLHwcgwCE0tnsvMhN4JLgzBuCa7rQ39bNFydPljjVBatE0EKfPwQIbGpTomjZkWDUxZemE9W2lR5HhppC1ScfsbUp3BalALPPfAZjzmalQJ56Dbf-VOUslQXEFXWZ4FSQktFcHgp5e-QzYY6uvN_QxLh7G7hTmjF-WweSVIiJsXDfsZT0dHtDaLuuGxJdciIH23Cq2EgKiwWWqh_WbucMest-Kyi9ZkHteAa36toYo2Z1i300rLTRdD9Vjfl2RA');
        const token = await AsyncStorage.getItem(TOKEN_KEY);
 
        if (!token) {
          console.warn('Token não encontrado');
          return;
        }
 
        // 2. Fazer a requisição GET com o token
        const response = await axios.get('http://15.229.11.44:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
 
        console.log('Resposta da API:', response.data);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };
 
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#f2f2f2' }]}>
      <ProfileInfo
        isDarkMode={isDarkMode}
        name={userName}
        phone={userPicture}
        email={userEmail}
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


















