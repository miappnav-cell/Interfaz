import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const PrivacyToggleCard = ({ label = 'Protección de Datos', onToggle }) => {
  const [active, setActive] = useState(false);
  const handlePress = () => {
    notificationSoundService.playSoundEffect('click');
    const next = !active;
    setActive(next);
    if (onToggle) onToggle(next);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{label}</Text>
      <TouchableOpacity style={[styles.btn, active ? styles.active : styles.inactive]} onPress={handlePress}>
        <Text style={styles.btnText}>{active ? 'ACTIVO' : 'INACTIVO'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: { backgroundColor: '#0a0a14', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1a1a2e', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  active: { backgroundColor: '#00ffff22', borderWidth: 1, borderColor: '#00ffff' },
  inactive: { backgroundColor: '#ff005522', borderWidth: 1, borderColor: '#ff0055' },
  btnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
});
export default PrivacyToggleCard;
