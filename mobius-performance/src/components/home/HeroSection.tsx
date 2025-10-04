'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
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

  return (
    <section 
      className="relative min-h-[100vh] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-black"
      aria-label="Hero Section"
    >
      {/* Banner Image com animação suave */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
        <div className="max-w-2xl w-full py-20 sm:py-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-5 lg:space-y-6"
          >
            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h1 className="font-bold text-white leading-[1.2]">
                <span className="block text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  Transforme Seu
                </span>
                <span className="block text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-red-500 mb-2">
                  Carro
                </span>
                <span className="block text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  em uma
                </span>
                <span className="block text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Máquina de Performance
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants} 
              className="text-sm sm:text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed max-w-xl pt-2"
            >
              Especialistas em reprogramação ECU, preparação de motores e tuning completo 
              com tecnologia de ponta e resultados comprovados.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="hidden md:flex absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-label="Scroll para descobrir"
      >
        <div className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer">
          <span className="text-xs uppercase tracking-wider mb-2 font-medium">Role para descobrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};