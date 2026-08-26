import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const BiometricsCard = ({ onToggle }) => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    notificationSoundService.playSoundEffect('click');
    const nextState = !enabled;
    setEnabled(nextState);
    if (onToggle) onToggle(nextState);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🔐 Biometría / Huella</Text>
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>{enabled ? 'DESACTIVAR' : 'ACTIVAR'}</Text>
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

export default BiometricsCard;
