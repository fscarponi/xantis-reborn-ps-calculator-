import React, { useState, useEffect } from 'react';
import { Skill } from '../types';
import { 
  SKILLS, 
  SKILLS_DATA,
  SPECIALIZED_UNTRAINED_COST,
  NATURAL_UNTRAINED_COST,
  NATURAL_WITH_MASTER_MULTIPLIER,
  SPECIALIZED_WITH_MASTER_MULTIPLIER,
  NATURAL_WITHOUT_MASTER_MULTIPLIER,
} from '../constants';

interface CalculationStep {
  description: string;
  cost: number;
  formula: string;
}

const SkillCalculator: React.FC = () => {
  const [skill, setSkill] = useState<Skill>('Guerriero');
  const [isUntrained, setIsUntrained] = useState<boolean>(true);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  const [withMaster, setWithMaster] = useState<boolean>(true);
  
  const [cost, setCost] = useState<number>(0);
  const [steps, setSteps] = useState<CalculationStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startLevel = isUntrained ? -1 : Math.floor(Math.max(0, currentLevel));
    const endLevel = Math.floor(Math.max(0, targetLevel));

    const selectedSkillInfo = SKILLS_DATA.find(s => s.name === skill);
    if (!selectedSkillInfo) return;

    // Reset
    setCost(0);
    setSteps([]);
    setError(null);

    // Validation
    if (endLevel <= startLevel) {
      return;
    }
    
    if (selectedSkillInfo.type === 'Specializzata' && !withMaster && startLevel >= 0) {
      setError('Le abilità specializzate non possono essere aumentate oltre il livello 0 senza un maestro.');
      return;
    }

    let totalCost = 0;
    const newSteps: CalculationStep[] = [];

    for (let levelToReach = startLevel + 1; levelToReach <= endLevel; levelToReach++) {
      let stepCost = 0;
      let formula = '';

      if (levelToReach === 0) { // From Untrained to 0
        if (selectedSkillInfo.type === 'Specializzata') {
          stepCost = SPECIALIZED_UNTRAINED_COST;
          formula = `Costo base specializzata`;
        } else {
          stepCost = NATURAL_UNTRAINED_COST;
          formula = `Costo base naturale`;
        }
        newSteps.push({ description: `Da Non Ancora Appresa a 0`, cost: stepCost, formula });
      } else { // From 0 upwards
        let multiplier = 0;
        let maestroText = '';

        if (selectedSkillInfo.type === 'Naturale') {
          if (withMaster) {
            multiplier = NATURAL_WITH_MASTER_MULTIPLIER;
            maestroText = ' (con Maestro)';
          } else {
            multiplier = NATURAL_WITHOUT_MASTER_MULTIPLIER;
            maestroText = ' (senza Maestro)';
          }
        } else { // Specializzata
          // This path is only taken if withMaster is true, due to validation above
          multiplier = SPECIALIZED_WITH_MASTER_MULTIPLIER;
          maestroText = ' (con Maestro)';
        }

        stepCost = (levelToReach + 1) * multiplier;
        formula = `(Liv. ${levelToReach} + 1) x ${multiplier}${maestroText}`;
        newSteps.push({ description: `Da ${levelToReach - 1} a ${levelToReach}`, cost: stepCost, formula });
      }
      totalCost += stepCost;
    }
    
    setCost(totalCost);
    setSteps(newSteps);

  }, [skill, isUntrained, currentLevel, targetLevel, withMaster]);

  const selectClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";
  const inputClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";
  const checkboxLabelClasses = "flex items-center space-x-3 cursor-pointer text-slate-300";
  const checkboxClasses = "h-5 w-5 rounded bg-slate-700 border-slate-500 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-800";

  return (
    <div>
      <h2 className="text-3xl font-serif text-amber-300 mb-6">Aumento Abilità</h2>
      
      {/* Skill Selection */}
      <div className="mb-6">
        <label htmlFor="skill" className="block text-sm font-bold text-slate-400 mb-2">Abilità</label>
        <select id="skill" value={skill} onChange={(e) => setSkill(e.target.value as Skill)} className={selectClasses}>
          {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Levels and Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Current Level */}
        <div>
          <label className="block text-sm font-bold text-slate-400 mb-2">Valore attuale</label>
          <div className='flex items-center space-x-4'>
            <div className='bg-slate-900 border border-slate-600 rounded-md p-3 flex-grow'>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" checked={isUntrained} onChange={(e) => setIsUntrained(e.target.checked)} className={checkboxClasses} />
                <span>Non Ancora Appresa</span>
              </label>
            </div>
            {!isUntrained && (
              <input
                id="current-level"
                type="number"
                min="0"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10) || 0)}
                className={`${inputClasses} w-28`}
                aria-label="Valore attuale"
              />
            )}
          </div>
        </div>

        {/* Target Level */}
        <div>
          <label htmlFor="target-level" className="block text-sm font-bold text-slate-400 mb-2">Valore da raggiungere</label>
          <input
            id="target-level"
            type="number"
            min={(isUntrained ? -1 : currentLevel) + 1}
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10) || 0)}
            className={inputClasses}
          />
        </div>

        {/* With Master Toggle */}
        <div className="md:col-span-2 flex justify-center mt-2">
            <div className='bg-slate-900 border border-slate-600 rounded-md p-3'>
                <label className={checkboxLabelClasses}>
                    <input type="checkbox" checked={withMaster} onChange={(e) => setWithMaster(e.target.checked)} className={checkboxClasses} />
                    <span>Progressione con Maestro</span>
                </label>
            </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-slate-300 mb-4">Risultato del Calcolo</h3>
        {error ? (
          <p className="text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>
        ) : cost > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-400">Costo Totale:</p>
              <p className="text-4xl font-bold text-amber-400">{cost.toLocaleString('it-IT')} <span className="text-2xl text-amber-200">PS</span></p>
            </div>
            <div>
              <p className="text-slate-400 mb-2 font-semibold">Dettagli del Calcolo:</p>
              <ul className="space-y-2 text-slate-300">
                {steps.map((step, index) => (
                  <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-slate-800 rounded-md">
                    <span>{step.description}:</span>
                    <div className="text-right">
                        <span className="font-mono text-amber-300">{step.cost} PS</span>
                        <p className="text-xs text-slate-500 font-mono">{step.formula}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-slate-400">Seleziona un valore da raggiungere più alto per calcolare il costo.</p>
        )}
      </div>
    </div>
  );
};

export default SkillCalculator;