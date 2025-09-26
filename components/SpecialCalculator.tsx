import React, { useState, useEffect } from 'react';

interface CalculationStep {
  description: string;
  cost: number;
  formula?: string;
}

const SpecialCalculator: React.FC = () => {
  const [currentSpecialsCount, setCurrentSpecialsCount] = useState<number>(0);
  const [isUntrained, setIsUntrained] = useState<boolean>(true);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(1);
  
  const [cost, setCost] = useState<number>(0);
  const [steps, setSteps] = useState<CalculationStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sync target level when current level or untrained status changes
  useEffect(() => {
    const minTarget = isUntrained ? 1 : currentLevel + 1;
    if (targetLevel < minTarget) {
      setTargetLevel(minTarget);
    }
  }, [isUntrained, currentLevel]);

  useEffect(() => {
    setError(null);
    setSteps([]);
    setCost(0);

    const startLevel = isUntrained ? -1 : Math.floor(Math.max(1, currentLevel));
    const endLevel = Math.floor(Math.max(1, targetLevel));

    if (endLevel <= startLevel) {
        return;
    }

    let totalCost = 0;
    const newSteps: CalculationStep[] = [];

    // 1. Acquisition cost (if applicable)
    if (isUntrained) {
        const currentCount = Math.max(0, Math.floor(currentSpecialsCount));
        const specialNumberToAcquire = currentCount + 1;
        let acquisitionCost = 0;

        if (specialNumberToAcquire <= 3) {
            acquisitionCost = 100;
        } else {
            acquisitionCost = 100 * Math.pow(2, specialNumberToAcquire - 3);
        }
        
        totalCost += acquisitionCost;
        newSteps.push({ description: `Acquisizione ${specialNumberToAcquire}° Speciale (a Liv. 1)`, cost: acquisitionCost });
    }

    // 2. Increase level cost
    const levelUpMultiplier = 100;
    // If untrained, we already paid to get to level 1, so start calculating level-ups from level 1.
    // If trained, start from the current level.
    const loopStartLevel = isUntrained ? 1 : startLevel;

    // The loop starts from the *next* level. So if loopStartLevel is 1, it calculates for level 2.
    for (let levelToReach = loopStartLevel + 1; levelToReach <= endLevel; levelToReach++) {
        const stepCost = (levelToReach + 1) * levelUpMultiplier;
        totalCost += stepCost;
        newSteps.push({
            description: `Da Liv. ${levelToReach - 1} a ${levelToReach}`,
            cost: stepCost,
            formula: `(Liv. ${levelToReach} + 1) x ${levelUpMultiplier}`
        });
    }
    
    setCost(totalCost);
    setSteps(newSteps);

  }, [currentSpecialsCount, isUntrained, currentLevel, targetLevel]);

  // Styling constants
  const inputClasses = "w-full p-3 bg-slate-900 border border-slate-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-lg transition duration-150 ease-in-out";
  const checkboxLabelClasses = "flex items-center space-x-3 cursor-pointer text-slate-300";
  const checkboxClasses = "h-5 w-5 rounded bg-slate-700 border-slate-500 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-800";

  return (
    <div>
      <h2 className="text-3xl font-serif text-amber-300 mb-6">Aumento Speciale</h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        {/* Current Level */}
        <div>
          <label className="block text-sm font-bold text-slate-400 mb-2">Valore attuale</label>
          <div className='flex items-center space-x-4'>
            <div className='bg-slate-900 border border-slate-600 rounded-md p-3 flex-grow'>
              <label className={checkboxLabelClasses}>
                <input type="checkbox" checked={isUntrained} onChange={(e) => setIsUntrained(e.target.checked)} className={checkboxClasses} />
                <span>Non Ancora Appreso</span>
              </label>
            </div>
            {!isUntrained && (
              <input
                id="current-level"
                type="number"
                min="1"
                value={currentLevel}
                onChange={(e) => setCurrentLevel(Math.max(1, parseInt(e.target.value, 10) || 1))}
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
            min={isUntrained ? 1 : currentLevel + 1}
            value={targetLevel}
            onChange={(e) => setTargetLevel(parseInt(e.target.value, 10) || 1)}
            className={inputClasses}
          />
        </div>

        {/* Number of existing specials (only if acquiring) */}
        {isUntrained && (
          <div className="md:col-span-2 mt-2">
            <label htmlFor="current-specials-count" className="block text-sm font-bold text-slate-400 mb-2">
              Speciali già posseduti
              <span className="text-slate-500 font-normal"> (per calcolare costo acquisizione)</span>
            </label>
            <input
              id="current-specials-count"
              type="number"
              min="0"
              value={currentSpecialsCount}
              onChange={(e) => setCurrentSpecialsCount(parseInt(e.target.value, 10) || 0)}
              className={inputClasses}
            />
          </div>
        )}
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
                        <span className="font-mono text-amber-300">{step.cost.toLocaleString('it-IT')} PS</span>
                        {step.formula && (
                           <p className="text-xs text-slate-500 font-mono">{step.formula}</p>
                        )}
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

export default SpecialCalculator;
