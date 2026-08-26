import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CacheManagerCard from './components/CacheManagerCard';
import ThemeSelector from './components/ThemeSelector';

export const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>⚙️ Ajustes del Sistema Core</Text>
      <CacheManagerCard />
      <ThemeSelector />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }
});
export default SettingsScreen;
