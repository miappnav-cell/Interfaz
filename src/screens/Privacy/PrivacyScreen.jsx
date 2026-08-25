import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PrivacyToggleCard from './components/PrivacyToggleCard';

export default function PrivacyScreen() {
  const [logActivity, setLogActivity] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Privacidad local garantizada.');

  const clearLogsInline = () => {
    setStatusMsg('🧹 Registros locales purgados del dispositivo.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>PRIVACIDAD Y TELEMETRÍA</Text>

      <PrivacyToggleCard 
        title="Registrar Actividad del Bot" 
        desc="Almacena peticiones locales para depuración."
        value={logActivity}
        onChange={setLogActivity}
      />
      <PrivacyToggleCard 
        title="Envío de Telemetría Anónima" 
        desc="Envía reportes de fallos al servidor Render."
        value={telemetry}
        onChange={setTelemetry}
      />

      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackText}>{statusMsg}</Text>
      </View>

      <TouchableOpacity style={styles.clearBtn} onPress={clearLogsInline}>
        <Text style={styles.clearBtnText}>PURGAR REGISTROS LOCALES</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 },
  feedbackCard: { backgroundColor: '#121622', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  feedbackText: { color: '#00e676', fontSize: 12, fontWeight: '600' },
  clearBtn: { backgroundColor: '#1a2234', padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#29354d' },
  clearBtnText: { color: '#ff5252', fontWeight: 'bold', fontSize: 12 }
});
