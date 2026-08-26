import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiStatusBadge() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>RENDER API BACKEND</Text>
      <Text style={styles.status}>● CONECTADO (200 OK)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333' },
  title: { color: '#aaa', fontSize: 11, fontWeight: 'bold' },
  status: { color: '#00e676', fontSize: 11, fontWeight: 'bold', marginTop: 5 }
});
