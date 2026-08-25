import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ThemeSelector from './components/ThemeSelector';

export default function SettingsScreen() {
  const [theme, setTheme] = useState('Oled');
  const [animations, setAnimations] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>CONFIGURACIÓN DEL SISTEMA</Text>
      <ThemeSelector activeTheme={theme} onSelectTheme={setTheme} />
      
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.settingText}>Efectos y Animaciones Visuales</Text>
          <Switch 
            value={animations} 
            onValueChange={setAnimations}
            trackColor={{ false: '#333', true: '#1b5e20' }}
            thumbColor={animations ? '#00e676' : '#777'}
          />
        </View>
        <Text style={styles.infoText}>Estado actual: {animations ? 'Rendimiento Alto' : 'Ahorro de Batería'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 },
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  infoText: { color: '#6b7a99', fontSize: 11, marginTop: 8 }
});
