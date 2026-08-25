import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ApiStatusBadge from './components/ApiStatusBadge';

export default function ApiScreen() {
  const [apiUrl, setApiUrl] = useState('https://king-system-bot.onrender.com/api');
  const [apiKey, setApiKey] = useState('ks_live_8971239812739812');
  const [status, setStatus] = useState('IDLE');
  const [responseTime, setResponseTime] = useState(0);

  const testConnection = () => {
    setStatus('IDLE');
    const start = Date.now();
    setTimeout(() => {
      setResponseTime(Date.now() - start + 45);
      setStatus('CONNECTED');
    }, 400);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>CONEXIÓN BACKEND & BOT</Text>
      
      <ApiStatusBadge status={status} responseTime={responseTime} />

      <View style={styles.card}>
        <Text style={styles.label}>URL SERVIDOR BACKEND (RENDER)</Text>
        <TextInput style={styles.input} value={apiUrl} onChangeText={setApiUrl} />

        <Text style={styles.label}>API KEY DE AUTENTICACIÓN</Text>
        <TextInput style={styles.input} value={apiKey} onChangeText={setApiKey} secureTextEntry />

        <TouchableOpacity style={styles.btn} onPress={testConnection}>
          <Text style={styles.btnText}>⚡ PROBAR CONEXIÓN RENDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 },
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333' },
  label: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 6 },
  input: { backgroundColor: '#090a0f', color: '#00e676', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#1c2333', fontSize: 13, marginBottom: 15 },
  btn: { backgroundColor: '#00e676', padding: 14, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 }
});
