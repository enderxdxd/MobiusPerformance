export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  displacement: number;
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'manual' | 'automatic' | 'dsg' | 'cvt';
  drivetrain: 'fwd' | 'rwd' | 'awd' | '4wd';
  stockPower: {
    hp: number;
    torque: number;
    rpm: number;
  };
  images: {
    stock: string[];
    modified: string[];
    thumbnail: string;
  };
  category: 'sport' | 'luxury' | 'suv' | 'compact' | 'truck';
  availability: boolean;
  featured: boolean;
}

export interface CarBrand {
  id: string;
  name: string;
  logo: string;
  models: Car[];
  description: string;
  specialty: string[];
}

export interface CarFilter {
  brand?: string;
  category?: string;
  minPower?: number;
  maxPower?: number;
  fuelType?: string;
  transmission?: string;
  year?: {
    min: number;
    max: number;
  };
}

export interface CarComparison {
  carId: string;
  stage: number;
  before: {
    hp: number;
    torque: number;
  };
  after: {
    hp: number;
    torque: number;
  };
  gains: {
    hp: number;
    torque: number;
    hpPercentage: number;
    torquePercentage: number;
  };
}
