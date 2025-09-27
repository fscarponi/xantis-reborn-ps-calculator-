import React, { useState, useMemo } from 'react';
import { TrainingDie } from '../types';
import { TRAINING_DICE_OPTIONS, TRAINING_DICE_VALUES } from '../constants';

interface TrainingTimeCalculatorProps {
  cost: number;
}

const TrainingTimeCalculator: React.FC<TrainingTimeCalculatorProps> = ({ cost }) => {
  const [trainingDie, setTrainingDie] = useState<TrainingDie>('d10');

  const trainingDays = useMemo(() => {
    if (cost <= 0) return 0;
    const dieValue = TRAINING_DICE_VALUES[trainingDie];
    return Math.ceil(cost / dieValue);
  }, [cost, trainingDie]);

  const selectClasses = "w-full p-3 bg-slate-800 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";

  return (
    <div className="mt-6 pt-6 border-t-2 border-slate-700/50">
      <h4 className="text-lg font-bold text-slate-300 mb-4">Calcolo Tempo di Addestramento</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="training-die" className="block text-sm font-bold text-slate-400 mb-2">Dado Di Riferimento</label>
          <select
            id="training-die"
            value={trainingDie}
            onChange={(e) => setTrainingDie(e.target.value as TrainingDie)}
            className={selectClasses}
          >
            {TRAINING_DICE_OPTIONS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm">Tempo Richiesto:</p>
            <p className="text-2xl font-bold text-amber-400">{trainingDays.toLocaleString('it-IT')} <span className="text-lg text-amber-200">giorni</span></p>
        </div>
      </div>
       <p className="text-xs text-slate-500 mt-2">Un personaggio può spendere un numero di Punti Sviluppo pari alla taglia del dado al giorno.</p>
    </div>
  );
};

export default TrainingTimeCalculator;