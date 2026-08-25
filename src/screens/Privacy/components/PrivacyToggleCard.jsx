import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function PrivacyToggleCard({ title, desc, value, onChange }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onChange}
        trackColor={{ false: '#333', true: '#1b5e20' }}
        thumbColor={value ? '#00e676' : '#777'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  info: { flex: 0.8 },
  title: { color: '#fff', fontSize: 14, fontWeight: '700' },
  desc: { color: '#6b7a99', fontSize: 11, marginTop: 3 }
});
