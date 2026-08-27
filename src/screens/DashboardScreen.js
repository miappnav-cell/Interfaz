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
    Vibration.v50;
    console.log(`📤 Ejecutando acción [${actionType}] en nodo: ${nodeName}`);
    
    const response = await apiService.executeCommand(nodeName, actionType);

    if (response.success && response.rulesEnforced) {
      const { playSound, sendNotification } = response.rulesEnforced;

      if (playSound) {
        await soundService.playSoundTrigger(playSound);
      }

      if (sendNotification) {
        await notificationService.triggerServerNotification(sendNotification);
      }

      alert(response.message);
      fetchSystemData();
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>KING SYSTEM V2.4.0</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchSystemData}>
          <Ionicons name="refresh" size={20} color="#00F0FF" />
          <Text style={styles.refreshText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerCard}>
          <Text style={styles.headerLabel}>ESTADO DEL SERVIDOR (RENDER)</Text>
          <Text style={styles.headerValue}>
            {loading ? 'Sincronizando...' : (statusData?.serverStatus || 'Modo Offline')}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Nodos Activos en Red</Text>
        {statusData?.nodes?.map((node, index) => (
          <View key={index} style={styles.nodeCard}>
            <View>
              <Text style={styles.nodeName}>{node.node_name}</Text>
              <Text style={styles.nodeType}>{node.node_type}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => handleActionPress(node.node_name, 'RESTART')}
            >
              <Ionicons name="power" size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A8A',
    backgroundColor: '#0F172A',
  },
  appTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  refreshText: {
    color: '#00F0FF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  scrollContent: {
    padding: 20,
  },
  headerCard: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  headerLabel: {
    color: '#93C5FD',
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sectionTitle: {
    color: '#00F0FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1,
  },
  nodeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  nodeName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  nodeType: {
    color: '#93C5FD',
    fontSize: 12,
    marginTop: 2,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});
