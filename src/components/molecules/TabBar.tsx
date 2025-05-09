import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type Props = {
  onClipboardPress?: () => void;
  onBellPress?: () => void;
  onMenuPress?: () => void;
};

const ClipboardIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialCommunityIcons name="clipboard-text-outline" size={size} color={color} />
);

const BellIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
);

const MenuIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialCommunityIcons name="menu" size={size} color={color} />
);

export default function TabBar({ onClipboardPress, onBellPress, onMenuPress }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useTheme();

  const backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        <IconButton
          icon={ClipboardIcon}
          size={28}
          iconColor="#5B3CC4"
          onPress={onClipboardPress}
        />
        <IconButton
          icon={BellIcon}
          size={28}
          iconColor="#5B3CC4"
          onPress={onBellPress}
        />
        <IconButton
          icon={MenuIcon}
          size={28}
          iconColor="#5B3CC4"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
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
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
  },
});

