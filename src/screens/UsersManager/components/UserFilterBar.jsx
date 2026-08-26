import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function UserFilterBar() {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={[styles.chip, styles.activeChip]}><Text style={styles.chipText}>TODOS</Text></TouchableOpacity>
      <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>ACTIVOS</Text></TouchableOpacity>
      <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>EXPIRADOS</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', marginBottom: 12 },
  chip: { backgroundColor: '#121622', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: '#1c2333' },
  activeChip: { borderColor: '#00b0ff', backgroundColor: '#1c2333' },
  chipText: { color: '#fff', fontSize: 9, fontWeight: 'bold' }
});
