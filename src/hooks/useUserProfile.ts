
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
  picture: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [avatarSource, setAvatarSource] = useState<any>(null);

  useEffect(() => {
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

  fetchProfile();
}, []);


  return { profile, avatarSource };
}
