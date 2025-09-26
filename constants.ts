import { Die, Skill } from './types';

export const DICE_OPTIONS: Die[] = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20'];

export const DICE_VALUES: Record<Die, number> = {
  d2: 2,
  d4: 4,
  d6: 6,
  d8: 8,
  d10: 10,
  d12: 12,
  d20: 20,
};

export interface SkillInfo {
  name: Skill;
  type: 'Naturale' | 'Specializzata';
}

export const SKILLS_DATA: SkillInfo[] = [
  { name: 'Conoscenza', type: 'Specializzata' },
  { name: 'Magia Runica', type: 'Specializzata' },
  { name: 'Elementalista', type: 'Specializzata' },
  { name: 'Preghiera', type: 'Specializzata' },
  { name: 'BARDICA', type: 'Specializzata' },
  { name: 'Guerriero', type: 'Naturale' },
  { name: 'Esploratore', type: 'Naturale' },
  { name: 'Sotterfugi', type: 'Naturale' },
  { name: 'Furtività', type: 'Naturale' },
  { name: 'Atletica', type: 'Naturale' },
  { name: 'Oratore', type: 'Specializzata' },
  { name: 'Alchimia', type: 'Specializzata' },
  { name: 'Geniere', type: 'Specializzata' },
  { name: 'Costruire oggetti', type: 'Specializzata' },
  { name: 'Costruire edifici', type: 'Specializzata' },
  { name: 'Forgiare', type: 'Specializzata' },
];

export const SKILLS: Skill[] = SKILLS_DATA.map(s => s.name);


export const DICE_COST_MULTIPLIER = 50;

// Skill Costs
export const SPECIALIZED_UNTRAINED_COST = 100;
export const NATURAL_UNTRAINED_COST = 50;
export const NATURAL_WITH_MASTER_MULTIPLIER = 25;
export const SPECIALIZED_WITH_MASTER_MULTIPLIER = 100;
export const NATURAL_WITHOUT_MASTER_MULTIPLIER = 50;