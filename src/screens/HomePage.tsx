import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TabBar from '../components/molecules/TabBar';
import CreateTaskModal from './modal/CreateTaskModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { storage } from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiometricModal from './modal/BiometricModal';
import { useAuth } from '../context/AuthContext'; // <<< IMPORTAÇÃO

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  done: boolean;
  createdAt: string;
  status: 'pendente' | 'concluida';
  prioridade?: string;
  prazo: string;
}

export default function HomePage() {
  const navigation = useNavigation<HomePageNavigationProp>();
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profile, setProfile] = useState<{ picture: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricCredentials, setBiometricCredentials] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    loadTasksFromAPI();
  }, []);

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    checkBiometricAndAvatarFlow();
  }, []);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token = await storage.getToken();
    if (!token) {
      signOut(); // remove qualquer dado e volta pra AuthStack
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  };

  const checkBiometricAndAvatarFlow = async () => {
    try {
      const firstLogin = await AsyncStorage.getItem('firstLogin');
      if (firstLogin === 'true') {
        await AsyncStorage.removeItem('firstLogin');
        navigation.replace('AvatarSelectionScreen');
        return;
      }

      const enabled = await AsyncStorage.getItem('biometricEnabled');
      const remember = await AsyncStorage.getItem('rememberMe');
      const creds = await AsyncStorage.getItem('biometricCredentials');

      if (!enabled && remember && creds) {
        setBiometricCredentials(JSON.parse(creds));
        setShowBiometricModal(true);
      }
    } catch (error) {
      console.error('Erro ao verificar fluxo de login:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const token = await storage.getToken();
      if (!token) return;

      const response = await fetch('http://15.229.11.44:3000/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar o perfil:', error);
    }
  };

  const avatarMap: Record<string, any> = {
    avatar_1: require('../assets/avatars/avatar1.png'),
    avatar_2: require('../assets/avatars/avatar2.png'),
    avatar_3: require('../assets/avatars/avatar3.png'),
    avatar_4: require('../assets/avatars/avatar4.png'),
    avatar_5: require('../assets/avatars/avatar5.png'),
  };

  const loadTasksFromAPI = async () => {
    setIsLoading(true);
    try {
      const token = await storage.getToken();
      if (!token) return;

      const response = await fetch('http://15.229.11.44:3000/tasks', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erro ao buscar tarefas da API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTaskToAPI = async (title: string, description: string, deadline: string) => {
    try {
      const token = await storage.getToken();
      if (!token) throw new Error('Token não encontrado');

      const body = {
        title,
        description,
        done: false,
        deadline,
      };

      console.log('Conteúdo enviado no POST:', body);

      const response = await fetch('http://15.229.11.44:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);

      if (!response.ok) throw new Error('Erro ao criar tarefa na API');

      await loadTasksFromAPI();
    } catch (error) {
      console.error('Erro no envio de tarefa:', error);
    }
  };

  const handleCreate = async () => {
    if (!titulo || !descricao || !prazo) {
      Alert.alert('Preencha todos os campos obrigatórios');
      return;
    }

    await sendTaskToAPI(titulo, descricao, prazo);
    setTitulo('');
    setDescricao('');
    setPrazo('');
    setModalVisible(false);
  };

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
        prev.map((task) =>
            task.id === id
                ? { ...task, status: task.status === 'pendente' ? 'concluida' : 'pendente' }
                : task
        )
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
      <View style={styles.cardTask}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.checkbox} onPress={() => toggleStatus(item.id)}>
            {item.status === 'concluida' && <Image source={require('../assets/avatars/checkbox.png')} />}
          </TouchableOpacity>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        {item.tags?.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
              ))}
            </View>
        )}
        <TouchableOpacity
            style={styles.detailsButton}
            onPress={() =>
                navigation.navigate('TaskStack', {
                  screen: 'TaskDetail',
                  params: { task: item },
                })
            }
        >
          <Text style={styles.detailsButtonText}>VER DETALHES</Text>
        </TouchableOpacity>
      </View>
  );

  return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>TASKLY</Text>
            <Avatar.Image
                size={45}
                source={
                  profile?.picture
                      ? avatarMap[profile.picture]
                      : require('../assets/avatars/ellipse1.png')
                }
            />
          </View>

          <TouchableOpacity style={styles.filtro}>
            <Image source={require('../assets/avatars/filtro.png')} />
          </TouchableOpacity>

          {isLoading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#583CC4" />
              </View>
          ) : tasks.length === 0 ? (
              <View style={styles.card}>
                <Image source={require('../assets/avatars/sad.png')} />
                <Text style={styles.label}>No momento você não possui tarefa</Text>
                <TouchableOpacity style={styles.buttonEmptyState} onPress={() => setModalVisible(true)}>
                  <Text style={styles.resolveButtonText}>Criar Tarefas</Text>
                </TouchableOpacity>
              </View>
          ) : (
              <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id}
                  renderItem={renderTask}
                  contentContainerStyle={styles.taskList}
                  showsVerticalScrollIndicator={false}
              />
          )}
        </View>

        {!isLoading && tasks.length !== 0 && (
            <TouchableOpacity style={styles.buttonFloating} onPress={() => setModalVisible(true)}>
              <Text style={styles.resolveButtonText}>Criar Tarefas</Text>
            </TouchableOpacity>
        )}

        <CreateTaskModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            titulo={titulo}
            descricao={descricao}
            prazo={prazo}
            onChangeTitulo={setTitulo}
            onChangeDescricao={setDescricao}
            onChangePrazo={setPrazo}
            onSubmit={handleCreate}
        />

        {showBiometricModal && biometricCredentials && (
            <BiometricModal
                credentials={biometricCredentials}
                visible={showBiometricModal}
                onClose={() => setShowBiometricModal(false)}
            />
        )}

        <TabBar
            onClipboardPress={() => console.log('Clipboard')}
            onBellPress={() => console.log('Bell')}
            onMenuPress={() => console.log('Menu')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 25,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filtro: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: '#1E1E1E',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Base',
    color: '#AAAAAA',
  },
  card: {
    alignItems: 'center',
  },
  buttonEmptyState: {
    marginTop: 14,
    backgroundColor: '#583CC4',
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    marginBottom: 10,
  },
  buttonFloating: {
    position: 'absolute',
    bottom: 70,
    left: 27,
    right: 27,
    backgroundColor: '#583CC4',
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    zIndex: 10,
  },
  resolveButtonText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cardTask: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#1E1E1E',
  },
  cardDescription: {
    marginTop: 6,
    fontSize: 14,
    color: '#4F4F4F',
  },
  taskList: {
    gap: 16,
    paddingBottom: 120,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B58B46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 4,
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    color: '#555',
  },
  detailsButton: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#5B3CC4',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});


