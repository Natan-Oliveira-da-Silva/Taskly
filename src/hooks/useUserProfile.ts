// src/hooks/useUserProfile.ts
import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

const avatarMap: Record<string, any> = {
  avatar_1: require('../assets/avatars/avatar1.png'),
  avatar_2: require('../assets/avatars/avatar2.png'),
  avatar_3: require('../assets/avatars/avatar3.png'),
  avatar_4: require('../assets/avatars/avatar4.png'),
  avatar_5: require('../assets/avatars/avatar5.png'),
};

interface ProfileData {
  name: string;
  phone_number: string;
  email?: string;
  picture: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [avatarSource, setAvatarSource] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    console.log('🔍 Iniciando fetch do perfil...');
    try {
      const token = await storage.getToken();
      console.log('🔑 Token recuperado:', token);
      if (!token) return;

      const response = await fetch('http://15.229.11.44:3000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('✅ Dados recebidos do backend:', data);

      setProfile(data);
      const avatar = avatarMap[data.picture] || require('../assets/avatars/ellipse1.png');
      setAvatarSource(avatar);
    } catch (error) {
      console.error('❌ Erro ao carregar o perfil:', error);
    }
  };

  const updateProfile = async (name: string, phone_number: string, picture: string) => {
    try {
      const token = await storage.getToken();
      if (!token) throw new Error('Token não encontrado.');

      const response = await fetch('http://15.229.11.44:3000/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone_number, picture }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // ✅ Recarrega os dados atualizados do perfil
      await fetchProfile();
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
    }
  };

  return { profile, avatarSource, updateProfile, fetchProfile };
}

