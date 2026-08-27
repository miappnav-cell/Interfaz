import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Vibration 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../services/apiService';
import { soundService } from '../services/soundService';
import { notificationService } from '../services/notificationService';

export default function DashboardScreen() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sandwichExpanded, setSandwichExpanded] = useState(false);

  const fetchSystemData = async () => {
    setLoading(true);
    Vibration.v50;
    const data = await apiService.getSystemStatus();
    setStatusData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSystemData();
  }, []);

  const handleActionPress = async (nodeName, actionType) => {
    Vibration.v70;
    console.log(`📤 Ejecutando acción [${actionType}] en nodo: ${nodeName}`);
    
    const response = await apiService.executeCommand(nodeName, actionType);

    if (response.success && response.rulesEnforced) {
      const { playSound, sendNotification } = response.rulesEnforced;

      if (playSound) await soundService.playSoundTrigger(playSound);
      if (sendNotification) await notificationService.triggerServerNotification(sendNotification);

      alert(response.message);
      fetchSystemData();
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🌌 Barra Superior Estelar */}
      <View style={styles.topBar}>
        <View style={styles.titleContainer}>
          <View style={styles.stellarCoreGlow} />
          <Text style={styles.appTitle}>KING SYSTEM</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchSystemData}>
          <Ionicons name="planet" size={16} color="#00F0FF" />
          <Text style={styles.refreshText}>SINCRONIZAR</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 🌠 Tarjeta Cabecera Estelar (Render Core) */}
        <View style={styles.headerCard}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="sparkles" size={18} color="#00F0FF" />
            <Text style={styles.headerLabel}>NÚCLEO ESTELAR (RENDER)</Text>
          </View>
          <Text style={styles.headerValue}>
            {loading ? 'Conectando con la órbita...' : (statusData?.serverStatus || 'ÓRBITA ESTABLE')}
          </Text>
          <Text style={styles.timestamp}>
            Último pulso orbital: {statusData?.timestamp ? new Date(statusData.timestamp).toLocaleTimeString() : 'En vivo'}
          </Text>
        </View>

        {/* ⚡ Sección de Nodos Tácticos */}
        <View style={styles.sectionHeader}>
          <Ionicons name="hardware-chip-outline" size={18} color="#00F0FF" />
          <Text style={styles.sectionTitle}>NODOS DE RED ESTELAR</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00F0FF" />
            <Text style={styles.loaderText}>Sincronizando constelación de nodos...</Text>
          </View>
        ) : (
          statusData?.nodes?.map((node, index) => (
            <View key={index} style={styles.nodeCard}>
              <View style={styles.nodeInfo}>
                <Text style={styles.nodeName}>{node.node_name}</Text>
                <Text style={styles.nodeType}>{node.node_type}</Text>
              </View>
              
              <View style={styles.nodeRightSection}>
                <View style={[styles.badge, { backgroundColor: node.status === 'OPERATIVO' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
                  <View style={[styles.badgeDot, { backgroundColor: node.status === 'OPERATIVO' ? '#10B981' : '#EF4444' }]} />
                  <Text style={[styles.badgeText, { color: node.status === 'OPERATIVO' ? '#34D399' : '#F87171' }]}>{node.status}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={() => handleActionPress(node.node_name, 'RESTART')}
                >
                  <Ionicons name="power" size={14} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>REINICIAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* 🥪 Estilo Sándwich (Auditoría SQL Estelar) */}
        <TouchableOpacity 
          style={styles.sandwichHeader} 
          onPress={() => setSandwichExpanded(!sandwichExpanded)}
          activeOpacity={0.8}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="code-slash" size={18} color="#93C5FD" />
            <Text style={styles.sandwichTitle}> REGISTROS DEL NÚCLEO SQL</Text>
          </View>
          <Ionicons name={sandwichExpanded ? "chevron-up" : "chevron-down"} size={18} color="#93C5FD" />
        </TouchableOpacity>

        {sandwichExpanded && (
          <View style={styles.sandwichBody}>
            <Text style={styles.sandwichSubText}>Bitácora de interacciones cuánticas en el servidor:</Text>
            {statusData?.recentAudits?.length > 0 ? (
              statusData.recentAudits.map((audit, idx) => (
                <View key={idx} style={styles.auditRow}>
                  <Text style={styles.auditAction}>✨ [{audit.action_type}] ➔ {audit.node_target}</Text>
                  <Text style={styles.auditDetails}>{audit.details}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAuditText}>Sin registros previos en la base de datos.</Text>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14', // Color base exacto de la pantalla estelar
    paddingTop: 35,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A8A', // Borde estelar
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stellarCoreGlow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00F0FF',
    marginRight: 8,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  appTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshText: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 6,
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)', // Consistente con las tarjetas de seguridad estelar
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLabel: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginLeft: 8,
  },
  headerValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  timestamp: {
    color: '#93C5FD',
    fontSize: 11,
    fontFamily: 'monospace',
    opacity: 0.8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#93C5FD',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 1.5,
  },
  loaderContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  loaderText: {
    color: '#93C5FD',
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 1,
  },
  nodeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  nodeType: {
    color: '#93C5FD',
    fontSize: 11,
    marginTop: 3,
    textTransform: 'uppercase',
  },
  nodeRightSection: {
    alignItems: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  sandwichHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1E3A8A',
  },
  sandwichTitle: {
    color: '#93C5FD',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  sandwichBody: {
    backgroundColor: 'rgba(5, 11, 20, 0.95)',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 16,
    marginTop: -4,
  },
  sandwichSubText: {
    color: '#93C5FD',
    fontSize: 11,
    marginBottom: 12,
    opacity: 0.8,
  },
  auditRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A8A',
    paddingBottom: 8,
    marginBottom: 8,
  },
  auditAction: {
    color: '#00F0FF',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  auditDetails: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 2,
  },
  noAuditText: {
    color: '#93C5FD',
    fontSize: 11,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});
