import React, { useState, useEffect } from 'react';
import { Die } from '../types';
import { DICE_OPTIONS, DICE_VALUES, DICE_COST_MULTIPLIER } from '../constants';

interface CalculationStep {
  from: Die;
  to: Die;
  cost: number;
}

const DiceCalculator: React.FC = () => {
  const [startDie, setStartDie] = useState<Die>('d6');
  const [endDie, setEndDie] = useState<Die>('d10');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [steps, setSteps] = useState<CalculationStep[]>([]);

  useEffect(() => {
    const startIndex = DICE_OPTIONS.indexOf(startDie);
    const endIndex = DICE_OPTIONS.indexOf(endDie);

    if (endIndex <= startIndex) {
      setTotalCost(0);
      setSteps([]);
      return;
    }

    const newSteps: CalculationStep[] = [];
    let currentCost = 0;

    for (let i = startIndex; i < endIndex; i++) {
      const from: Die = DICE_OPTIONS[i];
      const to: Die = DICE_OPTIONS[i + 1];
      const stepCost = DICE_VALUES[to] * DICE_COST_MULTIPLIER;
      
      newSteps.push({ from, to, cost: stepCost });
      currentCost += stepCost;
    }
    
    setTotalCost(currentCost);
    setSteps(newSteps);

  }, [startDie, endDie]);

  const selectClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";

  return (
    <div>
      <h2 className="text-3xl font-serif text-amber-300 mb-6">Aumento Dado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
        <div>
          <label htmlFor="start-die" className="block text-sm font-bold text-slate-400 mb-2">Dado Iniziale</label>
          <select 
            id="start-die"
            value={startDie}
            onChange={(e) => setStartDie(e.target.value as Die)}
            className={selectClasses}
          >
            {DICE_OPTIONS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="end-die" className="block text-sm font-bold text-slate-400 mb-2">Dado Finale</label>
          <select 
            id="end-die"
            value={endDie}
            onChange={(e) => setEndDie(e.target.value as Die)}
            className={selectClasses}
          >
            {DICE_OPTIONS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
      
      <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-slate-300 mb-4">Risultato del Calcolo</h3>
        {totalCost > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-400">Costo Totale:</p>
              <p className="text-4xl font-bold text-amber-400">{totalCost.toLocaleString('it-IT')} <span className="text-2xl text-amber-200">Punti Sviluppo</span></p>
            </div>
            <div>
              <p className="text-slate-400 mb-2 font-semibold">Dettagli del Calcolo:</p>
              <ul className="space-y-2 text-slate-300">
                {steps.map((step, index) => (
                  <li key={index} className="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                    <span>Da {step.from.toUpperCase()} a {step.to.toUpperCase()}:</span>
                    <span className="font-mono text-amber-300">{DICE_VALUES[step.to]} x {DICE_COST_MULTIPLIER} = {step.cost} PS</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-6 border-t-2 border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-300 mb-4">Calcolo Tempo di Addestramento</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Dado Sviluppo di Riferimento</label>
                  <div className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-lg font-bold text-center">
                    {startDie.toUpperCase()}
                  </div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg text-center">
                    <p className="text-slate-400 text-sm">Tempo Richiesto:</p>
                    <p className="text-2xl font-bold text-amber-400">
                      {Math.ceil(totalCost / DICE_VALUES[startDie]).toLocaleString('it-IT')} 
                      <span className="text-lg text-amber-200"> giorni</span>
                    </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Per l'aumento di un dado, il tempo di addestramento si calcola usando il dado iniziale come riferimento.</p>
            </div>
          </>
        ) : (
          <p className="text-slate-400">Seleziona un dado finale più grande di quello iniziale per calcolare il costo.</p>
        )}
      </div>
    </div>
  );
};

export default DiceCalculator;