import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { botService } from '../../../services/botService';

export default function BotControllerCard() {
  const [lastKey, setLastKey] = useState('');

  const handleGenerateKey = () => {
    const key = botService.generateLicenseKey(30);
    setLastKey(key);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>🤖 CONTROLADOR TELEGRAM BOT & LICENCIAS</Text>
      <View style={styles.statusRow}>
        <Text style={styles.label}>Estado Webhook:</Text>
        <Text style={styles.statusOnline}>● ACTIVO</Text>
      </View>
      
      {lastKey ? (
        <View style={styles.keyContainer}>
          <Text style={styles.keyLabel}>LICENCIA GENERADA:</Text>
          <Text style={styles.keyValue}>{lastKey}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.btn} onPress={handleGenerateKey}>
        <Text style={styles.btnText}>🔑 GENERAR LLAVE DE 30 DÍAS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#00b0ff', marginBottom: 12 },
  header: { color: '#fff', fontSize: 11, fontWeight: 'bold', marginBottom: 10 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#888', fontSize: 11 },
  statusOnline: { color: '#00e676', fontSize: 11, fontWeight: 'bold' },
  keyContainer: { backgroundColor: '#090a0f', padding: 8, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#1c2333' },
  keyLabel: { color: '#555', fontSize: 9, fontWeight: 'bold' },
  keyValue: { color: '#00b0ff', fontSize: 13, fontWeight: 'bold', marginTop: 2 },
  btn: { backgroundColor: '#1c2333', padding: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#00b0ff' },
  btnText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});
