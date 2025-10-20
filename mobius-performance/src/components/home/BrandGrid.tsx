'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

const brands = [
  { id: 'bmw', name: 'BMW', logo: '🚗' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '⭐' },
  { id: 'audi', name: 'Audi', logo: '🔷' },
  { id: 'porsche', name: 'Porsche', logo: '🏎️' },
  { id: 'ferrari', name: 'Ferrari', logo: '🐎' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '🐂' },
  { id: 'mclaren', name: 'McLaren', logo: '🟠' },
  { id: 'bentley', name: 'Bentley', logo: '🦅' },
  { id: 'rollsroyce', name: 'Rolls-Royce', logo: '👑' },
  { id: 'astonmartin', name: 'Aston Martin', logo: '🦅' },
  { id: 'landrover', name: 'Land Rover', logo: '🏔️' },
  { id: 'range', name: 'Range Rover', logo: '⛰️' },
];

export const BrandGrid: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
      },
    },
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Trabalhamos com as principais marcas premium do mercado automotivo
          </motion.p>
        </div>

        {/* Brand Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-6xl mx-auto"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className={`relative p-6 bg-gray-900 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:border-red-500 ${
                selectedBrand === brand.id ? 'bg-red-900/20 border-red-500' : 'border-gray-700'
              }`}
              onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">
                  {brand.logo}
                </div>
                <h3 className="font-semibold text-white text-sm uppercase tracking-wider font-display">
                  {brand.name}
                </h3>
              </div>
              
              {/* Selection indicator */}
              {selectedBrand === brand.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Brand Info */}
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="bg-gray-900 border border-red-600 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                {brands.find(b => b.id === selectedBrand)?.name}
              </h3>
              <p className="text-gray-300 mb-6">
                Especialistas em tuning para {brands.find(b => b.id === selectedBrand)?.name}. 
                Oferecemos serviços completos de reprogramação ECU, preparação de motor e upgrades de performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-professional">
                  <span>Ver Modelos</span>
                  <Car className="w-4 h-4 ml-2" />
                </button>
                <button className="px-6 py-3 border border-red-600 rounded-lg text-white font-medium hover:bg-red-600 transition-colors">
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};