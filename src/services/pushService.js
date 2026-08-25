export const pushService = {
  async registerForPushNotifications() {
    console.log('[PUSH] Token Expo Push registrado correctamente.');
    return 'ExponentPushToken[MOCK_PUSH_TOKEN_12345]';
  },

  async sendTripAlert(telegramId, tripDetails) {
    console.log(`[PUSH] Enviando alerta de viaje a ${telegramId}:`, tripDetails);
    return true;
  }
};
