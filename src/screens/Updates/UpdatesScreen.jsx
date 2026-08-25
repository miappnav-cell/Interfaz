import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Updates from 'expo-updates';

export default function UpdatesScreen() {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('La aplicación está en la última versión.');

  const handleCheckUpdate = async () => {
    try {
      setLoading(true);
      setStatusText('Buscando actualizaciones en el servidor...');
      
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setStatusText('Descargando parche de actualización...');
        await Updates.fetchUpdateAsync();
        setStatusText('¡Actualización descargada!');
        
        Alert.alert(
          'Actualización Lista',
          'La nueva versión ha sido descargada. Se reiniciará la app para aplicar los cambios.',
          [{ text: 'Reiniciar ahora', onPress: () => Updates.reloadAsync() }]
        );
      } else {
        setStatusText('No hay parches nuevos. Tu app está actualizada.');
      }
    } catch (error) {
      console.log('Error buscando actualización:', error);
      setStatusText('No se pudo verificar (requiere compilación con expo-updates habilitado).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualizaciones en Vivo (OTA)</Text>
      <Text style={styles.status}>{statusText}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCheckUpdate}>
          <Text style={styles.buttonText}>Buscar y Aplicar Cambios</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 15 },
  status: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
