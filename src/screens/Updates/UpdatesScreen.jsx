import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
import UpdateStatusCard from './components/UpdateStatusCard';

export default function UpdatesScreen() {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('Sistema listo para comprobar parches en caliente.');
  const [progress, setProgress] = useState(0);

  const handleCheckUpdate = async () => {
    try {
      setLoading(true);
      setStatusText('Conectando con el canal de compilación OTA...');
      
      if (!Updates.isEnabled) {
        setStatusText('La función OTA requiere el build compilado con el projectId de Expo.');
        setLoading(false);
        return;
      }

      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setStatusText('Descargando nueva versión en segundo plano...');
        setProgress(50);
        await Updates.fetchUpdateAsync();
        setProgress(100);
        setStatusText('Parche aplicado. Reiniciando la app en 2 segundos...');
        setTimeout(() => Updates.reloadAsync(), 2000);
      } else {
        setStatusText('El sistema ya cuenta con el paquete ejecutable más reciente.');
      }
    } catch (error) {
      setStatusText(`Estado: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ACTUALIZACIONES EN VIVO (OTA)</Text>
      <UpdateStatusCard statusText={statusText} isDownloading={loading} progress={progress} />
      <TouchableOpacity style={styles.btn} onPress={handleCheckUpdate} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'BUSCANDO...' : 'BUSCAR Y APLICAR CAMBIOS'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 },
  btn: { backgroundColor: '#00e676', padding: 16, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 13, letterSpacing: 1 }
});
