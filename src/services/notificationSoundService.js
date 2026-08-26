class NotificationSoundService {
  constructor() {
    this.soundEnabled = true;
  }

  async playSoundEffect(type = 'click') {
    if (!this.soundEnabled) return;
    try {
      console.log(`[Audio] Reproduciendo efecto: ${type}`);
    } catch (error) {
      console.log(`[Audio Error] ${type}:`, error.message);
    }
  }

  triggerNotification(title, message) {
    console.log(`[Notificación] 🔔 ${title}: ${message}`);
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }
}

export const notificationSoundService = new NotificationSoundService();
export default notificationSoundService;
