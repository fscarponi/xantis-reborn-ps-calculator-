
export type Die = 'd2' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export type Skill = 
  | 'Conoscenza'
  | 'Magia Runica'
  | 'Elementalista'
  | 'Preghiera'
  | 'BARDICA'
  | 'Guerriero'
  | 'Esploratore'
  | 'Sotterfugi'
  | 'Furtività'
  | 'Atletica'
  | 'Oratore'
  | 'Alchimia'
  | 'Geniere'
  | 'Costruire oggetti'
  | 'Costruire edifici'
  | 'Forgiare';

export type Parameter = 
  | 'Punti Ferita'
  | 'Punti Mente'
  | 'Punti Sociali'
  | 'Punti Spirituali'
  | 'Punti Percezione'
  | 'Punti Mana'
  | 'Peso Fisico'
  | 'Peso Magico'
  | 'Iniziativa';

export type CalculatorMode = 'dice' | 'skill' | 'special' | 'parameter';