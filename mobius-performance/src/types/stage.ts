export interface Stage {
  id: number;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  modifications: Modification[];
  requirements: string[];
  benefits: string[];
  price: PriceRange;
  duration: string;
  warranty: string;
  popularity: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  reversible: boolean;
}

export interface Modification {
  id: string;
  name: string;
  description: string;
  category: 'software' | 'hardware' | 'exhaust' | 'intake' | 'turbo' | 'engine' | 'suspension' | 'brakes';
  required: boolean;
  price?: number;
  brand?: string;
  partNumber?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  includes: string[];
  excludes?: string[];
}

export interface StageComparison {
  stage: number;
  carId: string;
  before: PerformanceMetrics;
  after: PerformanceMetrics;
  gains: PerformanceGains;
  dynoChart: DynoPoint[];
  modifications: string[];
  testimonial?: Testimonial;
}

export interface PerformanceMetrics {
  hp: number;
  torque: number;
  peakRpm: number;
  redline: number;
  acceleration: {
    zeroToSixty: number;
    zeroToHundred: number;
    quarterMile: number;
  };
  topSpeed?: number;
}

export interface PerformanceGains {
  hp: number;
  torque: number;
  hpPercentage: number;
  torquePercentage: number;
  accelerationImprovement: number;
}

export interface DynoPoint {
  rpm: number;
  hp: number;
  torque: number;
  boost?: number;
  airFuelRatio?: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  carModel: string;
  stage: number;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
}
