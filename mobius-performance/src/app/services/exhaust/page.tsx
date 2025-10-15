'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, ArrowRight } from 'lucide-react';

export default function ExhaustPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-800 rounded-lg flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-orange-400 font-medium">Escapamento Performance</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Escapamento <span className="text-orange-500">Performance</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Sistemas de escape otimizados para máxima vazão, 
              performance e sonoridade esportiva personalizada.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
