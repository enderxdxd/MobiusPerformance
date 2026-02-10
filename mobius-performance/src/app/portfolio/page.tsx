'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'BMW M3 F80 - Stage 2',
    description: 'Reprogramação ECU + Downpipe + Intercooler',
    beforePower: '431cv',
    afterPower: '580cv',
    gain: '+149cv',
    image: '/api/placeholder/600/400',
    category: 'ECU Tuning'
  },
  {
    id: 2,
    title: 'Audi RS3 - Full Build',
    description: 'Preparação completa com turbo maior',
    beforePower: '400cv',
    afterPower: '650cv',
    gain: '+250cv',
    image: '/api/placeholder/600/400',
    category: 'Engine Build'
  },
  {
    id: 3,
    title: 'Golf GTI Mk7 - Stage 1',
    description: 'Reprogramação ECU otimizada',
    beforePower: '230cv',
    afterPower: '300cv',
    gain: '+70cv',
    image: '/api/placeholder/600/400',
    category: 'ECU Tuning'
  },
  {
    id: 4,
    title: 'Porsche 911 Turbo - Upgrade',
    description: 'Otimização de turbo e intercooler',
    beforePower: '540cv',
    afterPower: '720cv',
    gain: '+180cv',
    image: '/api/placeholder/600/400',
    category: 'Turbo'
  },
  {
    id: 5,
    title: 'Mercedes C63 AMG - Exhaust',
    description: 'Sistema de escape performance completo',
    beforePower: '476cv',
    afterPower: '510cv',
    gain: '+34cv',
    image: '/api/placeholder/600/400',
    category: 'Exhaust'
  },
  {
    id: 6,
    title: 'Civic Type R - Suspension',
    description: 'Coilovers + setup de pista',
    beforePower: '320cv',
    afterPower: '320cv',
    gain: 'Handling',
    image: '/api/placeholder/600/400',
    category: 'Suspension'
  }
];

const stats = [
  { number: '500+', label: 'Projetos Concluídos' },
  { number: '98%', label: 'Satisfação dos Clientes' },
  { number: '15+', label: 'Anos de Experiência' },
  { number: '50+', label: 'Marcas Atendidas' }
];

export default function PortfolioPage() {
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
              Nosso <span className="text-red-500">Portfólio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Conheça alguns dos projetos que transformamos, desde preparações básicas 
              até builds completos de alta performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <Award className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Imagem do Projeto</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Antes</div>
                      <div className="font-bold text-white">{project.beforePower}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Depois</div>
                      <div className="font-bold text-green-400">{project.afterPower}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Ganho</div>
                      <div className="font-bold text-red-400">{project.gain}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-red-400 font-medium group-hover:text-red-300 transition-colors text-sm">
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
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
              Seu Projeto Pode ser o Próximo
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Entre em contato e vamos discutir como transformar seu veículo.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              Iniciar Meu Projeto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
