import { apiService } from './apiService';
import { ENDPOINTS } from '../api/endpoints';

export const securityService = {
  async getAuditLogs() {
    return await apiService.get(ENDPOINTS.SECURITY + '/logs');
  },
  async toggleSecuritySetting(settingKey, value) {
    return await apiService.callNode(ENDPOINTS.SECURITY + '/toggle', { settingKey, value });
  }
};
