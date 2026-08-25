import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

export default function UsersScreen() {
  const [users, setUsers] = useState([
    { id: 1, telegram_id: '982736451', username: 'ClientAlpha', status: 'PENDING', service_start: '2026-08-25', service_expiration: '2026-09-25' },
    { id: 2, telegram_id: '445129983', username: 'BotMaster_99', status: 'ACTIVE', service_start: '2026-08-01', service_expiration: '2026-09-01' }
  ]);
  const [loading, setLoading] = useState(false);

  const updateUserStatus = (telegramId, newStatus) => {
    setUsers(prev => prev.map(u => u.telegram_id === telegramId ? { ...u, status: newStatus } : u));
    Alert.alert("Estado Actualizado", `Usuario ${telegramId} ahora está ${newStatus}`);
  };

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'ACTIVE': return styles.badgeActive;
      case 'BLOCKED': return styles.badgeBlocked;
      default: return styles.badgePending;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Usuarios (Bot)</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#00e676" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {users.map((item) => (
            <View key={item.id} style={styles.userCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.userName}>@{item.username}</Text>
                <View style={[styles.badge, getBadgeStyle(item.status)]}>
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>
              
              <Text style={styles.infoText}>ID Telegram: {item.telegram_id}</Text>
              <Text style={styles.infoText}>Inicio: {item.service_start} | Expira: {item.service_expiration}</Text>
              
              <TouchableOpacity style={styles.inboxBtn}>
                <Text style={styles.inboxText}>📬 Abrir Buzón Personalizado</Text>
              </TouchableOpacity>

              <View style={styles.actionsRow}>
                <TouchableOpacity 
                  style={[styles.actionBtn, {backgroundColor: '#2e7d32'}]}
                  onPress={() => updateUserStatus(item.telegram_id, 'ACTIVE')}
                >
                  <Text style={styles.btnText}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, {backgroundColor: '#c62828'}]}
                  onPress={() => updateUserStatus(item.telegram_id, 'BLOCKED')}
                >
                  <Text style={styles.btnText}>Bloquear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#1565c0'}]}>
                  <Text style={styles.btnText}>+30 Días</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  userCard: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginBottom: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgePending: { backgroundColor: '#f57c00' },
  badgeActive: { backgroundColor: '#2e7d32' },
  badgeBlocked: { backgroundColor: '#c62828' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  infoText: { color: '#aaa', fontSize: 13, marginBottom: 5 },
  inboxBtn: { backgroundColor: '#333', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center', borderWidth: 1, borderColor: '#444' },
  inboxText: { color: '#00e676', fontWeight: 'bold', fontSize: 13 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  actionBtn: { flex: 0.31, paddingVertical: 10, alignItems: 'center', borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});
