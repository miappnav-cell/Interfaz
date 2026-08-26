import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const ROUTES = [
  { id: 'Security', label: '🛡️ Seguridad' },
  { id: 'UsersManager', label: '👥 Usuarios' },
  { id: 'Wallet', label: '💳 Billetera' },
  { id: 'Updates', label: '🔄 Sistema' },
  { id: 'ApiSettings', label: '⚡ API Backend' },
  { id: 'Privacy', label: '🔒 Privacidad' },
  { id: 'Settings', label: '⚙️ Ajustes' }
];

export default function SideMenu({ visible, onClose, navigation }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.drawer}>
          <Text style={styles.headerTitle}>KING SYSTEM</Text>
          {ROUTES.map((route) => (
            <TouchableOpacity 
              key={route.id} 
              style={styles.item}
              onPress={() => {
                onClose();
                if (navigation && navigation.navigate) {
                  navigation.navigate(route.id);
                }
              }}
            >
              <Text style={styles.itemText}>{route.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  drawer: { width: '75%', backgroundColor: '#121622', height: '100%', padding: 20, borderRightWidth: 1, borderColor: '#00b0ff' },
  headerTitle: { color: '#00b0ff', fontSize: 18, fontWeight: '900', marginBottom: 20, letterSpacing: 1 },
  item: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1c2333' },
  itemText: { color: '#fff', fontSize: 13, fontWeight: '600' }
});
