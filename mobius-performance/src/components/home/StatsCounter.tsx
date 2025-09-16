'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Car, Users, Award, Clock } from 'lucide-react';

const stats = [
  {
    id: 'cars',
    icon: Car,
    value: 500,
    suffix: '+',
    label: 'Carros Tunados',
    description: 'Veículos transformados com sucesso',
    color: 'text-red-500',
    bgColor: 'bg-gray-900',
  },
  {
    id: 'clients',
    icon: Users,
    value: 350,
    suffix: '+',
    label: 'Clientes Satisfeitos',
    description: 'Relacionamentos duradouros construídos',
    color: 'text-red-500',
    bgColor: 'bg-gray-900',
  },
  {
    id: 'experience',
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Anos de Experiência',
    description: 'Tradição e expertise no mercado',
    color: 'text-red-500',
    bgColor: 'bg-gray-900',
  },
  {
    id: 'projects',
    icon: Clock,
    value: 1200,
    suffix: '+',
    label: 'Projetos Concluídos',
    description: 'Horas de dedicação e trabalho',
    color: 'text-red-500',
    bgColor: 'bg-gray-900',
  },
];

export const StatsCounter: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              Números que <span className="gradient-text">Impressionam</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nossa trajetória de sucesso é medida pelos resultados que entregamos 
              e pela confiança que nossos clientes depositam em nosso trabalho.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative">
                  {/* Icon Container */}
                  <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-red-600 glow-hover`}>
                    <IconComponent className={`w-10 h-10 ${stat.color}`} />
                  </div>

                  {/* Animated Background Circle */}
                  <motion.div
                    className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-red-500"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isInView ? { 
                      scale: [1, 1.1, 1], 
                      opacity: [0, 0.5, 0] 
                    } : { scale: 1, opacity: 0 }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "loop" 
                    }}
                  />
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                    {hasAnimated ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.suffix}
                        preserveValue
                      />
                    ) : (
                      '0' + stat.suffix
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-red-500 mb-2 font-display">
                    {stat.label}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <motion.div
                  className="w-0 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-4 group-hover:w-16 transition-all duration-300"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full text-red-500 font-medium border border-red-600">
            <Award className="w-5 h-5 mr-2" />
            Certificados ISO 9001 e parceiros oficiais das principais marcas
          </div>
        </motion.div>
      </div>
    </section>
  );
};
