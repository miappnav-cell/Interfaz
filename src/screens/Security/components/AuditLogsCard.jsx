import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AuditLogsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📋 AUDITORÍA DE ACCESOS</Text>
      <Text style={styles.log}>● [OK] Sesión iniciada desde Termux Node</Text>
      <Text style={styles.log}>● [OK] Token JWT validado correctamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  title: { color: '#aaa', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  log: { color: '#666', fontSize: 10, marginTop: 2 }
});
