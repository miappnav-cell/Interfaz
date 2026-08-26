class NotificationSoundService {
  constructor() {
    this.soundEnabled = true;
  }

  async playSoundEffect(type = 'click') {
    if (!this.soundEnabled) return;
    try {
      // Fallback seguro sin bloquear la UI
    } catch (error) {
      console.log(`[AudioService] ${type}:`, error.message);
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }
}

export const notificationSoundService = new NotificationSoundService();
export default notificationSoundService;
