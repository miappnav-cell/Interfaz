import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UpdateCard from './components/UpdateCard';

export default function UpdatesScreen() {
  const [isChecking, setIsChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [logText, setLogText] = useState('Listo para comprobar servidor OTA.');

  const handleCheckUpdates = () => {
    setIsChecking(true);
    setLogText('Conectando con el servidor de actualizaciones...');

    setTimeout(() => {
      setIsChecking(false);
      setUpdateAvailable(true);
      setLogText('✅ Se encontró el parche v1.0.1 (Mejoras en pasarela InDrive).');
    }, 1500);
  };

  const handleApplyUpdate = () => {
    setLogText('⚡ Descargando e instalando parche en segundo plano...');
    setTimeout(() => {
      setUpdateAvailable(false);
      setLogText('🎉 Parche aplicado con éxito. Reinicia la app si es necesario.');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ACTUALIZACIONES OVER-THE-AIR (OTA)</Text>
      
      <UpdateCard 
        isChecking={isChecking}
        currentVersion="1.0.0"
        updateAvailable={updateAvailable}
        onCheckUpdates={handleCheckUpdates}
        onApplyUpdate={handleApplyUpdate}
      />

      <View style={styles.logBox}>
        <Text style={styles.logTitle}>REGISTRO DE LA CONSOLA OTA</Text>
        <Text style={styles.logContent}>{logText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 15 },
  logBox: { backgroundColor: '#121622', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333' },
  logTitle: { color: '#00b0ff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 6 },
  logContent: { color: '#aaa', fontSize: 12 }
});
