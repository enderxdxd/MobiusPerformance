'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from '@/types/car';
import { Stage } from '@/types/stage';
import { StageSelector } from '@/components/tuning-stages/StageSelector';
import { CarSelector } from '@/components/tuning-stages/CarSelector';
import { PowerComparison } from '@/components/tuning-stages/PowerComparison';
import { StageDetails } from '@/components/tuning-stages/StageDetails';
import { getStageById } from '@/data/stages';

export default function TuningStagesPage() {
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const currentStage = getStageById(selectedStage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tuning <span className="gradient-text">Stages</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Descubra o potencial completo do seu veículo com nossos stages de tuning personalizados
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stage Selection */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Escolha seu Stage de Tuning
            </h2>
            <StageSelector
              selectedStage={selectedStage}
              onStageSelect={setSelectedStage}
            />
          </motion.div>
        </section>

        {/* Car Selection */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Selecione seu Veículo
            </h2>
            <CarSelector
              selectedCar={selectedCar}
              onCarSelect={setSelectedCar}
            />
          </motion.div>
        </section>

        {/* Results Section */}
        {selectedCar && currentStage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Power Comparison */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Ganhos de Performance
              </h2>
              <PowerComparison car={selectedCar} stage={currentStage} />
            </section>

            {/* Stage Details */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Detalhes do {currentStage.name}
              </h2>
              <StageDetails stage={currentStage} />
            </section>

            {/* CTA Section */}
            <section className="text-center py-12">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Pronto para o Upgrade?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Entre em contato conosco para agendar uma consulta e começar a transformação 
                  do seu {selectedCar.brand} {selectedCar.model}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                    Solicitar Orçamento
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                    Agendar Consulta
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Instructions */}
        {!selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-blue-50 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Como funciona?
              </h3>
              <div className="space-y-3 text-blue-800">
                <p>1. Escolha o stage de tuning desejado</p>
                <p>2. Selecione seu veículo na lista</p>
                <p>3. Veja os ganhos de performance estimados</p>
                <p>4. Solicite um orçamento personalizado</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
