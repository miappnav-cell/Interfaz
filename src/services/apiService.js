import axios from 'axios';
import { API_BASE_URL, TIMEOUT_MS } from '../config/apiConfig';
import { soundService } from './soundService';
import { notificationService } from './notificationService';

const apiClient = axios.create({
  baseURL: API_BASE_URL || 'https://interfaz-v2.onrender.com',
  timeout: TIMEOUT_MS || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Petición genérica de lectura (GET)
  async get(endpoint, params = {}) {
    try {
      const response = await apiClient.get(endpoint, { params });
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`❌ Error GET [${endpoint}]:`, error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error de conexión con el nodo de la nube.' 
      };
    }
  },

  // Petición genérica de llamada/acción (POST) con respuesta procesada
  async callNode(endpoint, payload = {}) {
    try {
      console.log(`📡 [LLAMADA NODO] -> ${endpoint}`, payload);
      const response = await apiClient.post(endpoint, payload);
      const result = response.data;

      // Procesar respuesta automática si trae reglas dictadas por el servidor
      if (result.rulesEnforced) {
        const { playSound, sendNotification } = result.rulesEnforced;
        if (playSound) await soundService.playSoundTrigger(playSound);
        if (sendNotification) await notificationService.triggerServerNotification(sendNotification);
      }

      return {
        success: result.success ?? true,
        message: result.message || 'Operación completada en el nodo.',
        data: result.data || result,
      };
    } catch (error) {
      console.error(`❌ Error POST [${endpoint}]:`, error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'El nodo no respondió a la llamada.',
      };
    }
  },

  // Mantener compatibilidad con llamadas directas
  async getSystemStatus() {
    return (await this.get('/system/status')).data || null;
  },

  async executeCommand(nodeName, actionType) {
    return await this.callNode('/system/execute', { nodeName, actionType });
  }
};
