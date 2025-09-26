
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

export const SKILLS: Skill[] = [
  'Conoscenza',
  'Magia Runica',
  'Elementalista',
  'Preghiera',
  'BARDICA',
  'Guerriero',
  'Esploratore',
  'Sotterfugi',
  'Furtività',
  'Atletica',
  'Oratore',
  'Alchimia',
  'Geniere',
  'Costruire oggetti',
  'Costruire edifici',
  'Forgiare',
];

export const DICE_COST_MULTIPLIER = 50;
export const SKILL_COST_MULTIPLIER = 100;
