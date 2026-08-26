import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../services/notificationSoundService';
import PrivacyToggleCard from './components/PrivacyToggleCard';

export const PrivacyScreen = () => {
  const handleAction = (actionName) => {
    notificationSoundService.playSoundEffect('click');
    notificationSoundService.triggerNotification('Privacidad', `${actionName} actualizado con éxito.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>🔒 Centro de Privacidad y Encriptación</Text>
      <PrivacyToggleCard label="Modo Incógnito de Sesión" onToggle={() => handleAction('Modo Incógnito')} />
      <PrivacyToggleCard label="Cifrado de Endpoints Activos" onToggle={() => handleAction('Cifrado')} />
      <TouchableOpacity style={styles.button} onPress={() => handleAction('Exportar Datos de Red')}>
        <Text style={styles.buttonText}>📤 EXPORTAR REGISTROS DE PRIVACIDAD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  button: { backgroundColor: '#00ffff22', borderWidth: 1, borderColor: '#00ffff', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#00ffff', fontWeight: 'bold', fontSize: 13 }
});
export default PrivacyScreen;
