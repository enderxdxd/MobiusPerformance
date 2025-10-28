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
    href: '/services/ecu-tuning'
  },
  {
    id: 'engine-build',
    title: 'Preparação de Motor',
    description: 'Preparação interna completa para suportar altos níveis de potência.',
    icon: Wrench,
    features: ['Pistões forjados', 'Bielas reforçadas', 'Comando de válvulas', 'Balanceamento dinâmico'],
    href: '/services/engine-build'
  },
  {
    id: 'forced-induction',
    title: 'Turbo & Supercharger',
    description: 'Instalação e otimização de sistemas de indução forçada.',
    icon: Wind,
    features: ['Turbos de alta performance', 'Intercoolers eficientes', 'Piping personalizado', 'Wastegates externas'],
    href: '/services/forced-induction'
  },
  {
    id: 'suspension',
    title: 'Suspensão\nEsportiva',
    description: 'Sistemas de suspensão para melhor handling e performance em pista.',
    icon: Car,
    features: ['Coilovers ajustáveis', 'Barras estabilizadoras', 'Buchas de poliuretano', 'Setup personalizado'],
    href: '/services/suspension'
  },
  {
    id: 'exhaust',
    title: 'Escapamento Performance',
    description: 'Sistemas de escape otimizados para performance e sonoridade.',
    icon: Volume2,
    features: ['Coletores de alta vazão', 'Catalisadores esportivos', 'Silenciadores performance', 'Som personalizado'],
    href: '/services/exhaust'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videoHeroSec.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Nossos <span className="text-red-600">Serviços</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transformamos seu veículo com tecnologia de ponta e expertise comprovada. 
              Cada serviço é executado com precisão para entregar máxima performance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <Link href={service.href}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-red-600 transition-all duration-500">
                      {/* Icon */}
                      <motion.div 
                        className="mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-12 h-12 text-red-600" strokeWidth={1.5} />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors duration-300 whitespace-pre-line">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center text-sm text-gray-700"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + idx * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center text-black font-semibold group-hover:text-red-600 transition-colors duration-300">
                        <span>Saiba mais</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Video Background */}
      <section className="relative py-16 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videoOrcamento.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Pronto para Transformar seu Carro?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Entre em contato conosco e descubra como podemos elevar a performance do seu veículo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Solicitar Orçamento
                <ArrowRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}