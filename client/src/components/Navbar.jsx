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
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setView('landing')}
        >
          <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20">
            <Leaf className="w-6 h-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Re<span className="text-emerald-500">New</span>
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setView('landing')}
            className="nav-link"
          >
            Home
          </button>
          <button 
            className="nav-link"
          >
            Features
          </button>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="nav-link p-2"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button 
            onClick={() => setView('audit')}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500"
          >
             {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-900 dark:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shadow-xl md:hidden animate-fade-in">
           <div className="flex flex-col gap-4">
            <button 
              onClick={() => { setView('landing'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-slate-900 dark:text-white"
            >
              Home
            </button>
            <button 
              onClick={() => { setView('audit'); setIsMobileMenuOpen(false); }}
              className="w-full h-11 rounded-lg bg-emerald-500 text-white font-bold"
            >
              Get Started
            </button>
           </div>
        </div>
      )}
    </nav>
  );
}
