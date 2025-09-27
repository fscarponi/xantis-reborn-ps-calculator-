
import React, { useState } from 'react';
import { CalculatorMode } from './types';
import DiceCalculator from './components/DiceCalculator';
import SkillCalculator from './components/SkillCalculator';
import SpecialCalculator from './components/SpecialCalculator';
import ParameterCalculator from './components/ParameterCalculator';
import TabButton from './components/TabButton';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>('dice');

  const renderCalculator = () => {
    switch (mode) {
      case 'dice':
        return <DiceCalculator />;
      case 'skill':
        return <SkillCalculator />;
      case 'special':
        return <SpecialCalculator />;
      case 'parameter':
        return <ParameterCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl font-serif text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            Calcolatore Punti Sviluppo
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Calcola il costo per migliorare le caratteristiche del tuo personaggio.
          </p>
        </header>

        <main>
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-8 border-b-2 border-slate-700 pb-4">
            <TabButton onClick={() => setMode('dice')} isActive={mode === 'dice'}>Dado</TabButton>
            <TabButton onClick={() => setMode('skill')} isActive={mode === 'skill'}>Abilità</TabButton>
            <TabButton onClick={() => setMode('special')} isActive={mode === 'special'}>Speciale</TabButton>
            <TabButton onClick={() => setMode('parameter')} isActive={mode === 'parameter'}>Parametro</TabButton>
          </div>

          <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700 ring-1 ring-black/5">
            {renderCalculator()}
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Creato per il tuo gioco di ruolo preferito.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;