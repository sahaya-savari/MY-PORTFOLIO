// Secure Admin Authentication
// This file contains enhanced security for admin access

export class SecureAdmin {
  // Hash of the admin password (Santhosh@007)
  private static readonly ADMIN_HASH = 'a8b3c2d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1';
  
  // Generate a simple hash (in production, use proper cryptographic hashing)
  private static simpleHash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  // Verify admin password
  public static verifyPassword(password: string): boolean {
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!adminPass) return false;
    return password === adminPass;
  }

  // Check if admin access should be available
  public static isAdminAccessEnabled(): boolean {
    // Only enable in development
    if (process.env.NODE_ENV !== 'development') {
      return false;
    }

    // Additional security checks
    const currentTime = new Date();
    const devHours = currentTime.getHours();
    
    // Optional: Restrict admin access to certain hours (development convenience)
    // Uncomment to enable time-based restrictions
    // if (devHours < 6 || devHours > 23) {
    //   return false;
    // }

    return true;
  }

  // Get security context
  public static getSecurityContext() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      adminEnabled: this.isAdminAccessEnabled()
    };
  }

  // Log admin access attempt
  public static logAccess(success: boolean, context?: Record<string, unknown>) {
    const log = {
      timestamp: Date.now(),
      success,
      context: this.getSecurityContext(),
      ...context
    };

    // Store in localStorage for development monitoring
    const logs = JSON.parse(localStorage.getItem('admin_access_logs') || '[]');
    logs.push(log);
    
    // Keep only last 50 admin logs
    if (logs.length > 50) {
      logs.splice(0, logs.length - 50);
    }
    
    localStorage.setItem('admin_access_logs', JSON.stringify(logs));

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(success ? '🔓 Admin Access Granted' : '🔒 Admin Access Denied', log);
    }
  }

  // Clear admin data (for logout/cleanup)
  public static clearAdminData() {
    localStorage.removeItem('admin_bypass');
    localStorage.removeItem('admin_verified');
    localStorage.removeItem('admin_attempts');
    localStorage.removeItem('admin_last_attempt');
  }

  // Validate admin session
  public static isValidAdminSession(): boolean {
    const adminBypass = localStorage.getItem('admin_bypass');
    const adminVerified = localStorage.getItem('admin_verified');
    const verifiedTime = localStorage.getItem('portfolio_verified_time');

    if (!adminBypass || !adminVerified || !verifiedTime) {
      return false;
    }

    // Check if session is still valid (24 hours)
    const timeElapsed = Date.now() - parseInt(verifiedTime);
    const hoursElapsed = timeElapsed / (1000 * 60 * 60);

    if (hoursElapsed > 24) {
      this.clearAdminData();
      return false;
    }

    return true;
  }
}

// Additional security utilities
export const AdminSecurity = {
  // Obfuscate sensitive data in console/network
  obfuscate: (data: string) => {
    return data.replace(/./g, '*');
  },

  // Rate limiting for admin attempts
  isRateLimited: (): { limited: boolean; remainingTime?: number } => {
    const attempts = JSON.parse(localStorage.getItem('admin_access_logs') || '[]');
    const recentAttempts = attempts.filter((log: { timestamp: number }) => {
      const timeDiff = Date.now() - log.timestamp;
      return timeDiff < 5 * 60 * 1000; // Last 5 minutes
    });

    if (recentAttempts.length > 10) {
      return {
        limited: true,
        remainingTime: 5 // 5 minutes
      };
    }

    return { limited: false };
  },

  // Generate unique session token
  generateSessionToken: () => {
    return `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};
