import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  titulo: string;
  descricao: string;
  prazo: string;
  onChangeTitulo: (text: string) => void;
  onChangeDescricao: (text: string) => void;
  onChangePrazo: (text: string) => void;
  onSubmit: () => void;
}

export default function CreateTaskModal({
    visible,
    onClose,
    titulo,
    descricao,
    prazo,
    onChangeTitulo,
    onChangeDescricao,
    onChangePrazo,
    onSubmit,
  }: Props) {

function isValidDate(dateStr: string): boolean {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!regex.test(dateStr)) {
        return false;
    }
    const [_, dayStr, monthStr, yearStr] = dateStr.match(regex) || [];
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1; // meses são de 0 a 11
    const year = parseInt(yearStr, 10);

    const date = new Date(year, month, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
    );
}

function removeEmojis(text: string) {
    return text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|\uFE0F|\u200D|[\u2600-\u26FF])/g,
      ''
    );
}

const handleValidationAndSubmit = () => {
    let valid = true;

    if (titulo.trim() === '') {
      setTitleError('Error aqui');
      valid = false;
    } else {
      setTitleError('');
    }

    if (descricao.trim() === '') {
      setDescriptionError('Error aqui');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (dueDate.trim() === '' || !isValidDate(dueDate)) {
      setDateError('Error aqui');
      valid = false;
    } else {
      setDateError('');
    }

    if (valid) {
      onSubmit(); // Chama a função passada da HomePage
    }
  };


const [dateError, setDateError] = useState('');
const [dueDate, setDueDate] = useState('');
const [titleError, setTitleError] = useState('');
const [descriptionError, setDescriptionError] = useState('');


  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Criar tarefa</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Ex: bater o ponto"
            style={styles.input}
            value={titulo}
            onChangeText={onChangeTitulo}
          />
          {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

          <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.inputDescription}
                multiline
                maxLength={200}
                placeholder="Digite sua mensagem..."
                value={descricao}
                onChangeText={(text) => onChangeDescricao(removeEmojis(text))}
            />
          {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}

          <Text style={styles.label}>Prazo</Text>
            <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={prazo}
            onChangeText={(text: string) => {
                onChangePrazo(text);
                setDueDate(text);
                if (!isValidDate(text)) {
                  setDateError('Data inválida');
                } else {
                  setDateError('');
                }
              }}
            keyboardType="numeric"
            />
            {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createButton} onPress={handleValidationAndSubmit}>
                <Text style={styles.createButtonText}>CRIAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginTop: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#583CC4',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  inputDescription: {
    minHeight: 45,
    marginBottom: 8,
    borderColor: '#5B3CC4',
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Roboto-Base',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  error: {
    color: '#FF0033',
    fontSize: 12,
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  cancelButtonText: {
    color: '#583CC4',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#583CC4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  cancelButton: {
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#583CC4',
  },
});
