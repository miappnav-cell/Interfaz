import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function UpdatesScreen() {
  const [progress, setProgress] = useState(45); // Simulación de progreso
  const [status, setStatus] = useState('Pausado');

  const triggerAlarm = () => {
    Alert.alert("¡Alarma de Sistema!", "Se ha detectado una actualización crítica de seguridad.", [{ text: "Entendido" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestor de Actualizaciones</Text>
      
      <TouchableOpacity style={styles.alarmBtn} onPress={triggerAlarm}>
        <Text style={styles.alarmText}>🔔 Simular Notificación Dinámica</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.versionTitle}>Versión 2.4.1 - Módulo de Seguridad</Text>
        <Text style={styles.details}>Corrige vulnerabilidades en el cifrado de datos y optimiza la sincronización en segundo plano.</Text>
        
        {/* Barra de progreso visual */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.statusText}>{status} - {progress}%</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.controlBtn, {backgroundColor: '#2e7d32'}]} onPress={() => setStatus('Descargando...')}>
            <Text style={styles.btnText}>▶ Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, {backgroundColor: '#f57c00'}]} onPress={() => setStatus('Pausado')}>
            <Text style={styles.btnText}>⏸ Pausar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  alarmBtn: { backgroundColor: '#c62828', padding: 12, borderRadius: 5, marginBottom: 20 },
  alarmText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: { backgroundColor: '#1e1e1e', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#333' },
  versionTitle: { color: '#00e676', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  details: { color: '#aaa', fontSize: 14, marginBottom: 20, lineHeight: 20 },
  progressTrack: { height: 10, backgroundColor: '#333', borderRadius: 5, overflow: 'hidden', marginBottom: 5 },
  progressFill: { height: '100%', backgroundColor: '#00e676' },
  statusText: { color: '#fff', textAlign: 'right', fontSize: 12, marginBottom: 20 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  controlBtn: { flex: 0.48, padding: 12, borderRadius: 5, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
