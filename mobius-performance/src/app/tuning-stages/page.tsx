'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, TrendingUp, Clock, ArrowRight, Search, 
  Gauge, Timer, Wrench, DollarSign, Filter,
  ChevronDown, X, Check, Info, Sparkles
} from 'lucide-react';
import vehicleDataJson from '@/lib/constants/vehicleData.json';

// Tipos TypeScript
interface VehicleModel {
  model: string;
  year: string;
  engine: string;
  drivetrain: string;
  original: {
    power_hp: number;
    torque_nm: number;
    zero_to_100_s: number;
  };
  stage1: {
    power_hp: number;
    torque_nm: number;
    zero_to_100_s: number;
  };
  stage2: {
    power_hp: number;
    torque_nm: number;
    zero_to_100_s: number;
  };
  stage3: {
    power_hp: number;
    torque_nm: number;
    zero_to_100_s: number;
  };
}

// Logos das marcas
const brandLogos: { [key: string]: string } = {
  'Volkswagen': '/logos/volks.png',
  'BMW': '/logos/bmw.webp',
  'Audi': '/logos/audi.webp',
  'Mercedes-Benz': '/logos/meca.webp',
  'Porsche': '/logos/porsche.webp',
  'Chevrolet': '/logos/chevy.jpg',
  'Lamborghini': '/logos/lambo.webp'
};

