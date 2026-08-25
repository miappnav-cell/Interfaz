import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function AuditLogsCard({ logs = [] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📜 LOGS DE SEGURIDAD EN TIEMPO REAL</Text>
      {logs.length === 0 ? (
        <Text style={styles.emptyText}>Sin eventos registrados en esta sesión.</Text>
      ) : (
        logs.map((item) => (
          <View key={item.id} style={styles.logRow}>
            <Text style={styles.time}>{item.timestamp}</Text>
            <Text style={[styles.action, item.severity === 'HIGH' && styles.highSev]}>
              {item.action}
            </Text>
            <Text style={styles.badge}>{item.severity}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginTop: 12 },
  title: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold', marginBottom: 10, letterSpacing: 0.5 },
  emptyText: { color: '#555', fontSize: 11, fontStyle: 'italic' },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4, borderBottomWidth: 1, borderColor: '#1a202c' },
  time: { color: '#666', fontSize: 10 },
  action: { color: '#aaa', fontSize: 10, fontWeight: '600' },
  highSev: { color: '#ff5252', fontWeight: 'bold' },
  badge: { color: '#00e676', fontSize: 8, fontWeight: 'bold', backgroundColor: '#090a0f', paddingHorizontal: 4, borderRadius: 4 }
});
