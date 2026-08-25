import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { securityService } from '../../services/securityService';
import BiometricsCard from './components/BiometricsCard';
import AuditLogsCard from './components/AuditLogsCard';

export default function SecurityScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(securityService.getAuditLogs());
  }, [unlocked]);

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (securityService.verifyPIN(newPin)) {
          setUnlocked(true);
          setError(false);
          if (onUnlock) onUnlock();
        } else {
          setError(true);
          setPin('');
        }
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>SISTEMA DE SEGURIDAD NATIVO</Text>

      {!unlocked ? (
        <View style={styles.pinCard}>
          <Text style={styles.pinTitle}>INGRESE PIN DE ACCESO</Text>
          <View style={styles.dotsRow}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  pin.length > i && styles.dotFilled,
                  error && styles.dotError
                ]}
              />
            ))}
          </View>
          {error && <Text style={styles.errorMsg}>⚠️ PIN INCORRECTO (PRUEBE 1234)</Text>}

          <View style={styles.keypad}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0'].map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.keyBtn}
                onPress={() => (key === 'C' ? handleClear() : handleKeyPress(key))}
              >
                <Text style={styles.keyText}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.unlockedBox}>
          <Text style={styles.unlockedText}>✅ ACCESO AUTORIZADO - SESIÓN ACTIVA</Text>
        </View>
      )}

      <BiometricsCard />
      <AuditLogsCard logs={logs} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  mainTitle: { color: '#00b0ff', fontSize: 13, fontWeight: '900', letterSpacing: 1, marginBottom: 15 },
  pinCard: { backgroundColor: '#121622', padding: 20, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  pinTitle: { color: '#aaa', fontSize: 11, fontWeight: 'bold', marginBottom: 15 },
  dotsRow: { flexDirection: 'row', marginBottom: 15 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: '#00b0ff', marginHorizontal: 8 },
  dotFilled: { backgroundColor: '#00b0ff' },
  dotError: { borderColor: '#ff5252', backgroundColor: '#ff5252' },
  errorMsg: { color: '#ff5252', fontSize: 10, fontWeight: 'bold', marginBottom: 10 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 220 },
  keyBtn: { width: 60, height: 50, backgroundColor: '#1c2333', justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 8, borderWidth: 1, borderColor: '#2a3447' },
  keyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  unlockedBox: { backgroundColor: '#091e17', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#00e676', marginBottom: 15 },
  unlockedText: { color: '#00e676', fontSize: 11, fontWeight: 'bold', textAlign: 'center' }
});
