import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const ThemeSelector = () => {
  const [theme, setTheme] = useState('Cyber Neon');
  const handlePress = () => {
    notificationSoundService.playSoundEffect('click');
    const next = theme === 'Cyber Neon' ? 'Matrix Dark' : 'Cyber Neon';
    setTheme(next);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.text}>🎨 Tema Visual: {theme}</Text>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>CAMBIAR</Text>
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
export default ThemeSelector;
