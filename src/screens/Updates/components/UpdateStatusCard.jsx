import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UpdateStatusCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>ESTADO OTA: SISTEMA ACTUALIZADO</Text>
      <Text style={styles.sub}>Versión 2.4.0 (Build Native Release)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#00e676', marginBottom: 12 },
  title: { color: '#00e676', fontSize: 11, fontWeight: 'bold' },
  sub: { color: '#666', fontSize: 9, marginTop: 4 }
});
