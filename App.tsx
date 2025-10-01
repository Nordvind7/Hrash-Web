import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Designer from './components/Designer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'landing' | 'designer'>('landing');

  const handleStart = () => {
    setAppState('designer');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
      {appState === 'landing' ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <Designer />
      )}
    </div>
  );
};

export default App;
