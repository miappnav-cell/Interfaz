const API_BASE_URL = 'https://render-api-backend.onrender.com';

export const apiService = {
  checkVersion: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/version`);
      return await response.json();
    } catch (_error) {
      return { status: 'OFFLINE', version: '2.4.0' };
    }
  },

  getStatus: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status`);
      return await response.json();
    } catch (_error) {
      return { online: false, database: 'DISCONNECTED' };
    }
  },

  getUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`);
      return await response.json();
    } catch (_error) {
      return [];
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
      return await response.json();
    } catch (_error) {
      return { success: false };
    }
  }
};
