'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Wrench, Wind, Car, Volume2, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 'ecu-tuning',
    title: 'Reprogramação ECU',
    description: 'Otimização completa do mapeamento do motor para máxima performance e eficiência.',
    icon: Zap,
    features: ['Aumento de potência até 30%', 'Melhoria no torque', 'Otimização do consumo', 'Diagnóstico completo'],
    href: '/services/ecu-tuning',
    gradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 'engine-build',
    title: 'Preparação de Motor',
    description: 'Preparação interna completa para suportar altos níveis de potência.',
    icon: Wrench,
    features: ['Pistões forjados', 'Bielas reforçadas', 'Comando de válvulas', 'Balanceamento dinâmico'],
    href: '/services/engine-build',
    gradient: 'from-red-600 to-red-800'
  },
  {
    id: 'forced-induction',
    title: 'Turbo & Supercharger',
    description: 'Instalação e otimização de sistemas de indução forçada.',
    icon: Wind,
    features: ['Turbos de alta performance', 'Intercoolers eficientes', 'Piping personalizado', 'Wastegates externas'],
    href: '/services/forced-induction',
    gradient: 'from-green-600 to-green-800'
  },
  {
    id: 'suspension',
    title: 'Suspensão Esportiva',
    description: 'Sistemas de suspensão para melhor handling e performance em pista.',
    icon: Car,
    features: ['Coilovers ajustáveis', 'Barras estabilizadoras', 'Buchas de poliuretano', 'Setup personalizado'],
    href: '/services/suspension',
    gradient: 'from-purple-600 to-purple-800'
  },
  {
    id: 'exhaust',
    title: 'Escapamento Performance',
    description: 'Sistemas de escape otimizados para performance e sonoridade.',
    icon: Volume2,
    features: ['Coletores de alta vazão', 'Catalisadores esportivos', 'Silenciadores performance', 'Som personalizado'],
    href: '/services/exhaust',
    gradient: 'from-orange-600 to-orange-800'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Nossos <span className="text-red-500">Serviços</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Transformamos seu veículo com tecnologia de ponta e expertise comprovada. 
              Cada serviço é executado com precisão para entregar máxima performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={service.href}>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full hover:border-red-500/50 transition-all duration-300">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center text-red-400 font-medium group-hover:text-red-300 transition-colors">
                        <span>Saiba mais</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600/10 to-red-800/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para Transformar seu Carro?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Entre em contato conosco e descubra como podemos elevar a performance do seu veículo.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
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
