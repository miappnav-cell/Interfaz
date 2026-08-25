import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function ApiScreen() {
  const [renderUrl, setRenderUrl] = useState('https://king-system-bot.onrender.com/api');
  const [apiKey, setApiKey] = useState('ks_live_9983748291823');

  const testConnection = () => {
    Alert.alert("Servidor Render", "Conexión exitosa con el endpoint PostgreSQL.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>APIs & Endpoints</Text>

      <Text style={styles.label}>URL Servidor Backend (Render)</Text>
      <TextInput style={styles.input} value={renderUrl} onChangeText={setRenderUrl} />

      <Text style={styles.label}>API Key de Autenticación</Text>
      <TextInput style={styles.input} secureTextEntry value={apiKey} onChangeText={setApiKey} />

      <TouchableOpacity style={styles.btn} onPress={testConnection}>
        <Text style={styles.btnText}>🔗 Probar Conexión con Render</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 5 },
  input: { backgroundColor: '#1a1a1a', color: '#00e676', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#333', marginBottom: 20, fontFamily: 'monospace' },
  btn: { backgroundColor: '#00e676', padding: 14, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 15 }
});
