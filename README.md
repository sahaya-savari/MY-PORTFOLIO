# 🌟 Sahaya Savari F - Portfolio Website

A modern, responsive portfolio website built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features advanced security systems, CAPTCHA integration, and comprehensive copyright protection.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Build Status](https://img.shields.io/badge/Build-Passing-success)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)

## ✨ Features

### 🎨 **Modern Design**

- Responsive layout optimized for all devices
- Dark/Light theme support with smooth transitions
- Glass-morphism UI effects and particle backgrounds
- Smooth scroll animations and hover effects

### 🔒 **Advanced Security**

- **Entry Gate CAPTCHA**: Google reCAPTCHA v2 verification before site access
- **Admin Security System**: Secure bypass with attempt limiting and session management
- **Copyright Protection**: Comprehensive protection against content copying
- **Rate Limiting**: Multiple layers of security with automatic blocking

### 🚀 **Performance Optimized**

- **Lazy Loading**: Optimized image and component loading
- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Eliminates unused code from bundles
- **Image Optimization**: Compressed assets for faster loading

### 📱 **Interactive Components**

- **Contact Form**: reCAPTCHA-protected contact system
- **Resume Download**: Direct PDF download functionality
- **Social Links**: Direct links to GitHub, LinkedIn, and social profiles
- **Project Showcase**: Interactive project cards with GitHub integration

## 🛠️ Technology Stack

### **Frontend**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite 5.4** - Ultra-fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

### **UI Components**

- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful, customizable icons
- **React Hook Form** - Performant forms with easy validation

### **Security & Integrations**

- **Google reCAPTCHA v2** - Bot protection for forms
- **Custom Security System** - Multi-layer authentication
- **Environment Management** - Secure configuration handling

## 🏗️ Project Structure

```
MY-PORTFOLIO/
├── 📁 public/                    # Public assets & static files
│   ├── 📄 SAHAYASAVARI_FINAL_RESUME.pdf
│   ├── 🎮 mario-404.css         # Mario 404 page styles
│   ├── 🎮 mario-404.js          # Mario 404 page scripts
│   ├── 🖼️ lovable-uploads/       # Image assets
│   ├── 🌐 robots.txt
│   └── 🔖 favicon.ico
├── 📁 src/                       # Source code
│   ├── 📁 components/            # React components
│   │   ├── 📁 ui/               # Reusable UI components
│   │   │   ├── button.tsx       # Button component
│   │   │   ├── card.tsx         # Card component
│   │   │   ├── animated-toggle.tsx # Theme toggle
│   │   │   └── ... (40+ UI components)
│   │   ├── AdminBypass.tsx      # Admin authentication
│   │   ├── CopyrightProtection.tsx # Copyright system
│   │   ├── EntryGate.tsx        # Security entry point
│   │   ├── Layout.tsx           # App layout wrapper
│   │   ├── Navbar.tsx           # Navigation component
│   │   ├── ParticleBackground.tsx # Background effects
│   │   └── Scene3D.tsx          # 3D scene component
│   ├── 📁 pages/                # Application pages
│   │   ├── NotFound.tsx         # 404 page (Mario themed)
│   │   └── PortfolioHome.tsx    # Main portfolio page
│   ├── 📁 contexts/             # React contexts
│   │   └── ThemeContext.tsx     # Theme management
│   ├── 📁 hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   └── use-toast.ts         # Toast notifications
│   ├── 📁 lib/                  # Utility libraries
│   │   └── utils.ts             # Common utilities
│   ├── 📁 utils/                # Security & utility functions
│   │   ├── security.ts          # Security utilities
│   │   └── secureAdmin.ts       # Admin security system
│   ├── 📁 assets/               # Images, fonts, static resources
│   │   ├── SAHAYASAVARI F.jpg   # Profile image
│   │   └── SAHAYASAVARI FINAL RESUME.pdf
│   ├── App.tsx                  # Main App component
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts           # TypeScript definitions
├── 📁 .github/                  # GitHub workflows & templates
├── 📁 docs/                     # Documentation files
│   ├── COPYRIGHT_PROTECTION.md  # Copyright guidelines
│   ├── DEPLOYMENT-GUIDE.md      # Deployment instructions
│   ├── EMAIL_TEMPLATES.md       # Contact templates
│   └── SECURITY-DOCUMENTATION.md # Security docs
├── ⚙️ Configuration Files
│   ├── package.json             # Dependencies & scripts
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.ts      # Tailwind CSS config
│   ├── tsconfig.json           # TypeScript config
│   ├── eslint.config.js        # ESLint configuration
│   ├── postcss.config.js       # PostCSS config
│   ├── components.json         # UI components config
│   └── firebase.json           # Firebase config
├── 🔐 Environment Files
│   ├── .env.local              # Development environment
│   ├── .env.production         # Production environment
│   └── .env.example            # Environment template
└── 📋 Project Files
    ├── README.md               # Project documentation
    ├── LICENSE                 # MIT License
    ├── .gitignore             # Git ignore rules
    └── verify-deployment.js    # Deployment verification
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/sahaya-savari/MY-PORTFOLIO.git
cd MY-PORTFOLIO

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build

# Building
npm run build            # Build for production
npm run build:prod       # Optimized production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run type-check       # TypeScript type checking

# Deployment
npm run deploy:firebase  # Deploy to Firebase
npm run deploy:netlify   # Deploy to Netlify

# Utilities
npm run clean            # Clean build cache
npm run analyze          # Analyze bundle size
```

## 🔧 Configuration

```bash
VITE_RECAPTCHA_SITE_KEY=your_development_site_key
```

```bash
VITE_RECAPTCHA_SITE_KEY=your_production_site_key
```

### reCAPTCHA Setup

1. Visit [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin/)
2. Create a new site with reCAPTCHA v2
3. Add your domains (localhost for dev, production domain)
4. Copy the site key to your environment files

## 🌐 Deployment

### Automated Deployment

```bash
# Verify deployment readiness
node verify-deployment.js

# Build for production
npm run build:prod

# Deploy to your chosen platform
npm run deploy:firebase  # or deploy:netlify
```

### Supported Platforms

- **Firebase Hosting** ⭐ (Recommended)
- **Netlify**
- **Vercel**
- **GitHub Pages**

📖 **Complete deployment guide available in [docs/DEPLOYMENT-GUIDE.md](./docs/DEPLOYMENT-GUIDE.md)**

## 🔒 Security Features

### Entry Gate System

- CAPTCHA verification required for site access
- Blocks automated bots and unwanted traffic
- Session-based access management

### Admin Security

- Secure admin bypass for development
- Rate limiting with automatic blocking
- Session token validation
- Development-only visibility

### Copyright Protection

- Comprehensive content protection
- Right-click context menu disabling
- Copy/paste prevention
- Developer tools monitoring

📋 **Detailed security documentation in [docs/SECURITY-DOCUMENTATION.md](./docs/SECURITY-DOCUMENTATION.md)**

## 📊 Performance

### Build Stats

- **Bundle Size**: 459.23 kB (gzipped: 145.38 kB)
- **Build Time**: ~4-6 seconds
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

### Optimization Features

- Automatic code splitting
- Image compression and lazy loading
- CSS purging and minification
- Tree-shaking for unused code elimination

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Customization

### Personal Information

Update the following files with your information:

- `src/pages/PortfolioHome.tsx` - Personal details, projects, skills
- `src/assets/` - Replace profile image and resume
- `public/` - Update favicon and meta tags

### Styling

- `src/index.css` - Global styles and theme variables
- `tailwind.config.ts` - Tailwind customization
- `src/components/ui/` - Component-specific styling

### Content

- **Profile**: Update name, bio, and image in PortfolioHome.tsx
- **Projects**: Modify the projects array with your work
- **Skills**: Update technical and soft skills lists
- **Contact**: Change contact information and social links

## 🐛 Troubleshooting

### Common Issues

**Build Errors**

```bash
npm run clean && npm install && npm run build
```

**reCAPTCHA Not Working**

- Verify domain in reCAPTCHA console
- Check environment variables
- Ensure HTTPS in production

**Import Errors**

```bash
npm install --save-dev @types/react @types/react-dom
```

## 📞 Support

If you encounter any issues or have questions:

📧 Email: sahayasavari@gmail.com  
🐙 GitHub: @sahaya-savari  
💼 LinkedIn: sahayasavari

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Radix UI** - For accessible component primitives
- **Vite** - For the blazingly fast build tool

---

**Made with ❤️ by Sahaya Savari F**

⭐ **Star this repository if you found it helpful!**
