import * as Notifications from 'expo-notifications';

// Configurar comportamiento global de alertas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const notificationService = {
  async triggerServerNotification(notifData) {
    try {
      if (!notifData) return;

      console.log(`🔔 Disparando notificación ordenada por Render:`, notifData.title);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: notifData.title,
          body: notifData.body,
          sound: 'default',
        },
        trigger: null, // Disparar de inmediato
      });
    } catch (error) {
      console.error('❌ Error al disparar notificación local:', error.message);
    }
  }
};
