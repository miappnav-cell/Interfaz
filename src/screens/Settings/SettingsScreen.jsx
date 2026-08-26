import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import ThemeSelector from './components/ThemeSelector';
import CacheManagerCard from './components/CacheManagerCard';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CONFIGURACIÓN GENERAL</Text>
      <ThemeSelector />
      <CacheManagerCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
