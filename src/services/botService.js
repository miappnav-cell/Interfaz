import { apiService } from './apiService';
import { ENDPOINTS } from '../api/endpoints';

export const botService = {
  async getBots() {
    return await apiService.get(ENDPOINTS.BOTS);
  },
  async executeBotAction(botId, action) {
    return await apiService.callNode(ENDPOINTS.BOTS, { botId, action });
  }
};
