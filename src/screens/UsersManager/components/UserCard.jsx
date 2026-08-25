import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function UserCard({ user, onStatusChange, onAddDays, onToggleInbox, onSendMessage, msgInput, setMsgInput }) {
  const isBlocked = user.status === 'BLOCKED';
  const isActive = user.status === 'ACTIVE';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.id}>Telegram ID: {user.telegram_id}</Text>
        </View>
        <View style={[styles.badge, isActive ? styles.bgActive : isBlocked ? styles.bgBlocked : styles.bgPending]}>
          <Text style={styles.badgeText}>{user.status}</Text>
        </View>
      </View>

      <View style={styles.dateBox}>
        <Text style={styles.dateText}>Inicio: {user.service_start}</Text>
        <Text style={styles.dateText}>Expira: {user.service_expiration}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, styles.bgActive]} onPress={() => onStatusChange(user.id, 'ACTIVE')}>
          <Text style={styles.btnText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.bgBlocked]} onPress={() => onStatusChange(user.id, 'BLOCKED')}>
          <Text style={styles.btnText}>Bloquear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.bgBlue]} onPress={() => onAddDays(user.id)}>
          <Text style={styles.btnText}>+30 Días</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.inboxToggle} onPress={() => onToggleInbox(user.id)}>
        <Text style={styles.inboxToggleText}>{user.showInbox ? '🔼 Ocultar Buzón' : '📬 Abrir Buzón Inline'}</Text>
      </TouchableOpacity>

      {user.showInbox && (
        <View style={styles.inboxContainer}>
          {user.messages.map((m, idx) => (
            <View key={idx} style={styles.msgItem}>
              <Text style={styles.msgSender}>[{m.sender}]</Text>
              <Text style={styles.msgText}>{m.text}</Text>
            </View>
          ))}
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.input} 
              placeholder="Escribir al buzón..." 
              placeholderTextColor="#555"
              value={msgInput[user.id] || ''}
              onChangeText={t => setMsgInput({ ...msgInput, [user.id]: t })}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => onSendMessage(user.id)}>
              <Text style={styles.sendBtnText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  username: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  id: { color: '#6b7a99', fontSize: 11 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  bgActive: { backgroundColor: '#1b5e20' },
  bgBlocked: { backgroundColor: '#b71c1c' },
  bgPending: { backgroundColor: '#e65100' },
  bgBlue: { backgroundColor: '#0d47a1' },
  dateBox: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#1a2234' },
  dateText: { color: '#aaa', fontSize: 11 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  btn: { flex: 0.31, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 11 },
  inboxToggle: { backgroundColor: '#1a2234', padding: 10, borderRadius: 6, marginTop: 10, alignItems: 'center' },
  inboxToggleText: { color: '#00b0ff', fontWeight: 'bold', fontSize: 12 },
  inboxContainer: { backgroundColor: '#090a0f', padding: 10, borderRadius: 8, marginTop: 10 },
  msgItem: { marginBottom: 6 },
  msgSender: { color: '#00e676', fontSize: 10, fontWeight: 'bold' },
  msgText: { color: '#ddd', fontSize: 12 },
  inputRow: { flexDirection: 'row', marginTop: 8 },
  input: { flex: 1, backgroundColor: '#161c2b', color: '#fff', paddingHorizontal: 10, height: 36, borderRadius: 6, fontSize: 12 },
  sendBtn: { backgroundColor: '#00e676', paddingHorizontal: 12, justifyContent: 'center', borderRadius: 6, marginLeft: 6 },
  sendBtnText: { color: '#000', fontWeight: 'bold', fontSize: 11 }
});
