import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserCard from './components/UserCard';

export default function UsersScreen() {
  const [users, setUsers] = useState([
    { id: 1, telegram_id: '982736451', username: 'ClientAlpha', status: 'PENDING', service_start: '2026-08-25', service_expiration: '2026-09-25', showInbox: false, messages: [{ sender: 'SYSTEM', text: 'Esperando validación de servicio.' }] },
    { id: 2, telegram_id: '445129983', username: 'BotMaster_99', status: 'ACTIVE', service_start: '2026-08-01', service_expiration: '2026-09-01', showInbox: false, messages: [{ sender: 'SYSTEM', text: 'Cuenta activa en PostgreSQL.' }] }
  ]);
  const [msgInput, setMsgInput] = useState({});

  const handleStatusChange = (id, status) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  };

  const handleAddDays = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const d = new Date(u.service_expiration);
        d.setDate(d.getDate() + 30);
        return { ...u, service_expiration: d.toISOString().split('T')[0] };
      }
      return u;
    }));
  };

  const handleToggleInbox = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, showInbox: !u.showInbox } : u));
  };

  const handleSendMessage = (id) => {
    const text = msgInput[id];
    if (!text || !text.trim()) return;
    setUsers(prev => prev.map(u => u.id === id ? { ...u, messages: [...u.messages, { sender: 'ADMIN', text }] } : u));
    setMsgInput({ ...msgInput, [id]: '' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>GESTIÓN DE USUARIOS (POSTGRESQL)</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map(u => (
          <UserCard 
            key={u.id} 
            user={u} 
            onStatusChange={handleStatusChange} 
            onAddDays={handleAddDays} 
            onToggleInbox={handleToggleInbox}
            onSendMessage={handleSendMessage}
            msgInput={msgInput}
            setMsgInput={setMsgInput}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 20 }
});
