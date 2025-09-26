
import React, { useState, useEffect } from 'react';
import { Skill } from '../types';
import { SKILLS, SKILL_COST_MULTIPLIER } from '../constants';

const SkillCalculator: React.FC = () => {
  const [skill, setSkill] = useState<Skill>('Guerriero');
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    const start = Math.floor(Math.max(0, currentLevel));
    const end = Math.floor(Math.max(0, targetLevel));

    if (end <= start) {
      setCost(0);
      return;
    }

    let totalCost = 0;
    for (let i = start + 1; i <= end; i++) {
      totalCost += i * SKILL_COST_MULTIPLIER;
    }
    setCost(totalCost);
  }, [currentLevel, targetLevel]);

  const selectClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";
  const inputClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";

  return (
    <div>
      <h2 className="text-3xl font-serif text-amber-300 mb-6">Aumento Abilità</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
        <div className="md:col-span-3">
          <label htmlFor="skill" className="block text-sm font-bold text-slate-400 mb-2">Abilità</label>
          <select 
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value as Skill)}
            className={selectClasses}
          >
            {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="current-level" className="block text-sm font-bold text-slate-400 mb-2">Livello Attuale</label>
          <input
            id="current-level"
            type="number"
            min="0"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(parseInt(e.target.value, 10) || 0)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="target-level" className="block text-sm font-bold text-slate-400 mb-2">Livello Desiderato</label>
          <input
            id="target-level"
            type="number"
            min={currentLevel + 1}
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10) || 0)}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-slate-300 mb-4">Risultato del Calcolo</h3>
        {cost > 0 ? (
          <div>
            <p className="text-slate-400">Costo Totale:</p>
            <p className="text-4xl font-bold text-amber-400">{cost.toLocaleString('it-IT')} <span className="text-2xl text-amber-200">Punti Sviluppo</span></p>
            <p className="text-xs text-slate-500 mt-2">(Formula Esempio: Nuovo Livello x {SKILL_COST_MULTIPLIER})</p>
          </div>
        ) : (
          <p className="text-slate-400">Seleziona un livello desiderato più alto di quello attuale per calcolare il costo.</p>
        )}
      </div>
    </div>
  );
};

export default SkillCalculator;
