import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const RechargeCard = ({ onRecharge }) => {
  const handleRecharge = () => {
    notificationSoundService.playSoundEffect('click');
    notificationSoundService.triggerNotification('Wallet', 'Solicitud de recarga enviada');
    if (onRecharge) onRecharge();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>💳 Recargar Créditos</Text>
      <TouchableOpacity style={styles.button} onPress={handleRecharge}>
        <Text style={styles.buttonText}>RECARGAR AHORA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#0a0a14', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1a1a2e', marginBottom: 10 },
  title: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  button: { backgroundColor: '#00ffff22', borderWidth: 1, borderColor: '#00ffff', padding: 8, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#00ffff', fontWeight: 'bold', fontSize: 12 }
});

export default RechargeCard;
