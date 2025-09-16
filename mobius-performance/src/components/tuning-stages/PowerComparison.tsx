'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Gauge } from 'lucide-react';
import { Car } from '@/types/car';
import { Stage } from '@/types/stage';
import { formatHP, formatTorque, formatPercentage } from '@/lib/utils/formatters';

interface PowerComparisonProps {
  car: Car;
  stage: Stage;
}

interface PowerGains {
  hpGain: number;
  torqueGain: number;
  hpPercentage: number;
  torquePercentage: number;
  newHP: number;
  newTorque: number;
}

export const PowerComparison: React.FC<PowerComparisonProps> = ({
  car,
  stage,
}) => {
  const [gains, setGains] = useState<PowerGains | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Calculate power gains based on stage
    const calculateGains = (): PowerGains => {
      let hpMultiplier = 1;
      let torqueMultiplier = 1;

      switch (stage.id) {
        case 1:
          hpMultiplier = 1.20; // 20% gain
          torqueMultiplier = 1.25; // 25% gain
          break;
        case 2:
          hpMultiplier = 1.30; // 30% gain
          torqueMultiplier = 1.35; // 35% gain
          break;
        case 3:
          hpMultiplier = 1.50; // 50% gain
          torqueMultiplier = 1.55; // 55% gain
          break;
        case 4:
          hpMultiplier = 2.00; // 100% gain
          torqueMultiplier = 1.80; // 80% gain
          break;
      }

      const newHP = Math.round(car.stockPower.hp * hpMultiplier);
      const newTorque = Math.round(car.stockPower.torque * torqueMultiplier);
      const hpGain = newHP - car.stockPower.hp;
      const torqueGain = newTorque - car.stockPower.torque;
      const hpPercentage = Math.round(((newHP - car.stockPower.hp) / car.stockPower.hp) * 100);
      const torquePercentage = Math.round(((newTorque - car.stockPower.torque) / car.stockPower.torque) * 100);

      return {
        hpGain,
        torqueGain,
        hpPercentage,
        torquePercentage,
        newHP,
        newTorque,
      };
    };

    const newGains = calculateGains();
    setGains(newGains);
    setIsAnimating(true);

    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [car, stage]);

  if (!gains) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Comparação de Performance
        </h3>
        <p className="text-gray-600">
          {car.brand} {car.model} - {stage.name}
        </p>
      </div>

      {/* Before vs After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stock Power */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Original</h4>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {formatHP(car.stockPower.hp)}
              </div>
              <div className="text-sm text-gray-600">Potência</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {formatTorque(car.stockPower.torque)}
              </div>
              <div className="text-sm text-gray-600">Torque</div>
            </div>
          </div>
        </div>

        {/* Tuned Power */}
        <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border-2 border-primary-200">
          <h4 className="text-lg font-semibold text-primary-700 mb-4">
            Após {stage.name}
          </h4>
          <div className="space-y-4">
            <div>
              <motion.div
                className="text-3xl font-bold text-primary-600"
                initial={{ scale: 1 }}
                animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {formatHP(gains.newHP)}
              </motion.div>
              <div className="text-sm text-primary-600">Potência</div>
              <div className="text-xs text-green-600 font-medium">
                +{formatHP(gains.hpGain)} ({formatPercentage(gains.hpPercentage)})
              </div>
            </div>
            <div>
              <motion.div
                className="text-3xl font-bold text-primary-600"
                initial={{ scale: 1 }}
                animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {formatTorque(gains.newTorque)}
              </motion.div>
              <div className="text-sm text-primary-600">Torque</div>
              <div className="text-xs text-green-600 font-medium">
                +{formatTorque(gains.torqueGain)} ({formatPercentage(gains.torquePercentage)})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison Bars */}
      <div className="space-y-4">
        {/* HP Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Potência (HP)
            </span>
            <span className="text-sm text-green-600 font-medium">
              +{gains.hpPercentage}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full flex items-center justify-end pr-2"
                initial={{ width: `${(car.stockPower.hp / gains.newHP) * 100}%` }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              >
                <span className="text-xs text-white font-medium">
                  {formatHP(gains.newHP)}
                </span>
              </motion.div>
            </div>
            <div className="absolute top-0 left-0 w-full h-4 bg-gray-300 rounded-full -z-10">
              <div
                className="bg-gray-400 h-4 rounded-full"
                style={{ width: `${(car.stockPower.hp / gains.newHP) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Torque Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Gauge className="w-4 h-4 mr-1" />
              Torque (Nm)
            </span>
            <span className="text-sm text-green-600 font-medium">
              +{gains.torquePercentage}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full flex items-center justify-end pr-2"
                initial={{ width: `${(car.stockPower.torque / gains.newTorque) * 100}%` }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              >
                <span className="text-xs text-white font-medium">
                  {formatTorque(gains.newTorque)}
                </span>
              </motion.div>
            </div>
            <div className="absolute top-0 left-0 w-full h-4 bg-gray-300 rounded-full -z-10">
              <div
                className="bg-gray-400 h-4 rounded-full"
                style={{ width: `${(car.stockPower.torque / gains.newTorque) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">Ganho Total</span>
          </div>
          <div className="text-lg font-bold text-green-600">
            +{formatHP(gains.hpGain)} / +{formatTorque(gains.torqueGain)}
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Gauge className="w-5 h-5 text-primary-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">Performance</span>
          </div>
          <div className="text-lg font-bold text-primary-600">
            {Math.round((gains.hpPercentage + gains.torquePercentage) / 2)}% melhor
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
        * Valores estimados baseados em configuração típica. Resultados podem variar.
      </div>
    </div>
  );
};
