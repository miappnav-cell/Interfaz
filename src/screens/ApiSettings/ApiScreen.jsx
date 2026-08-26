import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const RENDER_URL = 'https://render-api-backend.onrender.com';

export default function ApiScreen() {
  const [status, setStatus] = useState('VERIFICANDO...');
  const [latency, setLatency] = useState('--');
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    const start = Date.now();
    try {
      const res = await fetch(RENDER_URL, { method: 'GET' });
      const ms = Date.now() - start;
      if (res.ok || res.status < 500) {
        setStatus('● ONLINE (200 OK)');
        setLatency(`${ms}ms`);
      } else {
        setStatus(`⚠️ RESPUESTA (${res.status})`);
        setLatency(`${ms}ms`);
      }
    } catch (error) {
      setStatus('✖ SIN CONEXIÓN');
      setLatency('N/A');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚡ ESTADO DE API BACKEND</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ENDPOINT REMOTO</Text>
        <Text style={styles.value}>{RENDER_URL}</Text>
        <View style={styles.row}>
          <Text style={[styles.status, status.includes('ONLINE') ? styles.online : styles.offline]}>
            {status}
          </Text>
          <Text style={styles.ping}>Latencia: {latency}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={checkHealth} disabled={loading}>
          {loading ? <ActivityIndicator color="#00b0ff" /> : <Text style={styles.btnText}>PROBAR CONEXIÓN REAL</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 },
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333' },
  label: { color: '#666', fontSize: 9, fontWeight: 'bold' },
  value: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginVertical: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, alignItems: 'center' },
  status: { fontSize: 11, fontWeight: 'bold' },
  online: { color: '#00e676' },
  offline: { color: '#ff5252' },
  ping: { color: '#aaa', fontSize: 11 },
  btn: { backgroundColor: '#1c2333', padding: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#00b0ff', marginTop: 5 },
  btnText: { color: '#00b0ff', fontSize: 10, fontWeight: 'bold' }
});
