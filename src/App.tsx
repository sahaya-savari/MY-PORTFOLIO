import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { EntryGate } from "./components/EntryGate";
import { Layout } from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PortfolioHome } from "./pages/PortfolioHome";

const queryClient = new QueryClient();

const App = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user was previously verified (within last 24 hours)
    const verified = localStorage.getItem('portfolio_verified');
    const verifiedTime = localStorage.getItem('portfolio_verified_time');
    
    if (verified && verifiedTime) {
      const timeElapsed = Date.now() - parseInt(verifiedTime);
      const hoursElapsed = timeElapsed / (1000 * 60 * 60);
      
      // Verification expires after 24 hours
      if (hoursElapsed < 24) {
        setIsVerified(true);
      } else {
        // Clear expired verification
        localStorage.removeItem('portfolio_verified');
        localStorage.removeItem('portfolio_verified_time');
      }
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!isVerified ? (
            <EntryGate onVerified={handleVerified} />
          ) : (
            <Layout>
              <PortfolioHome />
            </Layout>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;