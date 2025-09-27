
import React, { useState, useEffect } from 'react';
import { Parameter } from '../types';
import { PARAMETERS, PARAMETERS_DATA, PARAMETER_COST_MULTIPLIER } from '../constants';

interface CalculationStep {
  description: string;
  cost: number;
  formula: string;
}

const ParameterCalculator: React.FC = () => {
  const [parameter, setParameter] = useState<Parameter>('Punti Ferita');
  const [baseValue, setBaseValue] = useState<string>('20');
  const [currentBonus, setCurrentBonus] = useState<string>('0');
  const [targetBonus, setTargetBonus] = useState<string>('1');

  const [cost, setCost] = useState<number>(0);
  const [steps, setSteps] = useState<CalculationStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseValueNum = parseInt(baseValue, 10) || 0;
    const currentBonusNum = parseInt(currentBonus, 10) || 0;
    const targetBonusNum = parseInt(targetBonus, 10) || 0;

    // Reset
    setCost(0);
    setSteps([]);
    setError(null);

    // Validation
    if (baseValueNum <= 0) {
      setError('Il valore base deve essere maggiore di 0.');
      return;
    }
    if (targetBonusNum > baseValueNum) {
      setError(`Il bonus non può superare il valore base (${baseValueNum}). Il valore massimo del parametro è il doppio del suo valore base.`);
      return;
    }
    if (targetBonusNum <= currentBonusNum) {
      return;
    }

    let totalCost = 0;
    const newSteps: CalculationStep[] = [];
    const selectedParameterInfo = PARAMETERS_DATA.find(p => p.name === parameter);
    if (!selectedParameterInfo) return;

    for (let bonusToReach = currentBonusNum + 1; bonusToReach <= targetBonusNum; bonusToReach++) {
      const stepCost = PARAMETER_COST_MULTIPLIER * (bonusToReach + 1);
      totalCost += stepCost;

      let description = `Da Bonus ${bonusToReach - 1} a ${bonusToReach}`;
      if (selectedParameterInfo.name === 'Punti Mana') {
        description += ` (+${selectedParameterInfo.multiplier} Mana)`;
      }

      newSteps.push({
        description,
        cost: stepCost,
        formula: `${PARAMETER_COST_MULTIPLIER} x (${bonusToReach} + 1)`,
      });
    }

    setCost(totalCost);
    setSteps(newSteps);
  }, [parameter, baseValue, currentBonus, targetBonus]);
  
  const getFinalValue = () => {
    const baseValueNum = parseInt(baseValue, 10) || 0;
    const targetBonusNum = parseInt(targetBonus, 10) || 0;
    const selectedParameterInfo = PARAMETERS_DATA.find(p => p.name === parameter);
    if (!selectedParameterInfo) return { total: 0, bonus: 0 };

    const bonusValue = targetBonusNum * selectedParameterInfo.multiplier;
    const total = baseValueNum + bonusValue;
    return { total, bonus: bonusValue };
  };

  const finalValue = getFinalValue();

  // Styling constants
  const selectClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";
  const inputClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";

  return (
    <div>
      <h2 className="text-3xl font-serif text-amber-300 mb-6">Aumento Parametro</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <label htmlFor="parameter-select" className="block text-sm font-bold text-slate-400 mb-2">Parametro/Risorsa</label>
          <select id="parameter-select" value={parameter} onChange={e => setParameter(e.target.value as Parameter)} className={selectClasses}>
            {PARAMETERS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="base-value" className="block text-sm font-bold text-slate-400 mb-2">Valore Base</label>
          <input id="base-value" type="number" value={baseValue} onChange={e => setBaseValue(e.target.value)} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="current-bonus" className="block text-sm font-bold text-slate-400 mb-2">Bonus Attuale</label>
          <input id="current-bonus" type="number" value={currentBonus} onChange={e => setCurrentBonus(e.target.value)} className={inputClasses} />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <label htmlFor="target-bonus" className="block text-sm font-bold text-slate-400 mb-2">Bonus da Raggiungere</label>
          <input id="target-bonus" type="number" value={targetBonus} onChange={e => setTargetBonus(e.target.value)} className={inputClasses} />
        </div>
      </div>
      
      {/* Results */}
      <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-slate-300 mb-4">Risultato del Calcolo</h3>
        {error ? (
          <p className="text-red-400 bg-red-900/30 p-3 rounded-md">{error}</p>
        ) : cost > 0 ? (
          <>
            <div className="mb-6 space-y-2">
              <div>
                <p className="text-slate-400">Costo Totale:</p>
                <p className="text-4xl font-bold text-amber-400">{cost.toLocaleString('it-IT')} <span className="text-2xl text-amber-200">PS</span></p>
              </div>
              <div>
                 <p className="text-slate-400">Valore Finale del Parametro:</p>
                 <p className="text-2xl font-bold text-white">{finalValue.total} <span className="text-base font-normal text-slate-400">({baseValue} base + {finalValue.bonus} bonus)</span></p>
              </div>
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
          <p className="text-slate-400">Inserisci i valori e seleziona un bonus da raggiungere più alto di quello attuale per calcolare il costo.</p>
        )}
      </div>
    </div>
  );
};

export default ParameterCalculator;
