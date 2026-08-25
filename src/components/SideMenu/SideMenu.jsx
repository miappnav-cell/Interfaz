import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SideMenu({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        <Text style={styles.headerTitle}>Panel de Control</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <MenuButton icon="🔄" text="Actualizaciones" action={() => onNavigate('Updates')} />
          <MenuButton icon="⚙️" text="Configuración" action={() => onNavigate('Settings')} />
          <MenuButton icon="🔒" text="Seguridad" action={() => onNavigate('Security')} />
          <MenuButton icon="👁️" text="Privacidad" action={() => onNavigate('Privacy')} />
          <MenuButton icon="👥" text="Gestión Usuarios" action={() => onNavigate('UsersManager')} />
          <MenuButton icon="🔌" text="APIs & Endpoints" action={() => onNavigate('ApiSettings')} />
          
        </ScrollView>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={() => onNavigate('Logout')}>
          <Text style={styles.logoutText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Ocultar Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Botón interno reutilizable
const MenuButton = ({ icon, text, action }) => (
  <TouchableOpacity style={styles.item} onPress={action}>
    <Text style={styles.itemText}>{icon}  {text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 999 },
  menuContainer: { width: '80%', height: '100%', backgroundColor: '#1a1a1a', padding: 20, paddingTop: 60, elevation: 5 },
  headerTitle: { color: '#00e676', fontSize: 22, fontWeight: '900', marginBottom: 25, letterSpacing: 1 },
  item: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#2a2a2a' },
  itemText: { color: '#e0e0e0', fontSize: 16, fontWeight: '600' },
  logoutBtn: { marginTop: 20, padding: 15, backgroundColor: '#d32f2f', borderRadius: 8, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { marginTop: 10, padding: 15, backgroundColor: '#333', borderRadius: 8, alignItems: 'center' },
  closeText: { color: '#aaa', fontWeight: 'bold' }
});
