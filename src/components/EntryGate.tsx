import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SecurityUtils } from '../utils/security';
import { AdminBypass } from './AdminBypass';
import { Button } from './ui/button';
import { Captcha } from './ui/captcha';

interface EntryGateProps {
  onVerified: () => void;
}

export const EntryGate: React.FC<EntryGateProps> = ({ onVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error' | 'blocked'>('idle');
  const [blockInfo, setBlockInfo] = useState<{ blocked: boolean; timeLeft?: number }>({ blocked: false });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Check if user is blocked on component mount
    const blockStatus = SecurityUtils.isBlocked();
    setBlockInfo(blockStatus);
    if (blockStatus.blocked) {
      setVerificationStatus('blocked');
    }
  }, []);

  const handleVerification = async () => {
    // Check if blocked
    const blockStatus = SecurityUtils.isBlocked();
    if (blockStatus.blocked) {
      setBlockInfo(blockStatus);
      setVerificationStatus('blocked');
      return;
    }

    const captchaValue = recaptchaRef.current?.getValue();
    
    if (!captchaValue) {
      SecurityUtils.trackFailedAttempt();
      SecurityUtils.logAccess('failure', 'captcha');
      setVerificationStatus('error');
      setTimeout(() => setVerificationStatus('idle'), 3000);
      return;
    }

    setIsVerifying(true);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear any failed attempts
      SecurityUtils.clearFailedAttempts();
      SecurityUtils.logAccess('success', 'captcha');
      
      setVerificationStatus('success');
      
      // Store verification in localStorage to remember user
      localStorage.setItem('portfolio_verified', 'true');
      localStorage.setItem('portfolio_verified_time', Date.now().toString());
      
      // Wait a moment to show success, then grant access
      setTimeout(() => {
        onVerified();
      }, 1000);
      
    } catch (error) {
      SecurityUtils.trackFailedAttempt();
      SecurityUtils.logAccess('failure', 'captcha');
      setVerificationStatus('error');
      setTimeout(() => setVerificationStatus('idle'), 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden p-4">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-blue-600/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
      
      {/* Admin Bypass (Development Only) */}
      {process.env.NODE_ENV === 'development' && import.meta.env.DEV && (
        <AdminBypass onBypass={onVerified} />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-card border border-white/5 bg-black/40 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          {/* Subtle glow effect */}
          <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-2xl transition-opacity duration-1000"></div>
          
          <div className="relative text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
              className="mx-auto mb-8 w-24 h-24 bg-gradient-to-tr from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] cursor-default"
            >
              <span className="text-4xl font-black text-white tracking-tighter">SS</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                Secure Access
              </h1>
              <p className="text-zinc-400 text-lg mb-8">
                Welcome to Sahaya Savari F's Portfolio
              </p>
            </motion.div>

            <div className="space-y-8">
              <div className="flex flex-col items-center">
                <Captcha
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY!}
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {verificationStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center text-emerald-400"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium uppercase tracking-widest">Identity Verified</span>
                  </motion.div>
                )}

                {verificationStatus === 'blocked' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center text-amber-500"
                  >
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      Cooldown: {blockInfo.timeLeft}m remaining
                    </span>
                  </motion.div>
                )}

                {verificationStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center text-red-500"
                  >
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Please verify you are a human</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: verificationStatus === 'success' ? 1 : 1.02 }}
                whileTap={{ scale: verificationStatus === 'success' ? 1 : 0.98 }}
              >
                <Button
                  onClick={handleVerification}
                  disabled={isVerifying || verificationStatus === 'success' || verificationStatus === 'blocked'}
                  className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-3"></div>
                      Authenticating...
                    </div>
                  ) : verificationStatus === 'success' ? (
                    "Authenticated"
                  ) : (
                    "Enter Portfolio"
                  )}
                </Button>
              </motion.div>
            </div>

            <div className="mt-10 border-t border-white/5 pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold">
                © {new Date().getFullYear()} Sahaya Savari F • Protected Content
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
