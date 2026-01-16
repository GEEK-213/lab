import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';

export default function Navbar({ setView }) {
  const [theme, toggleTheme] = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-custom flex h-20 items-center justify-between">
        
        {/* 1. Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('landing')}
        >
          <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
            <Leaf className="w-6 h-6 text-white fill-white/20" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Eco<span className="text-emerald-500">Solutions</span>
          </span>
        </div>
        
        {/* 2. Desktop Navigation (Visible on Large screens) */}
        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setView('landing')}
            className="nav-link hover:text-emerald-500 transition-colors"
          >
            Home
          </button>
          {/* Removed empty broken button here */}
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 fill-slate-600/20" />
            )}
          </button>

          <button 
            onClick={() => setView('audit')}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* 3. Mobile Menu Button (Visible until Large screens) */}
        {/* FIXED: Changed md:hidden to lg:hidden to prevent disappearing menu on tablets */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-4 shadow-2xl lg:hidden animate-fade-in z-50">
           <div className="flex flex-col gap-2">
            <button 
              onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }}
              className="text-left px-4 py-3 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Home
            </button>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
            <button 
              onClick={() => { setView('audit'); setIsMobileMenuOpen(false); }}
              className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              Start Free Audit
            </button>
           </div>
        </div>
      )}
    </nav>
  );
}