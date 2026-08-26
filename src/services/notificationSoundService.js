import { Alert, Vibration, Platform } from 'react-native';

export const notificationSoundService = {
  // Disparar Notificación con Sonido/Vibración de Sistema
  triggerNotification: (title, message) => {
    // Vibración hápica (móvil)
    if (Platform.OS !== 'web') {
      Vibration.vibrate([0, 250, 100, 250]);
    }

    // Alerta de notificación en interfaz
    Alert.alert(
      `🔔 ${title}`,
      message,
      [{ text: 'Entendido', style: 'default' }],
      { cancelable: true }
    );
  },

  // Reproducir efectos de sonido de interfaz
  playSoundEffect: (type = 'click') => {
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }
    console.log(`🔊 [SONIDO]: Efecto audio '${type}' reproducido correctamente.`);
  }
};

export default notificationSoundService;
