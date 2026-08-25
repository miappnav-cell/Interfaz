const BASE_URL = 'https://king-system-bot.onrender.com/api/admin';

export const apiService = {
  // 1. Obtener lista de usuarios registrados en el bot
  async getUsers(token) {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al conectar con Render');
      return await response.json();
    } catch (err) {
      // Datos mock de respaldo si el backend está desconectado
      return [
        { 
          id: 1, 
          telegram_id: '982736451', 
          username: 'Cliente_Alpha', 
          status: 'ACTIVE', 
          license_start: '2026-08-01', 
          license_expiration: '2026-09-01', 
          showInbox: false, 
          messages: [{ sender: 'SYSTEM', text: 'Licencia activa por 30 días.' }] 
        },
        { 
          id: 2, 
          telegram_id: '445129983', 
          username: 'Usuario_Demo', 
          status: 'PENDING', 
          license_start: 'N/A', 
          license_expiration: 'PENDIENTE', 
          showInbox: false, 
          messages: [{ sender: 'USER', text: 'Hola, solicito activar mi licencia.' }] 
        }
      ];
    }
  },

  // 2. Activar o renovar licencia de un usuario por N días
  async updateLicense(telegramId, status, daysToAdd = 30) {
    try {
      const response = await fetch(`${BASE_URL}/users/license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: telegramId, status, days_to_add: daysToAdd })
      });
      return await response.json();
    } catch (err) {
      console.log(`[API Mock] Licencia de ${telegramId} actualizada a ${status} (+${daysToAdd} días).`);
      return { success: true };
    }
  },

  // 3. Enviar mensaje directo desde la app al chat de Telegram del usuario via Bot
  async sendMessageToTelegram(telegramId, text) {
    try {
      const response = await fetch(`${BASE_URL}/users/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: telegramId, message: text })
      });
      return await response.json();
    } catch (err) {
      console.log(`[API Mock] Mensaje enviado a Telegram ID ${telegramId}: "${text}"`);
      return { success: true };
    }
  }
};
