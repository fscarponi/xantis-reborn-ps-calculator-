
import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
  const activeClasses = "bg-amber-500 text-slate-900 shadow-lg scale-105";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

export default TabButton;
