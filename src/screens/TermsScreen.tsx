import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import FooterNav from '../components/atoms/FooterNav';
import { useNavigation } from '@react-navigation/native';

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>‹  VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Termos e regulamentos</Text>
      </View>

      <WebView
        source={{ uri: 'https://sobreuol.noticias.uol.com.br/normas-de-seguranca-e-privacidade/en/' }}
        style={styles.webview}
      />

      <FooterNav backgroundColor="#f2f2f2" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 110,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingTop:20,
  },
  backText: {
    paddingTop: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#1E1E1E',
    marginRight: 50,
    marginLeft: 30,
    padding: 10,
    borderRadius:20,
  },
  headerTitle: {
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  webview: {
    flex: 1,
    marginBottom: 64,
  },
});
