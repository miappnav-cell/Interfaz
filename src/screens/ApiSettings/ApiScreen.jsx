import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import ApiStatusBadge from './components/ApiStatusBadge';

export default function ApiScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CONEXIÓN API BACKEND</Text>
      <ApiStatusBadge />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
