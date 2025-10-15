'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Wrench, Target } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Excelência',
    description: 'Buscamos sempre a perfeição em cada projeto, utilizando as melhores práticas e tecnologias disponíveis.'
  },
  {
    icon: Users,
    title: 'Confiança',
    description: 'Construímos relacionamentos duradouros baseados na transparência e resultados consistentes.'
  },
  {
    icon: Wrench,
    title: 'Inovação',
    description: 'Estamos sempre atualizados com as últimas tecnologias e tendências do mercado automotivo.'
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Cada serviço é executado com o mais alto padrão de qualidade e atenção aos detalhes.'
  }
];

const team = [
  {
    name: 'Carlos Silva',
    role: 'Fundador & CEO',
    experience: '15+ anos',
    specialty: 'Reprogramação ECU'
  },
  {
    name: 'Roberto Santos',
    role: 'Especialista em Motores',
    experience: '12+ anos',
    specialty: 'Preparação Interna'
  },
  {
    name: 'André Costa',
    role: 'Técnico em Eletrônica',
    experience: '8+ anos',
    specialty: 'Diagnóstico Avançado'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Sobre a <span className="text-red-500">Mobius</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Há mais de 15 anos transformando veículos e superando expectativas. 
                Somos especialistas em extrair o máximo potencial de cada motor, 
                sempre priorizando segurança e confiabilidade.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
              >
                Fale Conosco
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-600/20 to-gray-800/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Nossa Missão</h3>
                <p className="text-gray-300 mb-6">
                  Transformar a experiência automotiva através de soluções inovadoras 
                  e personalizadas, sempre respeitando as características únicas de cada veículo.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">500+</div>
                    <div className="text-sm text-gray-400">Projetos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400 mb-1">15+</div>
                    <div className="text-sm text-gray-400">Anos</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Os princípios que guiam nosso trabalho e definem nossa identidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Profissionais experientes e apaixonados por performance automotiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-red-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm mb-2">{member.experience}</p>
                <p className="text-gray-400 text-xs">{member.specialty}</p>
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
              Pronto para Conhecer Nosso Trabalho?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Visite nossa oficina e conheça de perto nossa estrutura e equipe.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              Agendar Visita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
