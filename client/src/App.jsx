import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuditForm from './components/AuditForm';
import ScoreCard from './components/ScoreCard';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'audit', 'result'
  const [score, setScore] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);

  const handleResult = (result) => {
    setScore(result.score);
    setAiResponse(result.response);
    setView('result');
  };

  return (
    <div className="font-display bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#13ec6d',
              secondary: '#102218',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* 1. Header Component */}
      <Navbar setView={setView} />

      {/* 2. Main Content Routing */}
      {view === 'landing' && (
        <Hero onStart={() => setView('audit')} />
      )}

      {view === 'audit' && (
        <AuditForm onResult={handleResult} />
      )}

      {view === 'result' && (
        <ScoreCard score={score} aiResponse={aiResponse} onRetry={() => setView('audit')} />
      )}

    </div>
  );
}