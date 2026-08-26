import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import UpdateStatusCard from './components/UpdateStatusCard';
import UpdateCard from './components/UpdateCard';

export default function UpdatesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ACTUALIZACIONES DEL SISTEMA</Text>
      <UpdateStatusCard />
      <UpdateCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
