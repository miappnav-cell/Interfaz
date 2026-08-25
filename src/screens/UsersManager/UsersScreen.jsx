import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserCard from './components/UserCard';
import UserFilterBar from './components/UserFilterBar';
import { apiService } from '../../services/apiService';
import { RealtimeSocket } from '../../services/socketService';

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [msgInput, setMsgInput] = useState({});

  useEffect(() => {
    // 1. Cargar lista inicial de licencias
    apiService.getUsers().then(data => setUsers(data));

    // 2. Conectar recepción de mensajes del bot en vivo
    const socket = new RealtimeSocket((incomingMsg) => {
      setUsers(prev => prev.map(u => {
        if (u.telegram_id === incomingMsg.telegram_id) {
          return {
            ...u,
            messages: [...u.messages, { sender: incomingMsg.sender, text: incomingMsg.text }]
          };
        }
        return u;
      }));
    });
    socket.connect();

    return () => socket.disconnect();
  }, []);

  // Activar / Bloquear Licencia
  const handleStatusChange = (id, newStatus) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    apiService.updateLicense(user.telegram_id, newStatus, 0);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  // Agregar +30 Días de Licencia
  const handleAddDays = (id) => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    apiService.updateLicense(user.telegram_id, 'ACTIVE', 30);
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const baseDate = u.license_expiration !== 'PENDIENTE' ? new Date(u.license_expiration) : new Date();
        baseDate.setDate(baseDate.getDate() + 30);
        return { 
          ...u, 
          status: 'ACTIVE',
          license_expiration: baseDate.toISOString().split('T')[0] 
        };
      }
      return u;
    }));
  };

  const handleToggleInbox = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, showInbox: !u.showInbox } : u));
  };

  // Enviar Mensaje al Chat de Telegram del Usuario
  const handleSendMessage = (id) => {
    const text = msgInput[id];
    const user = users.find(u => u.id === id);
    if (!text || !text.trim() || !user) return;

    apiService.sendMessageToTelegram(user.telegram_id, text);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, messages: [...u.messages, { sender: 'ADMIN', text }] } : u));
    setMsgInput({ ...msgInput, [id]: '' });
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchText.toLowerCase()) || u.telegram_id.includes(searchText);
    const matchesFilter = activeFilter === 'TODOS' || u.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ACTIVACIÓN DE LICENCIAS & CHAT BOT</Text>
      
      <UserFilterBar 
        searchText={searchText}
        setSearchText={setSearchText}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredUsers.map(u => (
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
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 1.5, marginBottom: 15 }
});
