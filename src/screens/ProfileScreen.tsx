import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ActionCard from '../components/atoms/ActionCard';
import ProfileInfo from '../components/atoms/ProfileInfo';
import SimpleButton from '../components/atoms/SimpleButton';
import FooterNav from '../components/atoms/FooterNav';
import carouselData from '../data/carouselData';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileInfo />

      <FlatList
        horizontal
        data={carouselData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActionCard label={item.label} icon={item.icon} />
        )}
      />

      <View style={styles.buttons}>
        <SimpleButton label="Preferências" />
        <SimpleButton label="Termos e regulamentos" />
      </View>

      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
    paddingBottom: 64,
  },
  buttons: {
    marginTop: 40,
    marginBottom: 120,
  },
});








