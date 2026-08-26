import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import notificationSoundService from '../../services/notificationSoundService';
import BiometricsCard from './components/BiometricsCard';
import AuditLogsCard from './components/AuditLogsCard';

export const SecurityScreen = () => {
  const handleSecurityToggle = (status) => {
    notificationSoundService.playSoundEffect('click');
    notificationSoundService.triggerNotification('Seguridad', `Biometría cambiada a: ${status ? 'ON' : 'OFF'}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🛡️ Panel de Blindaje y Seguridad</Text>
      <BiometricsCard onToggle={handleSecurityToggle} />
      <AuditLogsCard />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }
});
export default SecurityScreen;
