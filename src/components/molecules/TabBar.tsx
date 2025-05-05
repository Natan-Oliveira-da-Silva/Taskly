import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onClipboardPress?: () => void;
  onBellPress?: () => void;
  onMenuPress?: () => void;
};

const ClipboardIcon = ({ size, color }: { size: number; color: string }) => (
    <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color} />
);

  const BellIcon = ({ size, color }: { size: number; color: string }) => (
    <MaterialCommunityIcons name="bell-outline" size={size} color={color} />
);

const MenuIcon = ({ size, color }: { size: number; color: string }) => (
    <MaterialCommunityIcons name="menu" size={size} color={color} />
);

export default function TabBar({ onClipboardPress, onBellPress, onMenuPress }: Props) {
  return (
    <View style={styles.tabBar}>
      <IconButton
        icon={ClipboardIcon}
        size={24}
        iconColor="#5B3CC4"
        onPress={onClipboardPress}
      />
      <IconButton
        icon={BellIcon}
        size={24}
        iconColor="#5B3CC4"
        onPress={onBellPress}
      />
      <IconButton
        icon={MenuIcon}
        size={24}
        iconColor="#5B3CC4"
        onPress={onMenuPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    elevation: 8,
  },
});
