'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Mobile Design
  if (isMobile) {
    return (
      <section 
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black"
        aria-label="Hero Section"
      >
        {/* Banner Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/banner-completo1.png"
            alt="VW Golf GTI Tuning"
            fill
            className="object-cover object-center"
            quality={90}
            priority
            sizes="100vw"
          />
          
          {/* Overlays para contraste */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </motion.div>

        {/* Logo Central - Topo Mobile */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
          <img 
            src="/LogoMobiusEscritaBranca.png" 
            alt="Mobius Performance" 
            className="h-8 w-auto"
          />
        </div>

        {/* Content Mobile */}
        <div className="relative z-20 w-full px-4 h-full flex items-center justify-center">
          <div className="max-w-sm w-full text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Main Title Mobile */}
              <motion.div variants={itemVariants}>
                <h1 className="font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  <span className="block text-2xl mb-1">
                    Stock?
                  </span>
                  <span className="block text-3xl text-red-600 mb-1 font-black">
                    never heard of
                  </span>
                  <span className="block text-2xl text-red-600 font-black">
                    her
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle Mobile */}
              <motion.p 
                variants={itemVariants} 
                className="text-xs text-gray-200/90 leading-relaxed pt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              >
                Especialistas em reprogramação ECU, preparação de motores e tuning completo 
                com tecnologia de ponta e resultados comprovados.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-10" />
      </section>
    );
  }

  // Desktop Design
  return (
    <section 
      className="relative min-h-[100vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-black lg:pl-64"
      aria-label="Hero Section"
    >
      {/* Banner Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/banner-completo1.png"
          alt="VW Golf GTI Tuning"
          fill
          className="object-cover object-right"
          quality={90}
          priority
          sizes="100vw"
        />
        
        {/* Overlays para contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </motion.div>

<<<<<<< Updated upstream
      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
        <div className="max-w-2xl w-full py-20 sm:py-0">
=======
      {/* Logo Premium - Canto Superior Direito */}
      <HeroLogo className="absolute top-8 right-8 z-30 hidden lg:block" />

      {/* Logo Central - Topo Desktop */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <img 
          src="/LogoMobiusEscritaBranca.png" 
          alt="Mobius Performance" 
          className="h-12 w-auto"
        />
      </div>

      {/* Content Desktop */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center lg:justify-start">
        <div className="max-w-2xl w-full py-20 lg:py-0">
>>>>>>> Stashed changes
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Main Title Desktop */}
            <motion.div variants={itemVariants}>
              <h1 className="font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <span className="block text-4xl lg:text-5xl xl:text-6xl mb-1">
                  Stock?
                </span>
                <span className="block text-5xl lg:text-6xl xl:text-7xl text-red-600 mb-1 font-black">
                  never heard of
                </span>
                <span className="block text-4xl lg:text-5xl xl:text-6xl text-red-600 font-black">
                  her
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Desktop */}
            <motion.p 
              variants={itemVariants} 
              className="text-base lg:text-lg text-gray-200/90 leading-relaxed max-w-xl pt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
            >
              Especialistas em reprogramação ECU, preparação de motores e tuning completo 
              com tecnologia de ponta e resultados comprovados.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};