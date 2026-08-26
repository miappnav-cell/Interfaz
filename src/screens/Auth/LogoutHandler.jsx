import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function LogoutHandler({ onLogout }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onLogout}>
        <Text style={styles.text}>🚪 CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  btn: { backgroundColor: '#ff5252', padding: 10, borderRadius: 6, alignItems: 'center' },
  text: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});
