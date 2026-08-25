import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LogoutHandler({ onConfirmLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚪</Text>
      <Text style={styles.title}>¿Cerrar Sesión?</Text>
      <Text style={styles.subtitle}>Se detendrá la sincronización de usuarios con el bot.</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={onConfirmLogout}>
        <Text style={styles.btnText}>Confirmar Salida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 20 },
  icon: { fontSize: 50, marginBottom: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#777', fontSize: 14, textAlign: 'center', marginVertical: 15 },
  logoutBtn: { backgroundColor: '#d32f2f', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
