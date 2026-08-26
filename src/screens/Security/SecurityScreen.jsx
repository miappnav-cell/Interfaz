import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import BiometricsCard from './components/BiometricsCard';
import AuditLogsCard from './components/AuditLogsCard';

export default function SecurityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>SEGURIDAD & ACCESO</Text>
      <BiometricsCard />
      <AuditLogsCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