export default function ImprovedTuningStages() {
  const [selectedStage, setSelectedStage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrivetrain, setFilterDrivetrain] = useState('all');
  const [showStageInfo, setShowStageInfo] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareStages, setCompareStages] = useState<number[]>([1, 2, 3]);

  const currentStageInfo = vehicleDataJson.stages.find(s => s.id === selectedStage);

  const filteredData = useMemo(() => {
    return vehicleDataJson.brands.map(brand => ({
      ...brand,
      models: brand.models.filter(model => {
        const matchesSearch = 
          model.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          brand.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          model.engine.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDrivetrain = 
          filterDrivetrain === 'all' || model.drivetrain === filterDrivetrain;

        return matchesSearch && matchesDrivetrain;
      })
    })).filter(brand => brand.models.length > 0);
  }, [searchTerm, filterDrivetrain]);

  const calculateGains = (original: any, tuned: any) => {
    const powerGain = ((tuned.power_hp - original.power_hp) / original.power_hp * 100).toFixed(1);
    const torqueGain = ((tuned.torque_nm - original.torque_nm) / original.torque_nm * 100).toFixed(1);
    const timeImprovement = ((original.zero_to_100_s - tuned.zero_to_100_s) / original.zero_to_100_s * 100).toFixed(1);
    return { powerGain, torqueGain, timeImprovement };
  };

  const getStageData = (model: any) => {
    const stageKey = `stage${selectedStage}`;
    return model[stageKey];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-blue-600/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-medium">Ganhos Reais de Performance</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Escolha Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Stage</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Compare os ganhos de potência, torque e aceleração para diferentes níveis de preparação
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Stage Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vehicleDataJson.stages.slice(0, 3).map((stage, index) => (
              <motion.button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                  selectedStage === stage.id
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold">{stage.name}</span>
                    {selectedStage === stage.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-gray-200">{stage.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>{stage.price_range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{stage.duration}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo ou motor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Drivetrain Filter */}
            <div className="flex gap-2">
              {['all', 'FWD', 'RWD', 'AWD'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterDrivetrain(type)}
                  className={`px-6 py-4 rounded-xl font-medium transition-all ${
                    filterDrivetrain === type
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  {type === 'all' ? 'Todos' : type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Brand Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Escolha a Marca</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredData.map((brand, index) => (
              <motion.button
                key={brand.brand}
                onClick={() => setSelectedBrand(selectedBrand === brand.brand ? '' : brand.brand)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedBrand === brand.brand
                    ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                {/* Logo */}
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 p-2">
                  {brandLogos[brand.brand] ? (
                    <Image
                      src={brandLogos[brand.brand]}
                      alt={`${brand.brand} logo`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {brand.brand.charAt(0)}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{brand.brand}</h3>
                <p className="text-sm text-gray-400">{brand.models.length} modelos</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Vehicle Models */}
        <AnimatePresence>
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center p-2">
                  {brandLogos[selectedBrand] ? (
                    <Image
                      src={brandLogos[selectedBrand]}
                      alt={`${selectedBrand} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {selectedBrand.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedBrand}</h2>
                  <p className="text-gray-400">Selecione o modelo para ver os ganhos</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData
                  .find(b => b.brand === selectedBrand)
                  ?.models.map((model, idx) => {
                    const stageData = getStageData(model);
                    if (!stageData) return null;
                    
                    const gains = calculateGains(model.original, stageData);
                    const isSelected = selectedModel?.model === model.model;

                    return (
                      <motion.div
                        key={model.model}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedModel(isSelected ? null : model)}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-red-500 bg-gradient-to-br from-red-500/20 to-orange-500/10 shadow-2xl shadow-red-500/20'
                            : 'border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-white mb-1">{model.model}</h4>
                          <p className="text-sm text-gray-400">{model.year} • {model.engine}</p>
                          <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                            model.drivetrain === 'AWD' ? 'bg-blue-500/20 text-blue-400' :
                            model.drivetrain === 'RWD' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {model.drivetrain}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-400">+{gains.powerGain}%</div>
                            <div className="text-xs text-gray-500">Potência</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-400">+{gains.torqueGain}%</div>
                            <div className="text-xs text-gray-500">Torque</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-yellow-400">{stageData.zero_to_100_s}s</div>
                            <div className="text-xs text-gray-500">0-100</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Vehicle Details */}
        <AnimatePresence>
          {selectedModel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-700 rounded-3xl p-8 mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedModel.model}
                  </h2>
                  <p className="text-gray-400">{selectedModel.engine}</p>
                </div>
                <button
                  onClick={() => setSelectedModel(null)}
                  className="p-3 hover:bg-gray-700/50 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Stage Selector Fixo */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Selecione o Stage</h3>
                  <button
                    onClick={() => setCompareMode(!compareMode)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      compareMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {compareMode ? 'Modo Normal' : 'Comparar Stages'}
                  </button>
                </div>
                
                {!compareMode ? (
                  <div className="grid grid-cols-3 gap-3">
                    {vehicleDataJson.stages.slice(0, 3).map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => setSelectedStage(stage.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedStage === stage.id
                            ? 'border-red-500 bg-red-500/20 shadow-lg'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-lg font-bold text-white mb-1">{stage.name}</div>
                        <div className="text-sm text-gray-400">{stage.title}</div>
                        <div className="text-xs text-gray-500 mt-2">{stage.price_range}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-300 text-sm">
                      Modo comparação ativo - vendo todos os stages lado a lado
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Display */}
              {!compareMode ? (
                // Modo Single Stage
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-red-400" />
                      Original
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">Potência</span>
                        <span className="font-bold">{selectedModel.original.power_hp} cv</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">Torque</span>
                        <span className="font-bold">{selectedModel.original.torque_nm} Nm</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">0-100 km/h</span>
                        <span className="font-bold">{selectedModel.original.zero_to_100_s}s</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-400" />
                      {currentStageInfo?.name || `Stage ${selectedStage}`}
                    </h3>
                    <div className="space-y-3">
                      {(() => {
                        const stageData = getStageData(selectedModel);
                        const gains = calculateGains(selectedModel.original, stageData);
                        return (
                          <>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-green-500/20 to-transparent rounded-lg border border-green-500/20">
                              <span className="text-gray-400">Potência</span>
                              <div className="text-right">
                                <span className="font-bold text-green-400">{stageData.power_hp} cv</span>
                                <span className="text-xs text-green-400 ml-2">+{gains.powerGain}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg border border-blue-500/20">
                              <span className="text-gray-400">Torque</span>
                              <div className="text-right">
                                <span className="font-bold text-blue-400">{stageData.torque_nm} Nm</span>
                                <span className="text-xs text-blue-400 ml-2">+{gains.torqueGain}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-lg border border-yellow-500/20">
                              <span className="text-gray-400">0-100 km/h</span>
                              <div className="text-right">
                                <span className="font-bold text-yellow-400">{stageData.zero_to_100_s}s</span>
                                <span className="text-xs text-yellow-400 ml-2">-{gains.timeImprovement}%</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                // Modo Comparação
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-6 text-center text-white">
                    Comparação de Todos os Stages
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Original */}
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <h4 className="text-center font-bold text-red-400 mb-4">Original</h4>
                      <div className="space-y-3 text-sm">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{selectedModel.original.power_hp}</div>
                          <div className="text-gray-400">cv</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{selectedModel.original.torque_nm}</div>
                          <div className="text-gray-400">Nm</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{selectedModel.original.zero_to_100_s}</div>
                          <div className="text-gray-400">0-100s</div>
                        </div>
                      </div>
                    </div>

                    {/* Stages 1, 2, 3 */}
                    {[1, 2, 3].map((stageNum) => {
                      const stageData = selectedModel[`stage${stageNum}` as keyof VehicleModel] as any;
                      const gains = calculateGains(selectedModel.original, stageData);
                      const stageInfo = vehicleDataJson.stages.find(s => s.id === stageNum);
                      
                      return (
                        <div key={stageNum} className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
                          <h4 className="text-center font-bold text-blue-400 mb-4">{stageInfo?.name}</h4>
                          <div className="space-y-3 text-sm">
                            <div className="text-center">
                              <div className="text-xl font-bold text-green-400">{stageData.power_hp}</div>
                              <div className="text-gray-400">cv</div>
                              <div className="text-xs text-green-400">+{gains.powerGain}%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-blue-400">{stageData.torque_nm}</div>
                              <div className="text-gray-400">Nm</div>
                              <div className="text-xs text-blue-400">+{gains.torqueGain}%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-yellow-400">{stageData.zero_to_100_s}</div>
                              <div className="text-gray-400">0-100s</div>
                              <div className="text-xs text-yellow-400">-{gains.timeImprovement}%</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhum veículo encontrado</h3>
            <p className="text-gray-400 mb-6">Tente ajustar os filtros ou termo de busca</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDrivetrain('all');
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}

        {/* Instructions */}
        {!selectedBrand && filteredData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Como funciona?
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>1. 🏭 <strong>Escolha a marca</strong> do seu veículo</p>
                <p>2. 🚗 <strong>Selecione o modelo</strong> específico</p>
                <p>3. ⚡ <strong>Veja os ganhos</strong> de performance</p>
                <p>4. 📞 <strong>Solicite um orçamento</strong> personalizado</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
