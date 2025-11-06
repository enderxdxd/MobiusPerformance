'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Settings, Wind, Flame } from 'lucide-react';
import { Stage } from '@/types/stage';
import { allStages } from '@/data/stages';
import { formatPrice } from '@/lib/utils/formatters';

interface StageSelectorProps {
  selectedStage: number;
  onStageSelect: (stageId: number) => void;
}

const stageIcons = {
  1: Settings,
  2: Zap,
  3: Wind,
  4: Flame,
};

const stageColors = {
  1: 'from-blue-500 to-blue-700',
  2: 'from-green-500 to-green-700',
  3: 'from-orange-500 to-orange-700',
  4: 'from-red-500 to-red-700',
};

export const StageSelector: React.FC<StageSelectorProps> = ({
  selectedStage,
  onStageSelect,
}) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {allStages.map((stage) => {
        const IconComponent = stageIcons[stage.id as keyof typeof stageIcons];
        const isSelected = selectedStage === stage.id;
        const isHovered = hoveredStage === stage.id;
        
        return (
          <motion.div
            key={stage.id}
            className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
              isSelected
                ? 'border-primary-500 bg-primary-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
            }`}
            onClick={() => onStageSelect(stage.id)}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection Indicator */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}

            {/* Stage Icon */}
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${stageColors[stage.id as keyof typeof stageColors]} flex items-center justify-center mb-4 mx-auto`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>

            {/* Stage Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {stage.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {stage.shortDescription}
              </p>

              {/* Price Range */}
              <div className="text-primary-600 font-semibold mb-3">
                {formatPrice(stage.price.min)} - {formatPrice(stage.price.max)}
              </div>

              {/* Popularity Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.popularity}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {stage.popularity}% dos clientes escolhem
              </div>

              {/* Difficulty Badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stage.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  stage.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  stage.difficulty === 'hard' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {stage.difficulty === 'easy' ? 'Fácil' :
                   stage.difficulty === 'medium' ? 'Médio' :
                   stage.difficulty === 'hard' ? 'Difícil' : 'Expert'}
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            {(isHovered || isSelected) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 rounded-xl pointer-events-none"
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
