import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../components/molecules/Header';
import TabBar from '../components/molecules/TabBar';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [subtaskInputs, setSubtaskInputs] = useState<string[]>([]);
  const [confirmedSubtasks, setConfirmedSubtasks] = useState<{ text: string; checked: boolean }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addSubtaskInput = () => {
    setSubtaskInputs([...subtaskInputs, '']);
  };

  const updateSubtaskInput = (index: number, text: string) => {
    const updatedInputs = [...subtaskInputs];
    updatedInputs[index] = text;
    setSubtaskInputs(updatedInputs);
  };

  const confirmSubtask = (index: number) => {
    const inputText = subtaskInputs[index].trim();
    if (inputText) {
      setConfirmedSubtasks([...confirmedSubtasks, { text: inputText, checked: false }]);
      const updatedInputs = [...subtaskInputs];
      updatedInputs.splice(index, 1);
      setSubtaskInputs(updatedInputs);
    }
  };

  const toggleSubtaskChecked = (index: number) => {
    const updated = [...confirmedSubtasks];

    if (typeof updated[index] === 'object' && 'checked' in updated[index]) {
      updated[index] = {
        ...updated[index],
        checked: !updated[index].checked,
      };
      setConfirmedSubtasks(updated);
    } else {
      console.warn('Formato inválido de subtask em:', updated[index]);
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
  };


  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.container}>
      <Header onBack={() => navigation.goBack()} />
        <View style={styles.card}>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('SubTask')}>
          <Image source={require('../assets/avatars/Vector1.png')} />

          </TouchableOpacity>
          <Text style={styles.label1}>Título</Text>
          <Text style={styles.value}>Bater o ponto</Text>

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.description}>
            bater o ponto pelo site do kairos e depois tenho que sair para tomar café.
          </Text>

          <Text style={styles.label}>Tags</Text>
          <View style={styles.chips}>
            <View style={styles.chip}><Text style={styles.chipText}>TRABALHO</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>LAZER</Text></View>
            <View style={styles.chip}><Text style={styles.chipText}>COMPASS</Text></View>
          </View>

          <Text style={styles.label}>Prioridade</Text>
          <View style={styles.priorityChip}>
            <Text style={styles.priorityChipText}>ALTA</Text>
          </View>

          <TouchableOpacity
            style={styles.resolveButton}
          >
            <Text style={styles.resolveButtonText}>RESOLVER TAREFA</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* Subtasks confirmadas */}
          {confirmedSubtasks.map((sub, i) => (
            <View key={`confirmed-${i}`} style={styles.confirmedSubtask}>
              {editingIndex !== i && (
                <TouchableOpacity onPress={() => toggleSubtaskChecked(i)}>
                  <MaterialCommunityIcons
                    name={sub.checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={20}
                    color={sub.checked ? '#32C25B' : '#B58B46'}
                  />
                </TouchableOpacity>
              )}
              {editingIndex === i ? (
                <TextInput
                  style={styles.confirmedSubtaskText}
                  value={sub.text}
                  onChangeText={(text) => {
                    const updated = [...confirmedSubtasks];
                    updated[i].text = text;
                    setConfirmedSubtasks(updated);
                  }}
                  autoFocus
                />
              ) : (
                <Text
                  style={[
                    styles.confirmedSubtaskText,
                    sub.checked && {},
                  ]}
                >
                  {sub.text}
                </Text>
              )}

              <TouchableOpacity onPress={() => {
                editingIndex === i ? setEditingIndex(null) : startEditing(i);
              }}>
                {editingIndex === i ? (
                  <MaterialCommunityIcons
                    name="arrow-right-circle"
                    size={24}
                    color="#32C25B"
                  />
                ) : (
                  <Image
                    source={require('../assets/avatars/Vector.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}

          {/* Inputs de novas subtasks */}
          {subtaskInputs.map((input, i) => (
            <View key={`input-${i}`} style={styles.subtaskInputContainer}>
              <TextInput
                value={input}
                placeholder="Digite a subtask"
                onChangeText={(text) => updateSubtaskInput(i, text)}
              />
              <TouchableOpacity onPress={() => confirmSubtask(i)}>
                <MaterialCommunityIcons name="arrow-right-circle" size={24} color="#32C25B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          {/* Botão Adicionar Subtask */}
          <TouchableOpacity onPress={addSubtaskInput} style={styles.subtaskButton}>
            <Text style={styles.subtaskButtonText}>ADICIONAR SUBTASK</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Navegação Inferior */}
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
    justifyContent: 'space-between',
  },
  container: {
    paddingLeft: 27,
    paddingRight: 27,
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
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
    color: '#AAAAAA',
  },
  label: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: '#AAAAAA',
  },
  value: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: '#1E1E1E',
  },
  description: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: 'Roboto-Regular',
    color: '#1E1E1E',
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
    fontFamily: 'Roboto-Base',
    color: '#1E1E1E',
  },
  priorityChip: {
    backgroundColor: '#32C26B',
    marginTop: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  priorityChipText: {
    fontSize: 12,
    fontFamily: 'Roboto-Base',
    color: '#FFFFFF',
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
    fontFamily: 'Roboto-Base',
    color: '#5B3CC4',
    textAlign: 'center',
  },
  subtaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#5B3CC4',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    height: 45,
    marginTop: 10,
  },
  confirmedSubtask: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E6E0F7',
  },
  confirmedSubtaskText: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Roboto-Base',
    fontSize: 16,
    color: '#000000',
  },
  subtaskButton: {
    marginTop: 25,
    borderRadius: 8,
    backgroundColor: '#583CC4',
    paddingVertical: 2,
  },
  subtaskButtonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Base',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    elevation: 8,
  },
});
