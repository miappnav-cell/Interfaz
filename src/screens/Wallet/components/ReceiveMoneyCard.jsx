import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReceiveMoneyCard({ balance }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>BALANCES & LICENCIAS</Text>
      <Text style={styles.amount}>${balance ? balance.toFixed(2) : '0.00'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  label: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  amount: { color: '#00e676', fontSize: 24, fontWeight: '900', marginTop: 4 }
});
