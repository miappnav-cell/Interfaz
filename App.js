import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import LionAnimation from './components/LionAnimation';
import PinScreen from './components/PinScreen';
import { checkForUpdates } from './components/UpdateService';

export default function App() {
  const [step, setStep] = useState('animation');
  const [updateStatus, setUpdateStatus] = useState('Verificar actualizaciones');
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleCheckUpdate = async () => {
    setUpdateStatus('Buscando actualizaciones...');
    const updateInfo = await checkForUpdates();
    
    if (updateInfo) {
      setUpdateStatus(`Nueva versión v${updateInfo.version} encontrada`);
      startDownloadSimulation();
    } else {
      setUpdateStatus('King System está al día');
    }
  };

  const startDownloadSimulation = () => {
    setUpdating(true);
    setProgress(0);
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setUpdateStatus('¡Actualización aplicada con éxito!');
        setUpdating(false);
      }
    });
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {step === 'animation' && (
        <LionAnimation onAnimationComplete={() => setStep('pin')} />
      )}

      {step === 'pin' && (
        <PinScreen onCorrectPin={() => setStep('dashboard')} />
      )}

      {step === 'dashboard' && (
        <View style={styles.dashboard}>
          <Text style={styles.dashTitle}>👑 King System</Text>
          <Text style={styles.dashSubtitle}>Panel de Control y Actualizaciones</Text>

          <TouchableOpacity 
            style={[styles.updateButton, updating && styles.disabledButton]} 
            onPress={handleCheckUpdate}
            disabled={updating}
          >
            <Text style={styles.updateButtonText}>🔄 {updateStatus}</Text>
          </TouchableOpacity>

          {updating && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Descargando actualización...</Text>
              <View style={styles.progressBarBackground}>
                <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050f' },
  dashboard: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  dashTitle: { color: '#d4af37', fontSize: 28, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  dashSubtitle: { color: '#8c92ac', fontSize: 14, marginBottom: 40 },
  updateButton: { backgroundColor: '#1f2937', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1, borderColor: '#374151', width: '100%', maxWidth: 300, alignItems: 'center' },
  disabledButton: { opacity: 0.6 },
  updateButtonText: { color: '#d4af37', fontSize: 15, fontWeight: 'bold' },
  progressContainer: { width: '100%', maxWidth: 300, marginTop: 25, alignItems: 'center' },
  progressText: { color: '#9ca3af', fontSize: 12, marginBottom: 8 },
  progressBarBackground: { width: '100%', height: 8, backgroundColor: '#1f2937', borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#374151' },
  progressBarFill: { height: '100%', backgroundColor: '#d4af37' },
});
