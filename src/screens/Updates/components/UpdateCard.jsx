import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { updateService } from '../../../services/updateService';

export default function UpdateCard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    const res = await updateService.checkVersion('2.4.0');
    setLoading(false);
    setResult(res);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🔄 VERIFICAR SERVIDOR NUBE</Text>
      <TouchableOpacity style={styles.btn} onPress={handleCheck} disabled={loading}>
        {loading ? <ActivityIndicator color="#00b0ff" /> : <Text style={styles.btnText}>CONSULTAR VERSIÓN</Text>}
      </TouchableOpacity>

      {result && (
        <View style={styles.responseContainer}>
          {result.error ? (
            <Text style={styles.errorText}>❌ Error: {result.error}</Text>
          ) : result.hasUpdate ? (
            <Text style={styles.updateText}>🚀 Nueva versión disponible: v{result.latestVersion}</Text>
          ) : (
            <Text style={styles.successText}>✅ El sistema está completamente actualizado (v2.4.0)</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333' },
  title: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold', marginBottom: 12 },
  btn: { backgroundColor: '#1c2333', padding: 12, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#00b0ff' },
  btnText: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold' },
  responseContainer: { marginTop: 12, padding: 10, backgroundColor: '#090a0f', borderRadius: 6 },
  successText: { color: '#00e676', fontSize: 10, textAlign: 'center' },
  updateText: { color: '#ffb300', fontSize: 10, textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: '#ff5252', fontSize: 10, textAlign: 'center' }
});
