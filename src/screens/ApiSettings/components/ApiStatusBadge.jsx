import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiStatusBadge({ status, responseTime }) {
  const isOk = status === 'CONNECTED';
  return (
    <View style={[styles.badgeContainer, isOk ? styles.bgSuccess : styles.bgIdle]}>
      <Text style={[styles.text, isOk ? styles.textSuccess : styles.textIdle]}>
        {isOk ? `🟢 SERVIDOR CONECTADO (${responseTime}ms)` : '⚪ ESPERANDO PRUEBA DE CONEXIÓN'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: { padding: 12, borderRadius: 8, borderWidth: 1, marginBottom: 15 },
  bgSuccess: { backgroundColor: '#1b5e20', borderColor: '#00e676' },
  bgIdle: { backgroundColor: '#121622', borderColor: '#1c2333' },
  text: { fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
  textSuccess: { color: '#00e676' },
  textIdle: { color: '#6b7a99' }
});
