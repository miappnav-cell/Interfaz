import { apiClient } from '../config/apiConfig';

export const apiService = {
  // 1. Obtener estado del sistema y manifiesto SDUI desde Render
  async getSystemStatus() {
    try {
      const response = await apiClient.get('/system/status');
      return response.data;
    } catch (error) {
      console.warn('⚠️ Sin conexión a Render. Operando en modo Offline con caché local.');
      return {
        success: false,
        offline: true,
        message: 'No se pudo conectar al servidor. Verificando estado local.'
      };
    }
  },

  // 2. Enviar comandos de ejecución (Reiniciar, Apagar, Sincronizar)
  async executeCommand(nodeName, actionType, payload = {}) {
    try {
      console.log(`📤 Enviando orden -> Nodo: ${nodeName}, Acción: ${actionType}`);
      
      const response = await apiClient.post('/system/execute', {
        node: nodeName,
        action: actionType,
        payload: payload
      });

      // El servidor devuelve un paquete con reglas (audio, notificaciones, etc.)
      const data = response.data;
      
      if (data.rulesEnforced) {
        console.log(`🔔 Regla del servidor recibida [Sonido]: ${data.rulesEnforced.playSound}`);
      }

      return data;
    } catch (error) {
      console.error('❌ Error crítico ejecutando comando:', error.message);
      return {
        success: false,
        message: error.response?.data?.error || 'Error de comunicación con el servidor.'
      };
    }
  }
};
