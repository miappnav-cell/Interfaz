import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TopBar({ onOpenMenu }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onOpenMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>King System</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 15, paddingTop: 10 },
  menuButton: { marginRight: 15 },
  menuText: { color: '#fff', fontSize: 24 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
