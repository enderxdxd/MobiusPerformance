'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

const brands = [
  { id: 'bmw', name: 'BMW', logo: '/logos/bmw.webp' },
  { id: 'mercedes', name: 'Mercedes-Benz', logo: '/logos/meca.webp' },
  { id: 'audi', name: 'Audi', logo: '/logos/audi.webp' },
  { id: 'porsche', name: 'Porsche', logo: '/logos/porsche.webp' },
  { id: 'lamborghini', name: 'Lamborghini', logo: '/logos/lambo.webp' },
  { id: 'chevrolet', name: 'Chevrolet', logo: '/logos/chevy.jpg' },
  { id: 'volkswagen', name: 'Volkswagen', logo: '/logos/volks.png' },
  // Marcas sem logo ainda - usando emojis temporariamente
  
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display"
          >
            Selecione a sua marca
          </motion.h2>
        </div>

        {/* Brand Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className={`group relative p-8 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
                selectedBrand === brand.id ? 'shadow-lg border-red-500 bg-red-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="h-16 mb-4 flex items-center justify-center">
                  {brand.logo.startsWith('/') ? (
                    <img 
                      src="/LogoMobiusEscritaBranca.png"
                      alt={`Logo Mobius Performance`}
                      className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105 filter grayscale"
                      style={{ maxHeight: '60px', maxWidth: '100px' }}
                    />
                  ) : (
                    <div className="text-4xl">{brand.logo}</div>
                  )}
                </div>
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

      </div>
    </section>
  );
};