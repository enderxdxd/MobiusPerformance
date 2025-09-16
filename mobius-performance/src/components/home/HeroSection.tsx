'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Zap, Settings, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-600/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-300 text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              Especialistas em Performance Automotiva
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transforme Seu
              <br />
              <span className="gradient-text">
                Carro em uma
              </span>
              <br />
              Máquina de Performance
            </h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Reprogramação ECU, preparação de motores e tuning completo com 
              tecnologia de ponta e resultados comprovados.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                500+
              </div>
              <div className="text-gray-300">Carros Tunados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                +40%
              </div>
              <div className="text-gray-300">Ganho Médio de Potência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                5 Anos
              </div>
              <div className="text-gray-300">de Garantia</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/tuning-stages">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg glow-hover"
                icon={<Zap className="w-5 h-5" />}
              >
                Descobrir Stages
              </Button>
            </Link>
            
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
                icon={<Play className="w-5 h-5" />}
              >
                Ver Portfólio
              </Button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2 text-white/60">
              <span className="text-sm">Role para descobrir</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 z-20 hidden lg:block">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
          }}
          className="w-20 h-20 border-2 border-primary-400/30 rounded-full flex items-center justify-center"
        >
          <Settings className="w-8 h-8 text-primary-400" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-10 z-20 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
          }}
          className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center"
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </section>
  );
};
