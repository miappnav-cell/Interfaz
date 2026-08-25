export class RealtimeSocket {
  constructor(onMessageReceived) {
    this.onMessageReceived = onMessageReceived;
    this.timer = null;
  }

  connect() {
    console.log('[WebSocket] Conectado al canal de mensajería del Bot...');
    
    // Simulación de recepción de mensajes reales desde Telegram
    this.timer = setInterval(() => {
      const incomingMsg = {
        telegram_id: '445129983',
        sender: 'USER',
        text: `💬 Mensaje recibido en Telegram: ${new Date().toLocaleTimeString()}`
      };
      if (this.onMessageReceived) this.onMessageReceived(incomingMsg);
    }, 20000);
  }

  disconnect() {
    if (this.timer) clearInterval(this.timer);
    console.log('[WebSocket] Desconectado del Bot.');
  }
}
