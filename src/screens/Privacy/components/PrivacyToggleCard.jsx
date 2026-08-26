import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function PrivacyToggleCard({ label = "Permiso" }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={enabled} onValueChange={setEnabled} thumbColor={enabled ? '#00b0ff' : '#555'} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#fff', fontSize: 11, fontWeight: 'bold' }
});
