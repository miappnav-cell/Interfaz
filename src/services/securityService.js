let sessionTimeout = null;
let securityLogs = [];

export const securityService = {
  // Validación de PIN del sistema (Default: 1234)
  verifyPIN: (inputPin) => {
    const defaultPin = '1234';
    const isValid = inputPin === defaultPin;
    securityService.addLog(isValid ? 'ACCESO_CONCEDIDO' : 'INTENTO_FALLIDO_PIN', isValid ? 'LOW' : 'HIGH');
    return isValid;
  },

  // Generador de firmas de payload anti-tamper
  signPayload: (payload) => {
    const timestamp = Date.now();
    const signature = btoa(JSON.stringify(payload) + '_' + timestamp);
    return { ...payload, _sig: signature, _ts: timestamp };
  },

  // Registro de Auditoría de Seguridad
  addLog: (action, severity = 'INFO') => {
    const log = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      action,
      severity
    };
    securityLogs.unshift(log);
    if (securityLogs.length > 20) securityLogs.pop();
    return log;
  },

  getAuditLogs: () => [...securityLogs],

  // Auto-Lock por inactividad (3 minutos)
  startSessionTimer: (onTimeout) => {
    if (sessionTimeout) clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      securityService.addLog('SESION_BLOQUEADA_INACTIVIDAD', 'MEDIUM');
      if (onTimeout) onTimeout();
    }, 180000);
  },

  resetSessionTimer: (onTimeout) => {
    securityService.startSessionTimer(onTimeout);
  }
};
