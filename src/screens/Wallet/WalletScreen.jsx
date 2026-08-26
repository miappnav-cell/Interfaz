import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RechargeCard from './components/RechargeCard';
import GatewayConfigCard from './components/GatewayConfigCard';
import ReceiveMoneyCard from './components/ReceiveMoneyCard';

export const WalletScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>💼 Billetera de Créditos y Pasarela</Text>
      <RechargeCard />
      <GatewayConfigCard />
      <ReceiveMoneyCard />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }
});
export default WalletScreen;
