'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Zap, Clock, ArrowRight, Search, 
  Gauge, DollarSign,
  X, Check
} from 'lucide-react';

interface PerformanceData {
  power_hp: number;
  torque_nm: number;
  zero_to_100_s: number;
}

interface VehicleModel {
  model: string;
  year: string;
  engine: string;
  drivetrain: string;
  original: PerformanceData;
  stage1: PerformanceData;
  stage2: PerformanceData;
  stage3: PerformanceData;
  [key: string]: string | PerformanceData;
}

// Dados mockados para demonstração
const vehicleDataJson = {
  stages: [
    { id: 1, name: 'Stage 1', title: 'Software', price_range: 'R$ 2.500 - R$ 4.500', duration: '2-4 horas', gradient: 'from-green-500 to-emerald-600' },
    { id: 2, name: 'Stage 2', title: 'Software + Hardware', price_range: 'R$ 8.000 - R$ 15.000', duration: '1-2 dias', gradient: 'from-blue-500 to-cyan-600' },
    { id: 3, name: 'Stage 3', title: 'Preparação Completa', price_range: 'R$ 25.000+', duration: '3-7 dias', gradient: 'from-red-500 to-orange-600' }
  ],
  brands: [
    {
      brand: 'BMW',
      models: [
        {
          model: 'M3 F80',
          year: '2014-2018',
          engine: '3.0L Twin-Turbo I6',
          drivetrain: 'RWD',
          original: { power_hp: 431, torque_nm: 550, zero_to_100_s: 4.1 },
          stage1: { power_hp: 510, torque_nm: 680, zero_to_100_s: 3.7 },
          stage2: { power_hp: 580, torque_nm: 750, zero_to_100_s: 3.4 },
          stage3: { power_hp: 650, torque_nm: 820, zero_to_100_s: 3.1 }
        }
      ]
    }
  ]
};

