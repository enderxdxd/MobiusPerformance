'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, Cog, Zap, Shield, ArrowRight } from 'lucide-react';

export default function EngineBuildPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-red-400 font-medium">Preparação de Motor</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Preparação <span className="text-red-500">Interna</span> Completa
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Preparamos seu motor internamente para suportar altos níveis de potência 
              com segurança e confiabilidade máxima.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cog, title: 'Pistões Forjados', desc: 'Resistência para alta compressão' },
              { icon: Zap, title: 'Bielas Reforçadas', desc: 'Suporte para altas rotações' },
              { icon: Shield, title: 'Comando Esportivo', desc: 'Melhor respiração do motor' },
              { icon: Wrench, title: 'Balanceamento', desc: 'Suavidade e durabilidade' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
