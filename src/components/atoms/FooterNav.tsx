import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FooterNav() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem}>
        <Icon name="clipboard-text-outline" size={24} color="#5B3CC4" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Icon name="bell" size={24} color="#5B3CC4" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem}>
        <Icon name="menu" size={24} color="#5B3CC4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerItem: {
    alignItems: 'center',
  },
});
