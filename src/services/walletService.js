import { apiService } from './apiService';
import { ENDPOINTS } from '../api/endpoints';

export const walletService = {
  async getBalance() {
    return await apiService.get(ENDPOINTS.WALLET + '/balance');
  },
  async processTransaction(type, amount, target) {
    return await apiService.callNode(ENDPOINTS.WALLET + '/transaction', { type, amount, target });
  }
};
