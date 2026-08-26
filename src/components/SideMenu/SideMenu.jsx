import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const MENU_ITEMS = [
  { id: 'Security', label: '🛡️ Seguridad Inicial', tag: 'ACCESO' },
  { id: 'UsersManager', label: '👥 Licencias / Bot Telegram', tag: 'CORE' },
  { id: 'Wallet', label: '💳 Billetera & Movimientos', tag: 'FINANZAS' },
  { id: 'Updates', label: '🔄 Sistema & Actualizaciones', tag: 'OTAS' },
  { id: 'ApiSettings', label: '⚡ Conexión Backend Render', tag: 'API' },
  { id: 'Privacy', label: '🔒 Privacidad & Permisos', tag: 'SEGURIDAD' },
  { id: 'Settings', label: '⚙️ Configuración General', tag: 'SISTEMA' }
];

export default function SideMenu({ visible, onClose, navigation, currentRoute }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>KING SYSTEM PANEL</Text>
            <Text style={styles.headerSub}>v2.4.0 • Modular Architecture</Text>
          </View>
          <View style={styles.itemsContainer}>
            {MENU_ITEMS.map((item) => {
              const active = currentRoute === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.itemBtn, active && styles.activeItemBtn]}
                  onPress={() => {
                    onClose();
                    if (navigation) navigation.navigate(item.id);
                  }}
                >
                  <Text style={[styles.itemText, active && styles.activeItemText]}>{item.label}</Text>
                  <Text style={styles.itemTag}>{item.tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✖️ CERRAR MENÚ</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', flexDirection: 'row' },
  drawer: { width: '80%', backgroundColor: '#121622', height: '100%', padding: 20, borderRightWidth: 1, borderColor: '#00b0ff' },
  header: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#1c2333', paddingBottom: 15 },
  headerTitle: { color: '#00b0ff', fontSize: 16, fontWeight: '900', letterSpacing: 1.5 },
  headerSub: { color: '#555', fontSize: 10, marginTop: 2 },
  itemsContainer: { flex: 1 },
  itemBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, marginBottom: 6 },
  activeItemBtn: { backgroundColor: '#1c2333', borderWidth: 1, borderColor: '#00b0ff' },
  itemText: { color: '#aaa', fontSize: 12, fontWeight: '600' },
  activeItemText: { color: '#fff', fontWeight: 'bold' },
  itemTag: { color: '#555', fontSize: 9, fontWeight: 'bold' },
  closeBtn: { backgroundColor: '#090a0f', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#1c2333' },
  closeBtnText: { color: '#ff5252', fontSize: 11, fontWeight: 'bold' }
});
