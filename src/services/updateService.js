import { apiService } from './apiService';
import { ENDPOINTS } from '../api/endpoints';

export const updateService = {
  async checkForUpdates() {
    return await apiService.get(ENDPOINTS.UPDATES + '/check');
  },
  async applyUpdate(versionId) {
    return await apiService.callNode(ENDPOINTS.UPDATES + '/apply', { versionId });
  }
};
