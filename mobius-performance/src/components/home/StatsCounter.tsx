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
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'clients',
    icon: Users,
    value: 350,
    suffix: '+',
    label: 'Clientes Satisfeitos',
    description: 'Relacionamentos duradouros construídos',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 'experience',
    icon: Clock,
    value: 8,
    suffix: ' Anos',
    label: 'de Experiência',
    description: 'Expertise consolidada no mercado',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'awards',
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Prêmios Recebidos',
    description: 'Reconhecimento pela excelência',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
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
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Números que <span className="gradient-text">Impressionam</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <div className={`w-20 h-20 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 ${stat.color}`} />
                  </div>

                  {/* Animated Background Circle */}
                  <motion.div
                    className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-primary-200"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isInView ? { 
                      scale: [1, 1.2, 1], 
                      opacity: [0, 0.5, 0] 
                    } : {}}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: stats.indexOf(stat) * 0.2 
                    }}
                  />
                </div>

                {/* Counter */}
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    {hasAnimated ? (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        delay={stats.indexOf(stat) * 0.2}
                        preserveValue
                      />
                    ) : (
                      '0'
                    )}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-primary-600">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  className="w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-4 group-hover:w-16 transition-all duration-300"
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
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full text-primary-700 font-medium">
            <Award className="w-5 h-5 mr-2" />
            Certificados ISO 9001 e parceiros oficiais das principais marcas
          </div>
        </motion.div>
      </div>
    </section>
  );
};
