import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { SecurityUtils } from '../utils/security';
import { SecureAdmin, AdminSecurity } from '../utils/secureAdmin';

interface AdminBypassProps {
  onBypass: () => void;
}

export const AdminBypass: React.FC<AdminBypassProps> = ({ onBypass }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    // Check if admin access is enabled
    if (!SecureAdmin.isAdminAccessEnabled()) {
      setShowAdminPanel(false);
      return;
    }

    // Check rate limiting
    const rateLimitCheck = AdminSecurity.isRateLimited();
    if (rateLimitCheck.limited) {
      setIsBlocked(true);
      setError(`Too many attempts. Try again in ${rateLimitCheck.remainingTime} minutes.`);
      return;
    }

    // Check admin attempts on mount
    const adminAttempts = parseInt(localStorage.getItem('admin_attempts') || '0');
    const lastAttempt = localStorage.getItem('admin_last_attempt');
    
    if (adminAttempts >= MAX_ATTEMPTS && lastAttempt) {
      const timeElapsed = Date.now() - parseInt(lastAttempt);
      const blockDuration = 30 * 60 * 1000; // 30 minutes block for admin attempts
      
      if (timeElapsed < blockDuration) {
        setIsBlocked(true);
        setAttempts(adminAttempts);
      } else {
        // Reset after block period
        localStorage.removeItem('admin_attempts');
        localStorage.removeItem('admin_last_attempt');
      }
    } else {
      setAttempts(adminAttempts);
    }

    setShowAdminPanel(true);
  }, []);

  const handleBypass = () => {
    if (isBlocked) {
      setError('Admin access blocked. Too many failed attempts.');
      return;
    }

    // Use secure password verification
    if (SecureAdmin.verifyPassword(password)) {
      // Successful admin login
      const sessionToken = AdminSecurity.generateSessionToken();
      
      SecurityUtils.clearFailedAttempts();
      SecurityUtils.logAccess('success', 'admin');
      SecureAdmin.logAccess(true, { sessionToken });
      
      localStorage.setItem('portfolio_verified', 'true');
      localStorage.setItem('portfolio_verified_time', Date.now().toString());
      localStorage.setItem('admin_bypass', 'true');
      localStorage.setItem('admin_verified', 'true');
      localStorage.setItem('admin_session', sessionToken);
      
      // Clear admin attempts
      localStorage.removeItem('admin_attempts');
      localStorage.removeItem('admin_last_attempt');
      
      onBypass();
    } else {
      // Failed admin attempt
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      localStorage.setItem('admin_attempts', newAttempts.toString());
      localStorage.setItem('admin_last_attempt', Date.now().toString());
      
      SecurityUtils.logAccess('failure', 'admin');
      SecureAdmin.logAccess(false, { attempts: newAttempts });
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true);
        setError(`Admin access blocked for 30 minutes. Failed attempts: ${newAttempts}`);
      } else {
        setError(`Invalid password. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`);
      }
      
      setPassword(''); // Clear password on failure
      setTimeout(() => setError(''), 5000);
    }
  };  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isBlocked) {
      handleBypass();
    }
  };

  // Don't show admin panel in production or if not development
  if (!showAdminPanel) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Card className="glass-card w-80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            {isBlocked ? 'Admin Blocked' : 'Admin Access'}
          </CardTitle>
          <CardDescription className="text-xs">
            {isBlocked 
              ? 'Too many failed attempts. Access blocked.' 
              : `Development access (${MAX_ATTEMPTS - attempts} attempts left)`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={isBlocked ? 'Access blocked' : 'Enter admin password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isBlocked}
                className="pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isBlocked}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button onClick={handleBypass} size="sm" disabled={isBlocked}>
              {isBlocked ? 'Blocked' : 'Enter'}
            </Button>
          </div>
          {error && (
            <p className="text-xs text-red-500 mt-2 font-medium">{error}</p>
          )}
          {!isBlocked && (
            <p className="text-xs text-muted-foreground mt-2">
              Secure admin access for development only
            </p>
          )}
          {isBlocked && (
            <p className="text-xs text-orange-500 mt-2">
              ⚠️ Admin access blocked for 30 minutes due to failed attempts
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
