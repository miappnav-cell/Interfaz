import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UpdateCard from './components/UpdateCard';
import UpdateStatusCard from './components/UpdateStatusCard';

export const UpdatesScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🔄 Actualizaciones del Sistema</Text>
      <UpdateCard />
      <UpdateStatusCard />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }
});
export default UpdatesScreen;
