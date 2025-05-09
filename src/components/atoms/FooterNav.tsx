import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FooterNav() {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useTheme();


  const backgroundColor = isDarkMode ? '#000000' : '#fff';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity onPress={() => navigation.navigate('TaskStack', { screen: 'HomePage' })}>
  <Icon name="clipboard-text-outline" size={28} color="#5B3CC4" />
</TouchableOpacity>


        <TouchableOpacity>
          <Icon name="bell-outline" size={28} color="#5B3CC4" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="menu" size={28} color="#5B3CC4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
  },
});





