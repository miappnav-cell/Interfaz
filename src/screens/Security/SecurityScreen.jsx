import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import BiometricsCard from './components/BiometricsCard';

export default function SecurityScreen() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [logText, setLogText] = useState('Esperando autenticación.');

  const handleAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Autorizar cambios de configuración',
          fallbackLabel: 'Usar PIN'
        });
        if (result.success) {
          setIsUnlocked(true);
          setLogText('✅ Sesión autorizada mediante biometría.');
        } else {
          setLogText('❌ Fallo en la autenticación.');
        }
      } else {
        // Simulación si hardware no está configurado en emulador
        setIsUnlocked(true);
        setLogText('⚠️ Hardware biométrico no detectado. Modo PIN dev activado.');
      }
    } catch (err) {
      setLogText(`Error: ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>MÓDULO DE SEGURIDAD</Text>
      <BiometricsCard isUnlocked={isUnlocked} onAuthenticate={handleAuth} />
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>REGISTRO DE EVENTOS EN TIEMPO REAL</Text>
        <Text style={styles.logText}>{logText}</Text>
      </View>

      {isUnlocked && (
        <TouchableOpacity style={styles.lockBtn} onPress={() => setIsUnlocked(false)}>
          <Text style={styles.lockBtnText}>🔒 BLOQUEAR PANTALLA NUEVAMENTE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 },
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  cardTitle: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  logText: { color: '#e0e0e0', fontSize: 13 },
  lockBtn: { backgroundColor: '#1a2234', padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ff5252' },
  lockBtnText: { color: '#ff5252', fontWeight: 'bold', fontSize: 12 }
});
