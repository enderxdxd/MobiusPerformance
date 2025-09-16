'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Star,
  Wrench,
  DollarSign
} from 'lucide-react';
import { Stage } from '@/types/stage';
import { formatPrice, formatDuration } from '@/lib/utils/formatters';

interface StageDetailsProps {
  stage: Stage;
}

export const StageDetails: React.FC<StageDetailsProps> = ({ stage }) => {
  const difficultyConfig = {
    easy: { color: 'text-green-600', bg: 'bg-green-100', label: 'Fácil' },
    medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Médio' },
    hard: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Difícil' },
    expert: { color: 'text-red-600', bg: 'bg-red-100', label: 'Expert' },
  };

  const difficulty = difficultyConfig[stage.difficulty];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{stage.name}</h2>
            <p className="text-primary-100 text-lg">{stage.title}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {formatPrice(stage.price.min)} - {formatPrice(stage.price.max)}
            </div>
            <div className="text-primary-200 text-sm">Investimento</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {stage.description}
          </p>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">Duração</div>
            <div className="text-blue-700">{formatDuration(stage.duration)}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">Garantia</div>
            <div className="text-green-700">{stage.warranty}</div>
          </div>
          
          <div className={`${difficulty.bg} rounded-lg p-4 text-center`}>
            <Star className={`w-8 h-8 ${difficulty.color} mx-auto mb-2`} />
            <div className={`font-semibold ${difficulty.color.replace('text-', 'text-').replace('-600', '-900')}`}>
              Dificuldade
            </div>
            <div className={difficulty.color}>{difficulty.label}</div>
          </div>
        </div>

        {/* Modifications */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Wrench className="w-6 h-6 mr-2 text-primary-600" />
            Modificações Incluídas
          </h3>
          <div className="space-y-3">
            {stage.modifications.map((mod) => (
              <motion.div
                key={mod.id}
                className="flex items-start p-4 bg-gray-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                  mod.required ? 'bg-primary-600' : 'bg-gray-400'
                }`}>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{mod.name}</h4>
                    {mod.price && (
                      <span className="text-primary-600 font-medium">
                        {formatPrice(mod.price)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{mod.description}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mod.required 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {mod.required ? 'Obrigatório' : 'Opcional'}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                      {mod.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-orange-500" />
            Requisitos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stage.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-orange-800">{requirement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Benefícios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stage.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-green-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-primary-600" />
            O que está incluído
          </h3>
          <div className="space-y-2">
            {stage.price.includes.map((item, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          
          {stage.price.excludes && stage.price.excludes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Não incluído:</h4>
              <div className="space-y-1">
                {stage.price.excludes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-400 rounded mr-3" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popularity Indicator */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary-800 font-medium">Popularidade</span>
            <span className="text-primary-600 font-bold">{stage.popularity}%</span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stage.popularity}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-primary-700 text-sm mt-2">
            {stage.popularity}% dos nossos clientes escolhem este stage
          </p>
        </div>

        {/* Reversibility Notice */}
        <div className={`p-4 rounded-lg ${
          stage.reversible 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {stage.reversible ? (
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            )}
            <span className={`font-medium ${
              stage.reversible ? 'text-green-800' : 'text-red-800'
            }`}>
              {stage.reversible ? 'Modificação Reversível' : 'Modificação Permanente'}
            </span>
          </div>
          <p className={`text-sm mt-1 ${
            stage.reversible ? 'text-green-700' : 'text-red-700'
          }`}>
            {stage.reversible 
              ? 'Esta modificação pode ser revertida ao estado original se necessário.'
              : 'Esta modificação é permanente e não pode ser revertida facilmente.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};
