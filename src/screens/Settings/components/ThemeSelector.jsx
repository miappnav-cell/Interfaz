import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ThemeSelector({ activeTheme, onSelectTheme }) {
  const themes = ['Oscuro', 'Claro', 'Oled'];
  return (
    <View style={styles.card}>
      <Text style={styles.label}>TEMA DE INTERFAZ</Text>
      <View style={styles.row}>
        {themes.map(t => (
          <TouchableOpacity 
            key={t} 
            style={[styles.option, activeTheme === t && styles.activeOption]}
            onPress={() => onSelectTheme(t)}
          >
            <Text style={[styles.text, activeTheme === t && styles.activeText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  label: { color: '#6b7a99', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  option: { flex: 0.3, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#29354d', alignItems: 'center' },
  activeOption: { backgroundColor: '#00b0ff', borderColor: '#00b0ff' },
  text: { color: '#aaa', fontSize: 12 },
  activeText: { color: '#fff', fontWeight: 'bold' }
});
