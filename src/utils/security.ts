// Security utilities for entry gate
export const SecurityUtils = {
  // Track failed verification attempts
  trackFailedAttempt: () => {
    const attempts = localStorage.getItem('failed_attempts') || '0';
    const newAttempts = parseInt(attempts) + 1;
    localStorage.setItem('failed_attempts', newAttempts.toString());
    localStorage.setItem('last_failed_attempt', Date.now().toString());
    return newAttempts;
  },

  // Check if user is temporarily blocked
  isBlocked: (): { blocked: boolean; timeLeft?: number } => {
    const attempts = parseInt(localStorage.getItem('failed_attempts') || '0');
    const lastAttempt = localStorage.getItem('last_failed_attempt');
    
    if (attempts >= 5 && lastAttempt) {
      const timeElapsed = Date.now() - parseInt(lastAttempt);
      const blockDuration = 15 * 60 * 1000; // 15 minutes
      
      if (timeElapsed < blockDuration) {
        return {
          blocked: true,
          timeLeft: Math.ceil((blockDuration - timeElapsed) / 1000 / 60)
        };
      } else {
        // Reset attempts after block period
        localStorage.removeItem('failed_attempts');
        localStorage.removeItem('last_failed_attempt');
      }
    }
    
    return { blocked: false };
  },

  // Clear failed attempts on successful verification
  clearFailedAttempts: () => {
    localStorage.removeItem('failed_attempts');
    localStorage.removeItem('last_failed_attempt');
  },

  // Log access attempt (could be sent to analytics)
  logAccess: (type: 'success' | 'failure' | 'blocked', method: 'captcha' | 'admin') => {
    const log = {
      timestamp: Date.now(),
      type,
      method,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Store locally (in production, send to your analytics service)
    const logs = JSON.parse(localStorage.getItem('access_logs') || '[]');
    logs.push(log);
    
    // Keep only last 100 logs
    if (logs.length > 100) {
      logs.splice(0, logs.length - 100);
    }
    
    localStorage.setItem('access_logs', JSON.stringify(logs));
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Access Log:', log);
    }
  },

  // Get access statistics
  getStats: () => {
    const logs = JSON.parse(localStorage.getItem('access_logs') || '[]');
    const today = new Date().toDateString();
    
    const todayLogs = logs.filter((log: any) => 
      new Date(log.timestamp).toDateString() === today
    );
    
    return {
      totalAttempts: logs.length,
      todayAttempts: todayLogs.length,
      successfulAccess: logs.filter((log: any) => log.type === 'success').length,
      failedAttempts: logs.filter((log: any) => log.type === 'failure').length,
      blockedAttempts: logs.filter((log: any) => log.type === 'blocked').length,
      lastAccess: logs.length > 0 ? new Date(logs[logs.length - 1].timestamp) : null
    };
  }
};

// Hook for using security features
export const useSecurity = () => {
  return SecurityUtils;
};
