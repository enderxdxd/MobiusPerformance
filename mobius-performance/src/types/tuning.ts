export interface TuningStage {
  id: number;
  name: string;
  description: string;
  modifications: string[];
  requirements: string[];
  price: {
    min: number;
    max: number;
  };
  duration: string;
  warranty: string;
  gains: {
    hpIncrease: number;
    torqueIncrease: number;
    hpPercentage: number;
    torquePercentage: number;
  };
  compatibility: string[];
  featured: boolean;
}

export interface TuningResult {
  carId: string;
  stage: number;
  before: PowerData;
  after: PowerData;
  dynoChart: DynoData[];
  modifications: string[];
  cost: number;
  completionDate: string;
  warranty: string;
}

export interface PowerData {
  hp: number;
  torque: number;
  rpm: number;
  powerCurve: PowerPoint[];
  torqueCurve: PowerPoint[];
}

export interface PowerPoint {
  rpm: number;
  value: number;
}

export interface DynoData {
  rpm: number;
  hp: number;
  torque: number;
  airFuelRatio?: number;
  boost?: number;
}

export interface TuningPackage {
  id: string;
  name: string;
  stages: TuningStage[];
  totalPrice: number;
  description: string;
  duration: string;
  includes: string[];
  popular: boolean;
}
