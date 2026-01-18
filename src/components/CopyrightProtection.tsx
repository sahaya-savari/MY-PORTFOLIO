import React from 'react';

export const CopyrightProtection: React.FC = () => {
  // Hidden copyright signature - visible in developer tools but not on page
  const copyrightSignature = {
    owner: "Sahaya Savari F",
    created: "2025-01-15",
    original: "https://sahayasavari.web.app",
    signature: "SS2025-PORTFOLIO-ORIGINAL-7f4a9b2c",
    warning: "This portfolio is copyrighted. Unauthorized copying is prohibited."
  };

  return (
    <>
      {/* Hidden copyright metadata */}
      <div 
        className="hidden" 
        data-copyright={JSON.stringify(copyrightSignature)}
        data-original-author="Sahaya Savari F"
        data-creation-date="2025-01-15"
        data-license="All Rights Reserved"
      >
        {/* This comment is visible in source code */}
        {/* 
          ©️ COPYRIGHT NOTICE ©️
          This portfolio belongs to Sahaya Savari F
          Original URL: https://sahayasavari.web.app
          Created: January 2025
          
          ⚠️  WARNING: This website is protected by copyright law.
          Unauthorized copying, reproduction, or distribution is prohibited.
          
          If you're viewing this in copied content, please respect intellectual property rights.
          Contact: sahayasavari@gmail.com
        */}
      </div>
      
      {/* Console warning for developers */}
      <script dangerouslySetInnerHTML={{
        __html: `
          console.log("%c🚨 COPYRIGHT NOTICE 🚨", "color: red; font-size: 20px; font-weight: bold;");
          console.log("%cThis portfolio belongs to Sahaya Savari F", "color: #ff6b6b; font-size: 14px;");
          console.log("%cOriginal: https://sahayasavari.web.app", "color: #4ecdc4; font-size: 12px;");
          console.log("%c⚠️ Unauthorized copying is prohibited by copyright law", "color: orange; font-size: 12px;");
          console.log("%cContact: sahayasavari@gmail.com", "color: #45b7d1; font-size: 12px;");
          
          // Watermark signature
          window.__PORTFOLIO_SIGNATURE__ = {
            owner: "Sahaya Savari F",
            original: "https://sahayasavari.web.app",
            created: "2025-01-15",
            hash: "SS2025-PORTFOLIO-ORIGINAL-7f4a9b2c"
          };
        `
      }} />
    </>
  );
};

export const CopyrightFooter: React.FC = () => {
  return (
    <footer className="bg-background/95 backdrop-blur border-t border-border/50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © <span id="year">{new Date().getFullYear()}</span> Sahaya Savari F. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Original design and content. Unauthorized copying prohibited.
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground/70">
          This portfolio is protected by copyright law. 
          <a 
            href="mailto:sahayasavari@gmail.com?subject=Copyright%20Inquiry" 
            className="hover:text-primary transition-colors ml-1"
          >
            Report violations
          </a>
        </div>
      </div>
    </footer>
  );
};
