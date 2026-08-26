import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import ReceiveMoneyCard from './components/ReceiveMoneyCard';
import GatewayConfigCard from './components/GatewayConfigCard';
import RechargeCard from './components/RechargeCard';

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BILLETERA & MOVIMIENTOS</Text>
      <ReceiveMoneyCard balance={250.00} />
      <RechargeCard />
      <GatewayConfigCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
