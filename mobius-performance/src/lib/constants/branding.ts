export const BRANDING = {
  // Configurações das logos
  logos: {
    main: {
      src: '/mobius-logo-main.jpg',
      alt: 'Mobius Motorsports - Logo Principal',
      sizes: {
        sm: { width: 120, height: 32 },
        md: { width: 160, height: 48 },
        lg: { width: 200, height: 64 },
        xl: { width: 240, height: 96 }
      }
    },
    premium: {
      src: '/mobius-logo-premium.jpg',
      alt: 'Mobius Motorsports - Logo Premium',
      sizes: {
        sm: { width: 180, height: 60 },
        md: { width: 240, height: 80 },
        lg: { width: 300, height: 100 },
        xl: { width: 360, height: 120 }
      }
    }
  },

  // Configurações de favicon
  favicon: {
    ico: '/favicon.ico',
    png16: '/favicon-16x16.png',
    png32: '/favicon-32x32.png',
    appleTouchIcon: '/apple-touch-icon.png',
    androidChrome192: '/android-chrome-192x192.png',
    androidChrome512: '/android-chrome-512x512.png'
  },

  // Informações da marca
  brand: {
    name: 'Mobius Motorsports',
    shortName: 'Mobius',
    tagline: 'Performance sem limites',
    description: 'Especialistas em reprogramação ECU, preparação de motores e tuning completo com tecnologia de ponta e resultados comprovados.',
    
    // Cores da marca
    colors: {
      primary: '#DC2626', // red-600
      primaryDark: '#B91C1C', // red-700
      secondary: '#1F2937', // gray-800
      accent: '#F59E0B' // amber-500
    },

    // Redes sociais
    social: {
      instagram: '@mobiusmotorsports',
      facebook: 'MobiusMotorsports',
      youtube: 'MobiusMotorsports',
      whatsapp: '+5511999999999'
    }
  },

  // Configurações responsivas
  responsive: {
    breakpoints: {
      mobile: '(max-width: 768px)',
      tablet: '(min-width: 769px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)'
    },
    
    // Tamanhos de logo por dispositivo
    logoSizes: {
      mobile: 'sm',
      tablet: 'md',
      desktop: 'lg'
    }
  }
} as const;

export type LogoVariant = keyof typeof BRANDING.logos;
export type LogoSize = keyof typeof BRANDING.logos.main.sizes;
