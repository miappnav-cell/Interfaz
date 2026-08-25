import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function PrivacyScreen() {
  const [telemetry, setTelemetry] = useState(false);
  const [logStorage, setLogStorage] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Privacidad y Telemetría</Text>

      <View style={styles.row}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Registrar Actividad del Bot</Text>
          <Text style={styles.sub}>Almacena consultas ejecutadas localmente.</Text>
        </View>
        <Switch value={logStorage} onValueChange={setLogStorage} trackColor={{ true: '#00e676' }} />
      </View>

      <View style={styles.row}>
        <View style={styles.textGroup}>
          <Text style={styles.title}>Envío de Telemetría Anónima</Text>
          <Text style={styles.sub}>Envía reportes de fallos al servidor Render.</Text>
        </View>
        <Switch value={telemetry} onValueChange={setTelemetry} trackColor={{ true: '#00e676' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: 15, borderRadius: 8, marginBottom: 15 },
  textGroup: { flex: 0.8 },
  title: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  sub: { color: '#777', fontSize: 12, marginTop: 4 }
});
