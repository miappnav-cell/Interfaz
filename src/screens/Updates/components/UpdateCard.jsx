import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function UpdateCard({ isChecking, currentVersion, updateAvailable, onCheckUpdates, onApplyUpdate }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>ESTADO DEL MOTOR OTA (EXPO UPDATES)</Text>
      <Text style={styles.versionText}>VERSIÓN ACTUAL: v{currentVersion}</Text>
      
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>
          {updateAvailable ? '⚡ PARCHE DE ACTUALIZACIÓN DISPONIBLE' : '✅ SISTEMA EN LA ÚLTIMA VERSIÓN'}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.checkBtn} 
        onPress={onCheckUpdates} 
        disabled={isChecking}
      >
        <Text style={styles.btnText}>
          {isChecking ? 'BUSCANDO PARCHES...' : '🔄 BUSCAR ACTUALIZACIÓN OTA'}
        </Text>
      </TouchableOpacity>

      {updateAvailable && (
        <TouchableOpacity style={styles.applyBtn} onPress={onApplyUpdate}>
          <Text style={styles.applyBtnText}>🚀 DESCARGAR E INSTALAR PARCHE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  label: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  versionText: { color: '#fff', fontSize: 18, fontWeight: '900', marginVertical: 8 },
  statusBadge: { backgroundColor: '#1a2234', padding: 8, borderRadius: 6, marginBottom: 12 },
  statusText: { color: '#00e676', fontSize: 11, fontWeight: 'bold', textAlign: 'center' },
  checkBtn: { backgroundColor: '#00b0ff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 11 },
  applyBtn: { backgroundColor: '#00e676', padding: 12, borderRadius: 8, alignItems: 'center' },
  applyBtnText: { color: '#000', fontWeight: 'bold', fontSize: 11 }
});
