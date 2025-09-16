'use client';

import { useState, useEffect, useMemo } from 'react';
import { Car, CarFilter } from '@/types/car';
import { cars, getCarById, getCarsByBrand, getFeaturedCars, searchCars } from '@/data/cars/database';

export const useCarData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allCars = useMemo(() => cars, []);
  const featuredCars = useMemo(() => getFeaturedCars(), []);
  
  const brands = useMemo(() => 
    [...new Set(cars.map(car => car.brand))].sort(), 
    []
  );
  
  const categories = useMemo(() => 
    [...new Set(cars.map(car => car.category))].sort(), 
    []
  );
  
  const fuelTypes = useMemo(() => 
    [...new Set(cars.map(car => car.fuelType))].sort(), 
    []
  );

  const getCarByIdAsync = async (id: string): Promise<Car | null> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      const car = getCarById(id);
      return car;
    } catch (err) {
      setError('Erro ao buscar veículo');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchCarsAsync = async (query: string): Promise<Car[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      const results = searchCars(query);
      return results;
    } catch (err) {
      setError('Erro ao pesquisar veículos');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCarsByBrandAsync = async (brand: string): Promise<Car[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      const results = getCarsByBrand(brand);
      return results;
    } catch (err) {
      setError('Erro ao buscar veículos da marca');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    allCars,
    featuredCars,
    brands,
    categories,
    fuelTypes,
    loading,
    error,
    getCarByIdAsync,
    searchCarsAsync,
    getCarsByBrandAsync
  };
};

export const useCarFilter = (initialCars: Car[] = cars) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>(initialCars);
  const [filters, setFilters] = useState<CarFilter>({
    brand: '',
    category: '',
    fuelType: '',
    minPower: 0,
    maxPower: 1000,
    minYear: 2000,
    maxYear: new Date().getFullYear()
  });

  useEffect(() => {
    let result = [...initialCars];

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(car => car.brand === filters.brand);
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(car => car.category === filters.category);
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    // Apply power range filter
    if (filters.minPower !== undefined) {
      result = result.filter(car => car.stockPower.hp >= filters.minPower!);
    }
    if (filters.maxPower !== undefined) {
      result = result.filter(car => car.stockPower.hp <= filters.maxPower!);
    }

    // Apply year range filter
    if (filters.minYear !== undefined) {
      result = result.filter(car => car.year >= filters.minYear!);
    }
    if (filters.maxYear !== undefined) {
      result = result.filter(car => car.year <= filters.maxYear!);
    }

    setFilteredCars(result);
  }, [filters, initialCars]);

  const updateFilter = (key: keyof CarFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      category: '',
      fuelType: '',
      minPower: 0,
      maxPower: 1000,
      minYear: 2000,
      maxYear: new Date().getFullYear()
    });
  };

  const hasActiveFilters = useMemo(() => {
    return filters.brand !== '' || 
           filters.category !== '' || 
           filters.fuelType !== '' ||
           filters.minPower !== 0 ||
           filters.maxPower !== 1000 ||
           filters.minYear !== 2000 ||
           filters.maxYear !== new Date().getFullYear();
  }, [filters]);

  return {
    filteredCars,
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    resultCount: filteredCars.length
  };
};

export const useCarComparison = () => {
  const [comparisonList, setComparisonList] = useState<Car[]>([]);
  const maxComparisons = 3;

  const addToComparison = (car: Car) => {
    setComparisonList(prev => {
      if (prev.find(c => c.id === car.id)) return prev;
      if (prev.length >= maxComparisons) return prev;
      return [...prev, car];
    });
  };

  const removeFromComparison = (carId: string) => {
    setComparisonList(prev => prev.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (carId: string) => {
    return comparisonList.some(car => car.id === carId);
  };

  const canAddMore = comparisonList.length < maxComparisons;

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddMore,
    count: comparisonList.length,
    maxComparisons
  };
};
