import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BiometricsCard({ isUnlocked, onAuthenticate }) {
  return (
    <View style={[styles.card, isUnlocked ? styles.borderGreen : styles.borderRed]}>
      <Text style={styles.title}>SEGURIDAD DE ACCESO Y ACCIONES SENSIBLES</Text>
      <Text style={styles.statusText}>
        ESTADO: {isUnlocked ? '🔓 ACCESO AUTORIZADO (BIOMETRÍA/PIN)' : '🔒 ACCIONES BLOQUEADAS'}
      </Text>
      
      {!isUnlocked && (
        <TouchableOpacity style={styles.btn} onPress={onAuthenticate}>
          <Text style={styles.btnText}>☝️ VALIDAR HUELLA / PIN LOCAL</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, marginBottom: 15 },
  borderGreen: { borderColor: '#00e676' },
  borderRed: { borderColor: '#ff5252' },
  title: { color: '#6b7a99', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  statusText: { color: '#fff', fontSize: 13, fontWeight: 'bold', marginBottom: 10 },
  btn: { backgroundColor: '#00b0ff', padding: 12, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 12 }
});
