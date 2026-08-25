import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GatewayConfigCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>⚙️ PASARELA DE PAGOS (MODULO EN PAUSA)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#00b0ff', marginBottom: 12 },
  text: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold' }
});
