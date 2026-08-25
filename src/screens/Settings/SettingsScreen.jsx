import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

export default function SettingsScreen() {
  const [theme, setTheme] = useState('Oscuro');
  const [fontSize, setFontSize] = useState('Mediana');
  const [animations, setAnimations] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración del Sistema</Text>

      <Text style={styles.sectionTitle}>Tema de la Interfaz</Text>
      <View style={styles.row}>
        {['Oscuro', 'Claro', 'Oled'].map((item) => (
          <TouchableOpacity 
            key={item} 
            style={[styles.chip, theme === item && styles.activeChip]} 
            onPress={() => setTheme(item)}
          >
            <Text style={styles.chipText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Escala de Fuente</Text>
      <View style={styles.row}>
        {['Pequeña', 'Mediana', 'Grande'].map((size) => (
          <TouchableOpacity 
            key={size} 
            style={[styles.chip, fontSize === size && styles.activeChip]} 
            onPress={() => setFontSize(size)}
          >
            <Text style={styles.chipText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Efectos y Animaciones Visuales</Text>
        <Switch value={animations} onValueChange={setAnimations} trackColor={{ true: '#00e676' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { color: '#aaa', fontSize: 14, marginTop: 15, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#1a1a1a', borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  activeChip: { backgroundColor: '#00e676', borderColor: '#00e676' },
  chipText: { color: '#fff', fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingVertical: 10 },
  switchLabel: { color: '#fff', fontSize: 15 }
});
