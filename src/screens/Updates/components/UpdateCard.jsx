import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function UpdateCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>BUSCAR NUEVAS COMPILACIONES</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>🔍 VERIFICAR SERVIDOR OTA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  title: { color: '#fff', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  btn: { backgroundColor: '#1c2333', padding: 10, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#aaa', fontSize: 10, fontWeight: 'bold' }
});
