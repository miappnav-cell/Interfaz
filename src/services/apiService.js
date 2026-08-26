import { API_CONFIG } from '../config/apiConfig';

class ApiService {
  async checkHealth() {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  }

  async toggleSecurity(data) {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/api/security/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  }

  async getStatus() {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/api/status`);
      return await res.json();
    } catch {
      return null;
    }
  }

  async getUsers() {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/api/users`);
      return await res.json();
    } catch {
      return [];
    }
  }

  async getVersion() {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/version`);
      return await res.json();
    } catch {
      return { version: '2.4.0' };
    }
  }

  async logout() {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/auth/logout`);
      return await res.json();
    } catch {
      return { success: false };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
