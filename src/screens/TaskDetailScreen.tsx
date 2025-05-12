import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, TaskDetailRouteProp } from '../navigation/types';
import { storage } from '../utils/storage';

import Header from '../components/molecules/Header';
import TabBar from '../components/molecules/TabBar';
import { useTheme } from '../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TaskDetailRouteProp>();
  const { task } = route.params;
  const [subtaskInputs, setSubtaskInputs] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [confirmedSubtasks, setConfirmedSubtasks] = useState<{ text: string; checked: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const token = await storage.getToken();
        if (!token) throw new Error('Token não encontrado');

        const response = await fetch('http://15.229.11.44:3000/tasks', {
          headers: { Authorization: 'Bearer ' + token },
        });

        const data = await response.json();
        const foundTask = data.find((t: any) => t.id === task.id);

        if (foundTask?.subtasks) {
          const formattedSubtasks = foundTask.subtasks.map((sub: any) => ({
            text: sub.title,
            checked: sub.done,
          }));
          setConfirmedSubtasks(formattedSubtasks);
        }
      } catch (error) {
        console.error('Erro ao carregar subtasks da API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [task.id]);

  const addSubtaskInput = () => setSubtaskInputs([...subtaskInputs, '']);

  const updateSubtaskInput = (index: number, text: string) => {
    const updated = [...subtaskInputs];
    updated[index] = text;
    setSubtaskInputs(updated);
  };

  const confirmSubtask = async (index: number) => {
    const inputText = subtaskInputs[index].trim();
    if (!inputText) return;

    try {
      const token = await storage.getToken();
      if (!token) throw new Error('Token não encontrado');

      const newSubtask = { title: inputText, done: false };
      const updatedSubtasks = [...confirmedSubtasks.map(s => ({ title: s.text, done: s.checked })), newSubtask];

      const response = await fetch(`http://15.229.11.44:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ subtasks: updatedSubtasks }),
      });

      if (!response.ok) throw new Error('Erro ao criar subtask');

      const updatedInputs = [...subtaskInputs];
      updatedInputs.splice(index, 1);
      setSubtaskInputs(updatedInputs);
      setConfirmedSubtasks(prev => [...prev, { text: inputText, checked: false }]);
    } catch (error) {
      console.error('Erro ao enviar subtask para API:', error);
      Alert.alert('Erro', 'Erro ao criar subtask');
    }
  };

  const toggleSubtaskChecked = (index: number) => {
    const updated = [...confirmedSubtasks];
    updated[index].checked = !updated[index].checked;
    setConfirmedSubtasks(updated);
  };

  const deleteTask = async () => {
    try {
      const token = await storage.getToken();
      if (!token) return Alert.alert('Erro', 'Token não encontrado.');

      const response = await fetch(`http://15.229.11.44:3000/tasks/${task.id}`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });

      if (!response.ok) throw new Error('Erro ao deletar tarefa.');

      Alert.alert('Sucesso', 'Tarefa resolvida com sucesso!');
      navigation.reset({ index: 0, routes: [{ name: 'HomePage' }] });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível resolver a tarefa.');
      console.error(error);
    }
  };

  const startEditing = (index: number) => setEditingIndex(index);

  const getPriorityStyle = (priority: string) => {
    return { backgroundColor: '#32C25B' };
  };

  const themedStyles = getStyles(isDark);

  return (
    <View style={themedStyles.screen}>
      {isLoading ? (
        <View style={themedStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#583CC4" />
        </View>
      ) : (
        <>
          <View style={themedStyles.container}>
            <Header
              onBack={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'HomePage' }],
                })
              }
            />

            <View style={themedStyles.card}>
              <TouchableOpacity style={themedStyles.editIcon} onPress={() => navigation.navigate('EditTask', { task })}>
                <Image source={require('../assets/avatars/Vector1.png')} />
              </TouchableOpacity>

              <Text style={themedStyles.label1}>Título</Text>
              <Text style={themedStyles.value}>{task.title}</Text>

              <Text style={themedStyles.label}>Descrição</Text>
              <Text style={themedStyles.description}>{task.description}</Text>

              <Text style={themedStyles.label}>Tags</Text>
              {task.tags?.length > 0 ? (
                <View style={themedStyles.chips}>
                  {task.tags.map((tag, index) => (
                    <View key={index} style={themedStyles.chip}>
                      <Text style={themedStyles.chipText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={themedStyles.emptyInfoText}>Nenhuma tag adicionada</Text>
              )}

              <Text style={themedStyles.label}>Prioridade</Text>
              {task.prioridade ? (
                <View style={[themedStyles.priorityChip, getPriorityStyle(task.prioridade)]}>
                  <Text style={themedStyles.priorityChipText}>{task.prioridade.toUpperCase()}</Text>
                </View>
              ) : (
                <Text style={themedStyles.emptyInfoText}>Sem prioridade definida</Text>
              )}

              <TouchableOpacity style={themedStyles.resolveButton} onPress={deleteTask}>
                <Text style={themedStyles.resolveButtonText}>RESOLVER TAREFA</Text>
              </TouchableOpacity>
            </View>

            {subtaskInputs.map((input, i) => (
              <View key={`input-${i}`} style={themedStyles.subtaskInputContainer}>
                <TextInput
                  value={input}
                  placeholder="Digite a subtask"
                  onChangeText={(text) => updateSubtaskInput(i, text)}
                  placeholderTextColor={isDark ? '#AAA' : '#666'}
                  style={{ color: isDark ? '#FFF' : '#000', flex: 1 }}
                />
                <TouchableOpacity onPress={() => confirmSubtask(i)}>
                  <MaterialCommunityIcons name="arrow-right-circle" size={24} color="#32C25B" />
                </TouchableOpacity>
              </View>
            ))}

            {!isLoading && confirmedSubtasks.length === 0 && (
              <TouchableOpacity onPress={addSubtaskInput} style={themedStyles.subtaskButton}>
                <Text style={themedStyles.subtaskButtonText}>ADICIONAR SUBTASK</Text>
              </TouchableOpacity>
            )}

            <View style={themedStyles.subtasksScrollArea}>
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {confirmedSubtasks.map((sub, i) => (
                  <View key={`confirmed-${i}`} style={themedStyles.confirmedSubtask}>
                    <TouchableOpacity onPress={() => toggleSubtaskChecked(i)}>
                      <MaterialCommunityIcons
                        name={sub.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        size={20}
                        color={sub.checked ? '#32C25B' : '#B58B46'}
                      />
                    </TouchableOpacity>
                    {editingIndex === i ? (
                      <TextInput
                        style={[themedStyles.confirmedSubtaskText, { color: isDark ? '#FFF' : '#000' }]}
                        value={sub.text}
                        onChangeText={(text) => {
                          const updated = [...confirmedSubtasks];
                          updated[i].text = text;
                          setConfirmedSubtasks(updated);
                        }}
                        autoFocus
                      />
                    ) : (
                      <Text style={[themedStyles.confirmedSubtaskText, { color: isDark ? '#FFF' : '#000' }]}>
                        {sub.text}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => (editingIndex === i ? setEditingIndex(null) : startEditing(i))}
                    >
                      {editingIndex === i ? (
                        <MaterialCommunityIcons name="arrow-right-circle" size={24} color="#32C25B" />
                      ) : (
                        <Image source={require('../assets/avatars/Vector.png')} />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            {!isLoading && confirmedSubtasks.length > 0 && (
              <TouchableOpacity onPress={addSubtaskInput} style={themedStyles.buttonFloating}>
                <Text style={themedStyles.subtaskButtonText}>ADICIONAR SUBTASK</Text>
              </TouchableOpacity>
            )}
          </View>

          <TabBar
            onClipboardPress={() => console.log('Clipboard')}
            onBellPress={() => console.log('Bell')}
            onMenuPress={() => console.log('Menu')}
          />
        </>
      )}
    </View>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F4F4F4',
      justifyContent: 'space-between',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      paddingLeft: 27,
      paddingRight: 27,
      flex: 1,
    },
    card: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 14,
      padding: 16,
      marginTop: 20,
      marginBottom: 20,
      elevation: 4,
    },
    editIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1,
    },
    label1: {
      marginTop: 10,
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: isDark ? '#CCCCCC' : '#AAAAAA',
    },
    label: {
      marginTop: 10,
      fontSize: 18,
      fontFamily: 'Roboto-Regular',
      color: isDark ? '#CCCCCC' : '#AAAAAA',
    },
    value: {
      marginTop: 2,
      fontSize: 14,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#1E1E1E',
    },
    description: {
      marginTop: 2,
      fontSize: 13,
      color: isDark ? '#FFFFFF' : '#1E1E1E',
    },
    chips: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      backgroundColor: '#E6E0F7',
      marginRight: 8,
      marginTop: 4,
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    chipText: {
      fontSize: 12,
      color: '#1E1E1E',
    },
    priorityChip: {
      marginTop: 4,
      alignSelf: 'flex-start',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    priorityChipText: {
      fontSize: 12,
      color: '#FFFFFF',
    },
    emptyInfoText: {
      fontStyle: 'italic',
      color: '#999',
    },
    resolveButton: {
      marginTop: 14,
      borderColor: '#583CC4',
      borderWidth: 2,
      borderRadius: 8,
      justifyContent: 'center',
    },
    resolveButtonText: {
      fontSize: 16,
      color: '#5B3CC4',
      textAlign: 'center',
    },
    subtasksScrollArea: {
      flex: 1,
      maxHeight: 250,
      marginTop: 10,
      paddingBottom: 10,
    },
    subtaskInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: '#5B3CC4',
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: isDark ? '#333' : '#FFF',
      height: 45,
      marginTop: 10,
    },
    confirmedSubtask: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#333' : '#FFF',
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#E6E0F7',
    },
    confirmedSubtaskText: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
    },
    subtaskButton: {
      marginTop: 25,
      borderRadius: 8,
      backgroundColor: '#583CC4',
      paddingVertical: 2,
    },
    subtaskButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    buttonFloating: {
      position: 'absolute',
      bottom: 70,
      left: 27,
      right: 27,
      marginTop: 14,
      backgroundColor: '#583CC4',
      borderRadius: 8,
      justifyContent: 'center',
      paddingVertical: 2,
      zIndex: 10,
    },
  });
}
