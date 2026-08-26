import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import BotControllerCard from './components/BotControllerCard';
import UserFilterBar from './components/UserFilterBar';
import UserCard from './components/UserCard';

export default function UsersScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>GESTIÓN DE USUARIOS Y BOT</Text>
      <BotControllerCard />
      <UserFilterBar />
      <UserCard username="@KingAdmin" role="ADMINISTRADOR" status="ACTIVE" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 15 },
  header: { color: '#00b0ff', fontSize: 13, fontWeight: '900', marginBottom: 15 }
});
