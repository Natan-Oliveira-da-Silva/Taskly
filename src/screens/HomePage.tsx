import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TabBar from '../components/molecules/TabBar';
import CreateTaskModal from './modal/CreateTaskModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomePage'>;

export interface Task {
    id: string;
    titulo: string;
    descricao: string;
    tags: string[];
    status: 'pendente' | 'concluida';
    prioridade?: string;
    prazo: string;
  }

export default function HomePage() {
    const navigation = useNavigation<HomePageNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prazo, setPrazo] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleCreate = () => {
        const novaTask: Task = {
          id: Date.now().toString(),
          titulo,
          descricao,
          tags: [], // ← deixamos vazio por enquanto
          status: 'pendente',
          prazo,
        };

        setTasks((prev) => [...prev, novaTask]);

        // Limpa e fecha o modal
        setTitulo('');
        setDescricao('');
        setPrazo('');
        setModalVisible(false);
    };

    const toggleStatus = (id: string) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pendente' ? 'concluida' : 'pendente',
                }
              : task
          )
        );
      };

    const renderTask = ({ item }: { item: Task }) => (
        <View style={styles.cardTask}>
            {/* Título e status no topo */}
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>

                {/* Checkbox redondo */}
                <TouchableOpacity
                    style={[
                    styles.checkbox,
                    ]}
                    onPress={() => toggleStatus(item.id)}
                >
                    {item.status === 'concluida' && (
                    <Image source={require('../assets/avatars/checkbox.png')} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Descrição logo abaixo */}
            <Text style={styles.cardDescription}>{item.descricao}</Text>

            {/* Tags (vazio por enquanto) */}
            {item.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                {item.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
                </View>
            )}

            {/* Botão Ver Detalhes */}
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
                    {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>TASKLY</Text>
                    <Avatar.Image size={45} source={require('./../assets/avatars/ellipse1.png')} />
                </View>
                <TouchableOpacity style={styles.filtro}><Image source={require('../assets/avatars/filtro.png')} /></TouchableOpacity>
                {tasks.length === 0 ? (
                    <View style={styles.card}>
                        <Image source={require('../assets/avatars/sad.png')} />
                        <Text style={styles.label}>No momento você não possui tarefa</Text>
                        <TouchableOpacity
                            style={styles.buttonEmptyState}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.resolveButtonText}>Criar Tarefa</Text>
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
            {tasks.length !== 0 && (
                <TouchableOpacity
                    style={styles.buttonFloating}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.resolveButtonText}>Criar Tarefa</Text>
                </TouchableOpacity>
            )}
            {/* Modal */}
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
        marginTop: 14,
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
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
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
