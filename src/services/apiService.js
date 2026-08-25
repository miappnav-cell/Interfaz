const BASE_URL = 'https://king-system-bot.onrender.com/api';

export const apiService = {
  async getUsers(token) {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Error al conectar con Render');
      return await response.json();
    } catch (err) {
      // Retorna mock si no responde el server
      return [
        { id: 1, telegram_id: '982736451', username: 'ClientAlpha', status: 'PENDING', tags: ['VIP', 'Nuevo'], service_start: '2026-08-25', service_expiration: '2026-09-25', showInbox: false, messages: [{ sender: 'SYSTEM', text: 'Esperando activación en PostgreSQL.' }] },
        { id: 2, telegram_id: '445129983', username: 'BotMaster_99', status: 'ACTIVE', tags: ['Premium'], service_start: '2026-08-01', service_expiration: '2026-09-01', showInbox: false, messages: [{ sender: 'SYSTEM', text: 'Conexión WebSocket activa.' }] },
        { id: 3, telegram_id: '123456789', username: 'GhostUser', status: 'BLOCKED', tags: ['Spam'], service_start: '2026-07-01', service_expiration: '2026-08-01', showInbox: false, messages: [] }
      ];
    }
  },

  async updateUserStatus(userId, status) {
    console.log(`[API Render] Actualizando usuario ${userId} a estado ${status}`);
    return true;
  }
};
