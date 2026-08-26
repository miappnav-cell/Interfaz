import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import PrivacyToggleCard from './components/PrivacyToggleCard';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>PRIVACIDAD Y PERMISOS</Text>
      <PrivacyToggleCard label="Cifrado de Telemetría Local" />
      <PrivacyToggleCard label="Bloqueo de Capturas de Pantalla" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
