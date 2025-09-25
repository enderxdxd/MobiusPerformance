'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, Gauge, Wrench } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { NissanGTRDirect } from '@/components/3d/DirectGLTFTest';

const services = [
  {
    icon: Zap,
    title: 'Reprogramação ECU',
    description: 'Otimização completa da central eletrônica para máxima performance e eficiência.',
    features: ['Stage 1, 2 e 3', 'Ganho de até 40% de potência', 'Economia de combustível']
  },
  {
    icon: Settings,
    title: 'Preparação de Motor',
    description: 'Modificações internas e externas para suportar altos níveis de potência.',
    features: ['Pistões forjados', 'Bielas reforçadas', 'Comando de válvulas']
  },
  {
    icon: Gauge,
    title: 'Tuning Completo',
    description: 'Pacote completo de modificações para transformar seu carro.',
    features: ['Turbo/Supercharger', 'Sistema de escape', 'Suspensão esportiva']
  },
  {
    icon: Wrench,
    title: 'Manutenção Especializada',
    description: 'Serviços especializados em carros preparados e de alta performance.',
    features: ['Diagnóstico avançado', 'Peças originais', 'Garantia estendida']
  }
];

export const ServicesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="text-red-500">Serviços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformamos seu veículo em uma máquina de alta performance com tecnologia de ponta
          </p>
        </motion.div>

        {/* Layout com carro à direita e cards menores à esquerda */}
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Services Grid - Cards menores à esquerda */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 group hover:border-red-200"
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                    <service.icon className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-2">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-3 text-xs leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-500 text-xs flex items-center">
                      <div className="w-1 h-1 bg-red-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Carro 3D - Maior e à direita */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="col-span-12 lg:col-span-7 relative"
          >
            <div className="w-full h-[600px] relative">
              <Canvas 
                camera={{ position: [5, 2.5, 5], fov: 45 }}
                style={{ background: 'transparent' }}
              >
                {/* Iluminação profissional ultra clara */}
                <ambientLight intensity={3.5} color="#ffffff" />
                
                {/* Luz principal - key light */}
                <directionalLight 
                  position={[15, 20, 15]} 
                  intensity={4} 
                  color="#ffffff"
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                
                {/* Luz de preenchimento - fill light */}
                <directionalLight 
                  position={[-12, 15, -12]} 
                  intensity={2.5} 
                  color="#f0f8ff"
                />
                
                {/* Luz de contorno - rim light */}
                <directionalLight 
                  position={[0, 25, -20]} 
                  intensity={2} 
                  color="#ffffff"
                />
                
                {/* Luzes pontuais para destacar detalhes */}
                <pointLight position={[8, 8, 8]} intensity={2} color="#ffffff" />
                <pointLight position={[-8, 8, -8]} intensity={2} color="#ffffff" />
                <pointLight position={[0, 12, 0]} intensity={1.5} color="#ffffff" />
                
                {/* Luzes laterais para eliminar sombras */}
                <pointLight position={[15, 5, 0]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-15, 5, 0]} intensity={1.5} color="#ffffff" />
                
                {/* Luz inferior para reflexos no chão */}
                <pointLight position={[0, -2, 0]} intensity={1} color="#e6f3ff" />
                
                {/* Environment para reflexos realistas */}
                <Environment preset="studio" background={false} />
                
                <OrbitControls 
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={3}
                  maxDistance={10}
                  autoRotate={true}
                  autoRotateSpeed={0.2}
                />
                
                <Suspense fallback={<mesh><boxGeometry args={[2, 1, 1]} /><meshStandardMaterial color="#666" /></mesh>}>
                  <NissanGTRDirect 
                    scale={100} 
                    position={[0, -0.3, 0]} 
                    rotation={[0, 0, 0]}
                  />
                </Suspense>
              </Canvas>

          
              {/* Título do modelo */}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 relative z-10"
        >
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Transformar seu Carro?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos elevar a performance do seu veículo ao próximo nível.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
              Solicitar Orçamento
            </button>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay para integração */}
    </section>
  );
};