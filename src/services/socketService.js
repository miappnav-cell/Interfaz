export class RealtimeSocket {
  constructor(onMessageReceived) {
    this.onMessageReceived = onMessageReceived;
    this.timer = null;
  }

  connect() {
    console.log('[WebSocket] Conectado a Render WS Endpoint...');
    // Simula llegada de mensajes en vivo desde Telegram a la tarjeta
    this.timer = setInterval(() => {
      const mockIncoming = {
        userId: 1,
        sender: 'TELEGRAM_BOT',
        text: `⚡ Notificación en vivo: ${new Date().toLocaleTimeString()}`
      };
      if (this.onMessageReceived) this.onMessageReceived(mockIncoming);
    }, 15000);
  }

  disconnect() {
    if (this.timer) clearInterval(this.timer);
    console.log('[WebSocket] Desconectado.');
  }
}
