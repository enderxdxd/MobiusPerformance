import { Stage } from '@/types/stage';
import { stage1 } from './stage1';
import { stage2 } from './stage2';
import { stage3 } from './stage3';
import { stage4 } from './stage4';

export const allStages: Stage[] = [stage1, stage2, stage3, stage4];
export const stages: Stage[] = [stage1, stage2, stage3, stage4];

export const getStageById = (id: number): Stage | undefined => {
  return allStages.find(stage => stage.id === id);
};

export const getStagesByDifficulty = (difficulty: string): Stage[] => {
  return allStages.filter(stage => stage.difficulty === difficulty);
};

export const getPopularStages = (): Stage[] => {
  return allStages.filter(stage => stage.popularity > 70);
};

export { stage1, stage2, stage3, stage4 };
