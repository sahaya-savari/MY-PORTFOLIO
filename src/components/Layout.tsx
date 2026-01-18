import React from 'react';
import { Navbar } from './Navbar';
import { ParticleBackground } from './ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticleBackground />
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}