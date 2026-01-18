import { forwardRef, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  sitekey?: string;
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
}

// Check if we're in development mode
const isDevMode = () => {
  return import.meta.env.DEV || 
         window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('localhost');
};

export const Captcha = forwardRef<ReCAPTCHA, CaptchaProps>(
  ({ sitekey, onChange, onExpired, onError }, ref) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isDev, setIsDev] = useState(false);

    useEffect(() => {
      setIsDev(isDevMode());
      
      // Check for dark mode
      const isDark = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');

      // Listen for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });

      return () => observer.disconnect();
    }, []);

    // In dev mode, we still expose the ref but let the real component handle validation
    useEffect(() => {
      if (isDev && !ref) {
        console.log('reCAPTCHA is in Dev Mode - Ensure localhost is whitelisted in Google Console');
      }
    }, [isDev, ref]);

    return (
      <div className="flex justify-center min-h-[78px]">
        {sitekey ? (
          <ReCAPTCHA
            ref={ref}
            sitekey={sitekey}
            theme={theme}
            size="normal"
            onChange={onChange}
            onExpired={onExpired}
            onError={onError}
          />
        ) : (
          <div className="text-red-500 text-xs text-center border border-red-500/20 rounded p-2 bg-red-500/5">
            reCAPTCHA Site Key Missing
          </div>
        )}
      </div>
    );
  }
);

Captcha.displayName = 'Captcha';
