import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { checkServerForUpdate, downloadAndApplyUpdate } from '../services/updateService';

export default function UpdateCloudButton() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    checkServerForUpdate().then((available) => {
      if (available) setHasUpdate(true);
    });
  }, []);

  const handleUpdatePress = async () => {
    if (!hasUpdate) {
      alert('El sistema está al día.');
      return;
    }
    setModalVisible(true);
  };

  const executeDownload = async () => {
    setIsUpdating(true);
    try {
      await downloadAndApplyUpdate((currentProgress) => {
        setProgress(currentProgress);
      });
    } catch (error) {
      setIsUpdating(false);
      setModalVisible(false);
      alert('No se pudo completar la actualización.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón de la Nube */}
      <TouchableOpacity style={styles.cloudButton} onPress={handleUpdatePress}>
        <Ionicons 
          name={hasUpdate ? "cloud-download" : "cloud-outline"} 
          size={24} 
          color="#ffffff" 
        />
        {hasUpdate && <View style={styles.badge} />}
      </TouchableOpacity>

      {/* Modal / Menú Desplegable de Actualización */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Versión Disponible</Text>
            <Text style={styles.modalText}>
              {isUpdating 
                ? `Descargando componentes... ${Math.round(progress * 100)}%` 
                : 'Hay una nueva estructura lista para ser integrada en la aplicación.'}
            </Text>

            {/* Barra de Progreso */}
            {isUpdating && (
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
              </View>
            )}

            {!isUpdating && (
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.btnPrimary} onPress={executeDownload}>
                  <Text style={styles.btnTextPrimary}>Actualizar Ahora</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnTextSecondary}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  cloudButton: {
    padding: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2c2c2e',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#aeaeb2',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#2c2c2e',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#34C759',
  },
  buttonGroup: {
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSecondary: {
    backgroundColor: '#2c2c2e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextPrimary: {
    color: '#ffffff',
    fontWeight: '600',
  },
  btnTextSecondary: {
    color: '#aeaeb2',
    fontWeight: '600',
  },
});
