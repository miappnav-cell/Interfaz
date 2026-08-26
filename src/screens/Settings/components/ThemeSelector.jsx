import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ThemeSelector() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>TEMA VISUAL: OBSIDIAN DARK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  title: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
});
