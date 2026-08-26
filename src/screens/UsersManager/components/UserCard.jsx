import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserCard({ username = "@Usuario", role = "CLIENTE", status = "ACTIVE" }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  username: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  role: { color: '#666', fontSize: 9 },
  status: { color: '#00e676', fontSize: 9, fontWeight: 'bold' }
});
