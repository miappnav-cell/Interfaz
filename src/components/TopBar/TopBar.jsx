import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SCREEN_NAMES = {
  Security: '🛡️ SEGURIDAD & ACCESO',
  UsersManager: '👥 LICENCIAS & BOT',
  Wallet: '💳 BILLETERA',
  Updates: '🔄 ACTUALIZACIONES',
  ApiSettings: '⚡ CONEXIÓN API',
  Privacy: '🔒 PRIVACIDAD',
  Settings: '⚙️ CONFIGURACIÓN'
};

export default function TopBar({ currentScreen, onToggleMenu, isConnected = true }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuBtn} onPress={onToggleMenu}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{SCREEN_NAMES[currentScreen] || currentScreen}</Text>

      <View style={styles.statusBadge}>
        <View style={[styles.dot, isConnected ? styles.dotGreen : styles.dotRed]} />
        <Text style={styles.statusText}>{isConnected ? 'ONLINE' : 'OFFLINE'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 55, backgroundColor: '#121622', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, borderBottomWidth: 1, borderColor: '#1c2333' },
  menuBtn: { padding: 6 },
  menuIcon: { color: '#00b0ff', fontSize: 22, fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 13, fontWeight: 'bold', letterSpacing: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#090a0f', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#1c2333' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  dotGreen: { backgroundColor: '#00e676' },
  dotRed: { backgroundColor: '#ff5252' },
  statusText: { color: '#aaa', fontSize: 9, fontWeight: 'bold' }
});
