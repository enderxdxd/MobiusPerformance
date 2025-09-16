import { Car, CarBrand } from '@/types/car';

export const carBrands: CarBrand[] = [
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/images/brands/bmw.svg',
    description: 'Especialistas em performance BMW com foco em motores turbo e aspirados',
    specialty: ['N54', 'N55', 'B58', 'S55', 'S63'],
    models: [
      {
        id: 'bmw-335i-e90',
        brand: 'BMW',
        model: '335i E90',
        year: 2010,
        engine: 'N54',
        displacement: 3000,
        fuelType: 'gasoline',
        transmission: 'automatic',
        drivetrain: 'rwd',
        stockPower: {
          hp: 306,
          torque: 400,
          rpm: 5800,
        },
        images: {
          stock: ['/images/cars/bmw/335i-e90-stock-1.jpg'],
          modified: ['/images/cars/bmw/335i-e90-tuned-1.jpg'],
          thumbnail: '/images/cars/bmw/335i-e90-thumb.jpg',
        },
        category: 'sport',
        availability: true,
        featured: true,
      },
      {
        id: 'bmw-m3-f80',
        brand: 'BMW',
        model: 'M3 F80',
        year: 2016,
        engine: 'S55',
        displacement: 3000,
        fuelType: 'gasoline',
        transmission: 'dsg',
        drivetrain: 'rwd',
        stockPower: {
          hp: 431,
          torque: 550,
          rpm: 7000,
        },
        images: {
          stock: ['/images/cars/bmw/m3-f80-stock-1.jpg'],
          modified: ['/images/cars/bmw/m3-f80-tuned-1.jpg'],
          thumbnail: '/images/cars/bmw/m3-f80-thumb.jpg',
        },
        category: 'sport',
        availability: true,
        featured: true,
      },
    ],
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/images/brands/mercedes.svg',
    description: 'Tuning premium para Mercedes-Benz com foco em AMG e motores turbo',
    specialty: ['M133', 'M176', 'M177', 'M178'],
    models: [
      {
        id: 'mercedes-a45-amg',
        brand: 'Mercedes-Benz',
        model: 'A45 AMG',
        year: 2019,
        engine: 'M133',
        displacement: 2000,
        fuelType: 'gasoline',
        transmission: 'dsg',
        drivetrain: 'awd',
        stockPower: {
          hp: 381,
          torque: 475,
          rpm: 6000,
        },
        images: {
          stock: ['/images/cars/mercedes/a45-amg-stock-1.jpg'],
          modified: ['/images/cars/mercedes/a45-amg-tuned-1.jpg'],
          thumbnail: '/images/cars/mercedes/a45-amg-thumb.jpg',
        },
        category: 'sport',
        availability: true,
        featured: true,
      },
    ],
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/images/brands/audi.svg',
    description: 'Performance Audi com expertise em motores TFSI e TDI',
    specialty: ['EA888', 'EA839', 'CJXB', 'DNWA'],
    models: [
      {
        id: 'audi-rs3-8v',
        brand: 'Audi',
        model: 'RS3 8V',
        year: 2018,
        engine: 'DAZA',
        displacement: 2500,
        fuelType: 'gasoline',
        transmission: 'dsg',
        drivetrain: 'awd',
        stockPower: {
          hp: 400,
          torque: 480,
          rpm: 7000,
        },
        images: {
          stock: ['/images/cars/audi/rs3-8v-stock-1.jpg'],
          modified: ['/images/cars/audi/rs3-8v-tuned-1.jpg'],
          thumbnail: '/images/cars/audi/rs3-8v-thumb.jpg',
        },
        category: 'sport',
        availability: true,
        featured: true,
      },
    ],
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/images/brands/porsche.svg',
    description: 'Tuning Porsche com foco em motores boxer e turbo',
    specialty: ['9A1', 'MA1', 'MA2', '9A2'],
    models: [
      {
        id: 'porsche-911-turbo-s',
        brand: 'Porsche',
        model: '911 Turbo S 992',
        year: 2021,
        engine: '9A2',
        displacement: 3800,
        fuelType: 'gasoline',
        transmission: 'dsg',
        drivetrain: 'awd',
        stockPower: {
          hp: 650,
          torque: 800,
          rpm: 6750,
        },
        images: {
          stock: ['/images/cars/porsche/911-turbo-s-stock-1.jpg'],
          modified: ['/images/cars/porsche/911-turbo-s-tuned-1.jpg'],
          thumbnail: '/images/cars/porsche/911-turbo-s-thumb.jpg',
        },
        category: 'sport',
        availability: true,
        featured: true,
      },
    ],
  },
];

export const cars = carBrands.flatMap(brand => brand.models);

export const getAllCars = (): Car[] => {
  return carBrands.flatMap(brand => brand.models);
};

export const getCarById = (id: string): Car | undefined => {
  return getAllCars().find(car => car.id === id);
};

export const getCarsByBrand = (brandId: string): Car[] => {
  const brand = carBrands.find(b => b.id === brandId);
  return brand ? brand.models : [];
};

export const getFeaturedCars = (): Car[] => {
  return getAllCars().filter(car => car.featured);
};

export const searchCars = (query: string): Car[] => {
  const searchTerm = query.toLowerCase();
  return getAllCars().filter(car => 
    car.brand.toLowerCase().includes(searchTerm) ||
    car.model.toLowerCase().includes(searchTerm) ||
    car.engine.toLowerCase().includes(searchTerm)
  );
};
