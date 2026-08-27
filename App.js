import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [logs, setLogs] = useState(['King System inicializado correctamente.']);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);
  };

  const executeAction = (actionName) => {
    addLog(`Ejecutando: ${actionName}`);
    Alert.alert('King System', `Acción [${actionName}] procesada con éxito.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.title}>👑 KING SYSTEM</Text>
        <Text style={styles.subtitle}>Panel Maestro - 22 Módulos Detectados</Text>
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>Estado: Operativo</Text>
        </View>
      </View>

      {/* Navegación Modular */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navScroll}>
        {['dashboard', 'users', 'wallet', 'security', 'settings', 'updates', 'api'].map((mod) => (
          <TouchableOpacity 
            key={mod} 
            style={[styles.navTab, currentModule === mod && styles.navTabActive]}
            onPress={() => { setCurrentModule(mod); addLog(`Cambiando a módulo: ${mod}`); }}
          >
            <Text style={[styles.navTabText, currentModule === mod && styles.navTabTextActive]}>
              {mod.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contenido Dinámico según el Módulo */}
      <ScrollView contentContainerStyle={styles.content}>
        {currentModule === 'dashboard' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Panel de Control General</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Sincronizar Nodos')}>
              <Text style={styles.cardTitle}>🔄 Sincronizar Red de Nodos</Text>
              <Text style={styles.cardDesc}>Actualiza el estado de la red en tiempo real.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Limpiar Caché')}>
              <Text style={styles.cardTitle}>🧹 Limpieza de Memoria y Caché</Text>
              <Text style={styles.cardDesc}>Optimiza el rendimiento operativo de la app.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'users' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👥 Gestión de Usuarios y Bots</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Reiniciar Bots Activos')}>
              <Text style={styles.cardTitle}>🤖 BotControllerCard - Reiniciar Instancias</Text>
              <Text style={styles.cardDesc}>Envía orden de reinicio a los bots del sistema.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'wallet' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💰 Billetera y Pasarelas</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Procesar Recarga')}>
              <Text style={styles.cardTitle}>💳 RechargeCard - Gestión de Fondos</Text>
              <Text style={styles.cardDesc}>Administra los fondos y pasarelas de pago.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'security' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔒 Seguridad y Auditoría</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Verificar Logs')}>
              <Text style={styles.cardTitle}>🛡️ AuditLogsCard - Revisar Registros</Text>
              <Text style={styles.cardDesc}>Monitorea las actividades recientes del sistema.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'settings' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚙️ Ajustes del Sistema</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Cambiar Tema')}>
              <Text style={styles.cardTitle}>🎨 ThemeSelector - Apariencia</Text>
              <Text style={styles.cardDesc}>Configura los parámetros visuales de la interfaz.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'updates' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚀 Actualizaciones</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Buscar Updates')}>
              <Text style={styles.cardTitle}>📦 UpdateCard - Versión del Sistema</Text>
              <Text style={styles.cardDesc}>Comprueba la disponibilidad de nuevas versiones.</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentModule === 'api' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌐 Configuración de API</Text>
            <TouchableOpacity style={styles.card} onPress={() => executeAction('Probar Endpoints')}>
              <Text style={styles.cardTitle}>🔗 ApiStatusBadge - Estado de Conexión</Text>
              <Text style={styles.cardDesc}>Valida la comunicación con los servidores remotos.</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Consola de Eventos */}
        <View style={styles.console}>
          <Text style={styles.consoleHeader}>💻 Consola de Actividad</Text>
          {logs.map((l, i) => (
            <Text key={i} style={styles.consoleText}>{l}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16' },
  header: { padding: 18, backgroundColor: '#111827', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1f2937' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#38bdf8', letterSpacing: 1 },
  subtitle: { fontSize: 12, color: '#9ca3af', marginTop: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: '#1f2937', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e', marginRight: 6 },
  badgeText: { color: '#22c55e', fontSize: 11, fontWeight: '600' },
  navScroll: { maxHeight: 50, backgroundColor: '#111827', paddingHorizontal: 10, paddingVertical: 8 },
  navTab: { paddingHorizontal: 14, paddingVertical: 6, backgroundColor: '#1f2937', borderRadius: 8, marginRight: 8, height: 32, justifyContent: 'center' },
  navTabActive: { backgroundColor: '#0284c7' },
  navTabText: { color: '#9ca3af', fontSize: 11, fontWeight: 'bold' },
  navTabTextActive: { color: '#ffffff' },
  content: { padding: 16 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#f3f4f6', marginBottom: 10 },
  card: { backgroundColor: '#111827', padding: 14, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#1f2937' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#38bdf8', marginBottom: 3 },
  cardDesc: { fontSize: 11, color: '#9ca3af' },
  console: { backgroundColor: '#030712', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#1f2937', marginTop: 10 },
  consoleHeader: { color: '#4b5563', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  consoleText: { color: '#38bdf8', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 }
});
