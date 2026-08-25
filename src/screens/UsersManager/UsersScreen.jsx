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
    // 1. Cargar datos iniciales del backend / PostgreSQL
    apiService.getUsers().then(data => setUsers(data));

    // 2. Conectar WebSockets para recepción de mensajes en vivo en tarjetas
    const socket = new RealtimeSocket((incomingMsg) => {
      setUsers(prev => prev.map(u => {
        if (u.id === incomingMsg.userId) {
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

  const handleStatusChange = (id, status) => {
    apiService.updateUserStatus(id, status);
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

  // Filtrado por buscador y etiquetas en tiempo real
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchText.toLowerCase()) || u.telegram_id.includes(searchText);
    const matchesFilter = activeFilter === 'TODOS' || u.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>GESTIÓN DE USUARIOS & WEBSOCKET</Text>
      
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
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', letterSpacing: 1.5, marginBottom: 15 }
});
