import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TopBar({ currentScreen, onToggleMenu }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleMenu} style={styles.menuBtn}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{currentScreen}</Text>
      <View style={styles.status}><Text style={styles.statusText}>ONLINE</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 60, backgroundColor: '#121622', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, borderBottomWidth: 1, borderColor: '#1c2333', paddingTop: 10 },
  menuBtn: { padding: 5 },
  menuIcon: { color: '#00b0ff', fontSize: 24, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  status: { backgroundColor: '#00e67622', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: '#00e676' },
  statusText: { color: '#00e676', fontSize: 10, fontWeight: 'bold' }
});
