import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FooterNavProps {
  backgroundColor?: string;
}

export default function FooterNav({ backgroundColor = '#ffffff' }: FooterNavProps) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        <TouchableOpacity>
        <Icon name="clipboard-text-outline" size={28} color="#5B3CC4" />
        </TouchableOpacity>

        <TouchableOpacity>
        <Icon name="bell-outline" size={28} color="#5B3CC4" />
        </TouchableOpacity>

        <TouchableOpacity>
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
  },
  container: {
    flex:1,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#ccc',
  },
});



