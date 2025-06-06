import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface ProfileInfoProps {
  name: string;
  email: string;
  phone_number: string;
  avatarSource: any;
  isDarkMode: boolean;
}

export default function ProfileInfo({
  name,
  email,
  phone_number,
  avatarSource,
  isDarkMode,
}: ProfileInfoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: avatarSource}}
        style={styles.avatar}
        resizeMode="cover"
      />
      <Text style={[styles.name, {color: isDarkMode ? '#FFFFFF' : '#1E1E1E'}]}>
        {name}
      </Text>
      <Text
        style={[styles.infoText, {color: isDarkMode ? '#CCCCCC' : '#666666'}]}>
        {email}
      </Text>
      <Text
        style={[styles.infoText, {color: isDarkMode ? '#CCCCCC' : '#666666'}]}>
        ({phone_number.slice(0, 2)}) {phone_number.slice(2, 7)}-
        {phone_number.slice(7, 11)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 100,
    marginTop: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});
