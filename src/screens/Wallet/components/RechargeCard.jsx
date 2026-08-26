import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RechargeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>⚡ RECARGA RÁPIDA DE CRÉDITO</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>+ AÑADIR SALDO ($10.00)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  title: { color: '#aaa', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  btn: { backgroundColor: '#1c2333', padding: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#00b0ff' },
  btnText: { color: '#00b0ff', fontSize: 10, fontWeight: 'bold' }
});
