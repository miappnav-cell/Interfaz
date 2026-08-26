import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UpdateStatusCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>SISTEMA PRINCIPAL</Text>
      <Text style={styles.version}>VERSIÓN ACTUAL: v2.4.0</Text>
      <Text style={styles.subtext}>Compilación en GitHub Actions con React Navigation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  badge: { color: '#00e676', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  version: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  subtext: { color: '#666', fontSize: 10, marginTop: 4 }
});
