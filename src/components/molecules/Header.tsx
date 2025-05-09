import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  onBack: () => void;
};

const BackIcon = ({ size, color }: { size: number; color: string }) => (
    <Feather name="chevron-left" size={size} color={color} />
);

export default function Header({ onBack }: Props) {
  return (
    <View style={styles.header}>
      <IconButton
        icon={BackIcon}
        iconColor="white"
        style={styles.backButton}
        onPress={onBack}
      />
      <Text style={styles.title}>TASKLY</Text>
      <Avatar.Image size={45} source={require('../../assets/avatars/ellipse1.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#AAAAAA',
    borderRadius: 8,
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: '#1E1E1E',
  },
});
