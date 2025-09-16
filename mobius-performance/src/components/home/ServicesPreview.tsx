'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Zap, 
  Wind, 
  Gauge, 
  Volume2, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const services = [
  {
    id: 'ecu-tuning',
    title: 'Reprogramação ECU',
    description: 'Otimização completa do mapeamento do motor para máxima performance e eficiência.',
    icon: Settings,
    color: 'from-blue-500 to-blue-700',
    features: ['Stage 1, 2, 3 e 4', 'Ganhos até 40%', 'Garantia 5 anos'],
    href: '/services/ecu-tuning',
  },
  {
    id: 'engine-build',
    title: 'Preparação de Motor',
    description: 'Preparação interna completa para suportar altos níveis de potência.',
    icon: Zap,
    color: 'from-red-500 to-red-700',
    features: ['Pistões forjados', 'Bielas H-beam', 'Comando esportivo'],
    href: '/services/engine-build',
  },
  {
    id: 'turbo',
    title: 'Turbo & Supercharger',
    description: 'Instalação e upgrade de sistemas de indução forçada.',
    icon: Wind,
    color: 'from-green-500 to-green-700',
    features: ['Turbos Garrett', 'Intercoolers', 'Blow-off valves'],
    href: '/services/forced-induction',
  },
  {
    id: 'suspension',
    title: 'Suspensão Esportiva',
    description: 'Sistemas de suspensão para melhor handling e performance.',
    icon: Gauge,
    color: 'from-purple-500 to-purple-700',
    features: ['Coilovers', 'Barras estabilizadoras', 'Buchas PU'],
    href: '/services/suspension',
  },
  {
    id: 'exhaust',
    title: 'Escapamento Performance',
    description: 'Sistemas de escape para liberação de potência e som esportivo.',
    icon: Volume2,
    color: 'from-orange-500 to-orange-700',
    features: ['Inox 304', 'Catalisadores esportivos', 'Som personalizado'],
    href: '/services/exhaust',
  },
  {
    id: 'brakes',
    title: 'Freios Esportivos',
    description: 'Sistemas de freio de alta performance para máxima segurança.',
    icon: Shield,
    color: 'from-gray-500 to-gray-700',
    features: ['Discos ventilados', 'Pastilhas cerâmicas', 'Fluido DOT 5.1'],
    href: '/services/brakes',
  },
];

export const ServicesPreview: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nossos <span className="gradient-text">Serviços</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços de tuning e preparação 
              automotiva com tecnologia de ponta e expertise comprovada.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card 
                  hover
                  className="h-full group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href={service.href} className="block pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-primary-600 hover:text-primary-700 hover:bg-primary-50 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Saiba Mais
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para Transformar Seu Carro?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos elevar a 
              performance do seu veículo ao próximo nível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4"
              >
                <Link href="/contact">
                  Solicitar Orçamento
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4"
              >
                <Link href="/portfolio">
                  Ver Trabalhos
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
