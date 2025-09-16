'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Car, Filter, X } from 'lucide-react';
import { Car as CarType, CarFilter } from '@/types/car';
import { carBrands, getAllCars } from '@/data/cars/database';
import { formatHP, formatTorque, formatYear } from '@/lib/utils/formatters';

interface CarSelectorProps {
  selectedCar: CarType | null;
  onCarSelect: (car: CarType) => void;
}

export const CarSelector: React.FC<CarSelectorProps> = ({
  selectedCar,
  onCarSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CarFilter>({});

  const allCars = getAllCars();

  const filteredCars = useMemo(() => {
    return allCars.filter(car => {
      const matchesSearch = !searchTerm || 
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.engine.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      
      const matchesCategory = !filters.category || car.category === filters.category;
      
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;

      return matchesSearch && matchesBrand && matchesCategory && matchesFuelType;
    });
  }, [allCars, searchTerm, selectedBrand, filters]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setFilters({});
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo ou motor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Todas as marcas</option>
          {carBrands.map(brand => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </button>

        {/* Clear Filters */}
        {(searchTerm || selectedBrand || Object.keys(filters).length > 0) && (
          <button
            onClick={clearFilters}
            className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5 mr-2" />
            Limpar
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value || undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todas</option>
                  <option value="sport">Esportivo</option>
                  <option value="luxury">Luxo</option>
                  <option value="suv">SUV</option>
                  <option value="compact">Compacto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Combustível
                </label>
                <select
                  value={filters.fuelType || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, fuelType: e.target.value || undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos</option>
                  <option value="gasoline">Gasolina</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="electric">Elétrico</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Potência Mínima
                </label>
                <input
                  type="number"
                  placeholder="HP"
                  value={filters.minPower || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPower: e.target.value ? parseInt(e.target.value) : undefined }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredCars.length} {filteredCars.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <motion.div
            key={car.id}
            className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedCar?.id === car.id
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
            }`}
            onClick={() => onCarSelect(car)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Car Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-400" />
              </div>
              {/* Placeholder for actual car image */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {formatYear(car.year)}
              </div>
            </div>

            {/* Car Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">
                  {car.brand} {car.model}
                </h3>
                {selectedCar?.id === car.id && (
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Motor:</span>
                  <span className="font-medium">{car.engine}</span>
                </div>
                <div className="flex justify-between">
                  <span>Potência:</span>
                  <span className="font-medium">{formatHP(car.stockPower.hp)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Torque:</span>
                  <span className="font-medium">{formatTorque(car.stockPower.torque)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tração:</span>
                  <span className="font-medium uppercase">{car.drivetrain}</span>
                </div>
              </div>

              {/* Availability Badge */}
              <div className="mt-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  car.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {car.availability ? 'Disponível' : 'Indisponível'}
                </span>
                {car.featured && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Destaque
                  </span>
                )}
              </div>
            </div>

            {/* Selection Overlay */}
            {selectedCar?.id === car.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-primary-500/10 pointer-events-none"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredCars.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum veículo encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Tente ajustar os filtros ou termo de busca
          </p>
          <button
            onClick={clearFilters}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
};
