import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import notificationSoundService from '../../services/notificationSoundService';

export const UsersScreen = () => {
  const [bots, setBots] = useState([
    { id: '1', name: 'KingBot Alpha', status: 'ACTIVO', node: 'Nodo 01' },
    { id: '2', name: 'KingBot Beta', status: 'DETENIDO', node: 'Nodo 02' }
  ]);

  const toggleBot = (id) => {
    notificationSoundService.playSoundEffect('click');
    setBots(prev => prev.map(bot => {
      if (bot.id === id) {
        const nextStatus = bot.status === 'ACTIVO' ? 'DETENIDO' : 'ACTIVO';
        notificationSoundService.triggerNotification('Estado de Bot', `${bot.name} cambió a ${nextStatus}`);
        return { ...bot, status: nextStatus };
      }
      return bot;
    }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>👥 Centro de Control de Bots y Nodos</Text>
      {bots.map(bot => (
        <View key={bot.id} style={styles.card}>
          <View>
            <Text style={styles.botName}>{bot.name}</Text>
            <Text style={styles.botNode}>{bot.node}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, bot.status === 'ACTIVO' ? styles.activeBtn : styles.inactiveBtn]}
            onPress={() => toggleBot(bot.id)}
          >
            <Text style={styles.buttonText}>{bot.status}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  content: { padding: 16 },
  title: { color: '#00ffff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#0a0a14', borderWidth: 1, borderColor: '#1a1a2e', padding: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  botName: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  botNode: { color: '#6e6e8e', fontSize: 12 },
  button: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  activeBtn: { backgroundColor: '#00ffff22', borderWidth: 1, borderColor: '#00ffff' },
  inactiveBtn: { backgroundColor: '#ff005522', borderWidth: 1, borderColor: '#ff0055' },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 }
});

export default UsersScreen;
