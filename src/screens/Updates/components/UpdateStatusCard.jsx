import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const UpdateStatusCard = () => {
  const handlePress = () => {
    notificationSoundService.playSoundEffect('click');
    notificationSoundService.triggerNotification('Updates', 'Sistema v2.4.0 al día');
  };
  return (
    <View style={styles.card}>
      <Text style={styles.text}>📡 Estado del Canal OTA</Text>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>VERIFICAR</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: { backgroundColor: '#0a0a14', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1a1a2e', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  btn: { backgroundColor: '#00ffff22', borderWidth: 1, borderColor: '#00ffff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  btnText: { color: '#00ffff', fontSize: 11, fontWeight: 'bold' }
});
export default UpdateStatusCard;
