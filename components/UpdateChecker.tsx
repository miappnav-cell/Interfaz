import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';

export default function UpdateChecker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    if (__DEV__) return; // Omitir en entorno de desarrollo local
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateAvailable(true);
        setMessage('¡Nueva actualización disponible en el servidor!');
        setModalVisible(true);
      }
    } catch (error) {
      console.log('Error buscando actualizaciones:', error);
    }
  };

  const downloadAndInstall = async () => {
    try {
      setIsDownloading(true);
      setMessage('Descargando actualización OTA...');
      
      // Simulación de progreso fluido mientras descarga el paquete
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => (prev < 0.9 ? prev + 0.1 : prev));
      }, 200);

      await Updates.fetchUpdateAsync();
      
      clearInterval(progressInterval);
      setDownloadProgress(1);
      setMessage('¡Actualización descargada con éxito! Reiniciando aplicación...');
      
      setTimeout(async () => {
        await Updates.reloadAsync();
      }, 1500);
    } catch (error) {
      setIsDownloading(false);
      setMessage('Error al descargar la actualización.');
      console.error(error);
    }
  };

  return (
    <View>
      {/* Botón de Nube en la esquina superior derecha */}
      <TouchableOpacity 
        style={styles.cloudButton} 
        onPress={() => {
          if (updateAvailable) {
            setModalVisible(true);
          } else {
            checkForUpdates();
            alert('Buscando nuevas actualizaciones...');
          }
        }}
      >
        <Ionicons 
          name={updateAvailable ? "cloud-download" : "cloud-outline"} 
          size={24} 
          color={updateAvailable ? "#4CAF50" : "#ffffff"} 
        />
        {updateAvailable && <View style={styles.badge} />}
      </TouchableOpacity>

      {/* Modal de Notificación y Progreso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="cloud-upload-outline" size={48} color="#4CAF50" style={{alignSelf: 'center', marginBottom: 15}} />
            <Text style={styles.modalTitle}>Actualización del Servidor</Text>
            <Text style={styles.modalText}>{message}</Text>

            {isDownloading && (
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${downloadProgress * 100}%` }]} />
                <Text style={styles.progressText}>{Math.round(downloadProgress * 100)}%</Text>
              </View>
            )}

            {!isDownloading && (
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnPrimary]} 
                  onPress={downloadAndInstall}
                >
                  <Text style={styles.btnText}>Actualizar Ahora</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnSecondary]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.btnTextSecondary}>Más Tarde</Text>
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
  cloudButton: {
    padding: 8,
    position: 'relative',
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#4CAF50',
  },
  btnSecondary: {
    backgroundColor: '#333',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  btnTextSecondary: {
    color: '#aaaaaa',
    fontWeight: 'bold',
  },
});