export default function ImprovedTuningStages() {
  const [selectedStage, setSelectedStage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrivetrain, setFilterDrivetrain] = useState('all');
  const [compareMode, setCompareMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStageInfo = vehicleDataJson.stages.find(s => s.id === selectedStage);
  const videoSrc = `stage${selectedStage}.mp4`;

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

  const calculateGains = (original: PerformanceData, tuned: PerformanceData): { powerGain: string, torqueGain: string, timeImprovement: string } => {
    const powerGain = ((tuned.power_hp - original.power_hp) / original.power_hp * 100).toFixed(1);
    const torqueGain = ((tuned.torque_nm - original.torque_nm) / original.torque_nm * 100).toFixed(1);
    const timeImprovement = ((original.zero_to_100_s - tuned.zero_to_100_s) / original.zero_to_100_s * 100).toFixed(1);
    return { powerGain, torqueGain, timeImprovement };
  };

  const getStageData = (model: VehicleModel): PerformanceData => {
    const stageKey = `stage${selectedStage}` as keyof VehicleModel;
    return model[stageKey] as PerformanceData;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Parallax Background Logo */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-3 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px) scale(2)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="mobius-logo-premium.png" 
            alt="Mobius Logo" 
            className="w-[2048px] h-[2048px] object-contain"
          />
        </div>
      </div>

      {/* Hero Section with Video */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <video
              key={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.8s_ease-in-out]"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center px-6 sm:px-8 lg:px-12 z-10">
          <div className="text-center max-w-4xl">
            <div className="overflow-hidden mb-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white animate-[slideUp_1s_ease-out]">
                Escolha seu <span className="text-red-600">Stage</span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-300 animate-[slideUp_1s_ease-out_0.2s_both]">
                Compare os ganhos de potência, torque e aceleração para diferentes níveis de preparação
              </p>
            </div>
            <div className="w-32 h-1 bg-red-600 mx-auto mt-8 animate-[expandWidth_1s_ease-out_0.4s_both]"></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        {/* Stage Selector */}
        <div className="mb-12 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicleDataJson.stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`relative p-8 rounded-xl border-2 transition-all duration-500 overflow-hidden group ${
                  selectedStage === stage.id
                    ? 'border-red-600 bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(220,38,38,0.4)]'
                    : 'border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700'
                } ${stage.id === 3 && selectedStage === 3 ? 'animate-neonPulse' : ''}`}
                style={{
                  animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {stage.id === 3 && selectedStage === 3 && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-75 blur-md animate-pulse"></div>
                    <div className="absolute inset-[2px] rounded-xl bg-gradient-to-br from-gray-900 to-black"></div>
                  </>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-white">{stage.name}</span>
                    {selectedStage === stage.id && (
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-200">{stage.title}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-gray-400">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <span>{stage.price_range}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <Clock className="w-5 h-5 text-red-600" />
                      <span>{stage.duration}</span>
                    </div>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-transform duration-500 origin-left ${
                  selectedStage === stage.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4" style={{ animation: 'fadeIn 0.8s ease-out 0.4s both' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo ou motor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black border-2 border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {['all', 'FWD', 'RWD', 'AWD'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterDrivetrain(type)}
                  className={`px-6 py-4 rounded-lg font-bold transition-all duration-300 ${
                    filterDrivetrain === type
                      ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                      : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {type === 'all' ? 'Todos' : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-8">Escolha a marca</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredData.map((brand, index) => (
              <button
                key={brand.brand}
                onClick={() => setSelectedBrand(selectedBrand === brand.brand ? '' : brand.brand)}
                className={`group relative p-8 rounded-xl border-2 transition-all duration-500 ${
                  selectedBrand === brand.brand
                    ? 'border-red-600 bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(220,38,38,0.3)]'
                    : 'border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700'
                }`}
                style={{
                  animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-0 h-0 transition-all duration-500 ${
                    selectedBrand === brand.brand 
                      ? 'border-t-[35px] border-r-[35px] border-t-transparent border-r-red-600' 
                      : 'border-t-[35px] border-r-[35px] border-t-transparent border-r-transparent group-hover:border-r-red-600'
                  }`}></div>
                </div>

                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 p-2 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl font-bold text-black">
                    {brand.brand.charAt(0)}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{brand.brand}</h3>
                <p className="text-sm text-gray-400">{brand.models.length} modelos</p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-transform duration-500 origin-left ${
                  selectedBrand === brand.brand ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Models */}
        {selectedBrand && (
          <div className="mb-12" style={{ animation: 'fadeInUp 0.6s ease-out both' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <span className="text-xl font-bold text-black">
                  {selectedBrand.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white">{selectedBrand}</h2>
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
                    <div
                      key={model.model}
                      onClick={() => setSelectedModel(isSelected ? null : model)}
                      className={`cursor-pointer group p-6 rounded-xl border-2 transition-all duration-500 ${
                        isSelected
                          ? 'border-red-600 bg-gradient-to-br from-gray-900 to-black shadow-[0_0_30px_rgba(220,38,38,0.3)] scale-105'
                          : 'border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700 hover:-translate-y-2'
                      }`}
                      style={{
                        animation: `fadeInScale 0.6s ease-out ${idx * 0.1}s both`
                      }}
                    >
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-white mb-2">{model.model}</h4>
                        <p className="text-sm text-gray-400 mb-3">{model.year} • {model.engine}</p>
                        <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                          model.drivetrain === 'AWD' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                          model.drivetrain === 'RWD' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                          'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                        }`}>
                          {model.drivetrain}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-black/50 rounded-lg border border-gray-800">
                          <div className="text-2xl font-black text-green-400">+{gains.powerGain}%</div>
                          <div className="text-xs text-gray-500 mt-1">Potência</div>
                        </div>
                        <div className="text-center p-3 bg-black/50 rounded-lg border border-gray-800">
                          <div className="text-2xl font-black text-blue-400">+{gains.torqueGain}%</div>
                          <div className="text-xs text-gray-500 mt-1">Torque</div>
                        </div>
                        <div className="text-center p-3 bg-black/50 rounded-lg border border-gray-800">
                          <div className="text-2xl font-black text-yellow-400">{stageData.zero_to_100_s}s</div>
                          <div className="text-xs text-gray-500 mt-1">0-100</div>
                        </div>
                      </div>

                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform transition-transform duration-500 origin-left ${
                        isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Selected Vehicle Details */}
        {selectedModel && (
          <div 
            className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-xl p-8 mb-12"
            style={{ animation: 'fadeInUp 0.6s ease-out both' }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-black text-white mb-2">
                  {selectedModel.model}
                </h2>
                <p className="text-gray-400 text-lg">{selectedModel.engine}</p>
              </div>
              <button
                onClick={() => setSelectedModel(null)}
                className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stage Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-white">Selecione o stage</h3>
                <button
                  onClick={() => setCompareMode(!compareMode)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    compareMode 
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {compareMode ? 'Modo normal' : 'Comparar stages'}
                </button>
              </div>
              
              {!compareMode ? (
                <div className="grid grid-cols-3 gap-4">
                  {vehicleDataJson.stages.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedStage === stage.id
                          ? 'border-red-600 bg-gradient-to-br from-red-600/20 to-transparent shadow-lg'
                          : 'border-gray-700 bg-black/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-xl font-black text-white mb-2">{stage.name}</div>
                      <div className="text-sm text-gray-400 mb-3">{stage.title}</div>
                      <div className="text-xs text-gray-500">{stage.price_range}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-6">
                  <p className="text-blue-300 text-sm font-medium">
                    Modo comparação ativo - vendo todos os stages lado a lado
                  </p>
                </div>
              )}
            </div>

            {/* Stats Display */}
            {!compareMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Gauge className="w-6 h-6 text-red-600" />
                    Original
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-4 bg-black/50 border border-gray-800 rounded-lg">
                      <span className="text-gray-400">Potência</span>
                      <span className="font-bold text-white text-lg">{selectedModel.original.power_hp} cv</span>
                    </div>
                    <div className="flex justify-between p-4 bg-black/50 border border-gray-800 rounded-lg">
                      <span className="text-gray-400">Torque</span>
                      <span className="font-bold text-white text-lg">{selectedModel.original.torque_nm} Nm</span>
                    </div>
                    <div className="flex justify-between p-4 bg-black/50 border border-gray-800 rounded-lg">
                      <span className="text-gray-400">0-100 km/h</span>
                      <span className="font-bold text-white text-lg">{selectedModel.original.zero_to_100_s}s</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-green-400" />
                    {currentStageInfo?.name || `Stage ${selectedStage}`}
                  </h3>
                  <div className="space-y-3">
                    {(() => {
                      const stageData = getStageData(selectedModel);
                      const gains = calculateGains(selectedModel.original, stageData);
                      return (
                        <>
                          <div className="flex justify-between p-4 bg-gradient-to-r from-green-600/20 to-transparent border-2 border-green-600/30 rounded-lg">
                            <span className="text-gray-400">Potência</span>
                            <div className="text-right">
                              <span className="font-bold text-green-400 text-lg">{stageData.power_hp} cv</span>
                              <span className="text-sm text-green-400 ml-3">+{gains.powerGain}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between p-4 bg-gradient-to-r from-blue-600/20 to-transparent border-2 border-blue-600/30 rounded-lg">
                            <span className="text-gray-400">Torque</span>
                            <div className="text-right">
                              <span className="font-bold text-blue-400 text-lg">{stageData.torque_nm} Nm</span>
                              <span className="text-sm text-blue-400 ml-3">+{gains.torqueGain}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between p-4 bg-gradient-to-r from-yellow-600/20 to-transparent border-2 border-yellow-600/30 rounded-lg">
                            <span className="text-gray-400">0-100 km/h</span>
                            <div className="text-right">
                              <span className="font-bold text-yellow-400 text-lg">{stageData.zero_to_100_s}s</span>
                              <span className="text-sm text-yellow-400 ml-3">-{gains.timeImprovement}%</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <h3 className="text-xl font-black mb-6 text-center text-white">
                  Comparação de todos os stages
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-black/50 border-2 border-gray-800 rounded-xl p-6">
                    <h4 className="text-center font-black text-red-600 mb-6 text-lg">Original</h4>
                    <div className="space-y-4 text-sm">
                      <div className="text-center">
                        <div className="text-3xl font-black text-white">{selectedModel.original.power_hp}</div>
                        <div className="text-gray-400 mt-1">cv</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-white">{selectedModel.original.torque_nm}</div>
                        <div className="text-gray-400 mt-1">Nm</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-white">{selectedModel.original.zero_to_100_s}</div>
                        <div className="text-gray-400 mt-1">0-100s</div>
                      </div>
                    </div>
                  </div>

                  {[1, 2, 3].map((stageNum) => {
                    const stageData = selectedModel[`stage${stageNum}` as keyof VehicleModel] as PerformanceData;
                    const gains = calculateGains(selectedModel.original, stageData);
                    const stageInfo = vehicleDataJson.stages.find(s => s.id === stageNum);
                    
                    return (
                      <div key={stageNum} className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-xl p-6">
                        <h4 className="text-center font-black text-blue-400 mb-6 text-lg">{stageInfo?.name}</h4>
                        <div className="space-y-4 text-sm">
                          <div className="text-center">
                            <div className="text-3xl font-black text-green-400">{stageData.power_hp}</div>
                            <div className="text-gray-400 mt-1">cv</div>
                            <div className="text-sm text-green-400 font-bold mt-2">+{gains.powerGain}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-black text-blue-400">{stageData.torque_nm}</div>
                            <div className="text-gray-400 mt-1">Nm</div>
                            <div className="text-sm text-blue-400 font-bold mt-2">+{gains.torqueGain}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-black text-yellow-400">{stageData.zero_to_100_s}</div>
                            <div className="text-gray-400 mt-1">0-100s</div>
                            <div className="text-sm text-yellow-400 font-bold mt-2">-{gains.timeImprovement}%</div>
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
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-black text-lg transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:scale-105"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20" style={{ animation: 'fadeIn 0.6s ease-out both' }}>
            <div className="w-20 h-20 bg-gray-900 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Nenhum veículo encontrado</h3>
            <p className="text-gray-400 mb-8">Tente ajustar os filtros ou termo de busca</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDrivetrain('all');
              }}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Instructions */}
        {!selectedBrand && filteredData.length > 0 && (
          <div className="text-center py-12" style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600/30 rounded-xl p-10 max-w-3xl mx-auto shadow-[0_0_40px_rgba(220,38,38,0.15)]">
              <h3 className="text-4xl font-black text-white mb-3">
                Como funciona?
              </h3>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group relative bg-black/50 border-2 border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-transparent group-hover:border-r-red-600 transition-all duration-500"></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <span className="text-3xl">🏭</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="text-xl font-black text-white mb-2">Escolha a marca</h4>
                      <p className="text-gray-400 text-sm">Selecione a fabricante do seu veículo</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="group relative bg-black/50 border-2 border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-transparent group-hover:border-r-red-600 transition-all duration-500"></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <span className="text-3xl">🚗</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="text-xl font-black text-white mb-2">Selecione o modelo</h4>
                      <p className="text-gray-400 text-sm">Escolha o modelo específico do carro</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="group relative bg-black/50 border-2 border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-transparent group-hover:border-r-red-600 transition-all duration-500"></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="text-xl font-black text-white mb-2">Veja os ganhos</h4>
                      <p className="text-gray-400 text-sm">Compare os aumentos de performance</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                <div className="group relative bg-black/50 border-2 border-gray-800 rounded-xl p-6 transition-all duration-500 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-transparent border-r-transparent group-hover:border-r-red-600 transition-all duration-500"></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      <span className="text-3xl">📞</span>
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="text-xl font-black text-white mb-2">Solicite orçamento</h4>
                      <p className="text-gray-400 text-sm">Receba uma proposta personalizada</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.4),
                        0 0 60px rgba(220, 38, 38, 0.2),
                        inset 0 0 30px rgba(220, 38, 38, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.6),
                        0 0 80px rgba(220, 38, 38, 0.3),
                        inset 0 0 40px rgba(220, 38, 38, 0.2);
          }
        }
      `}</style>
    </div>
  );
}