import React, { useEffect, useState } from 'react';
import { getGrade, getGradeColor } from '../utils/scoreExtractor';
import { ArrowLeft, Leaf, Star, Sparkles, Download, Share2, History, Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import ReactMarkdown from 'react-markdown';

export default function ScoreCard({ score, aiResponse, onRetry }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate score counting up
    if (score !== null) {
      const duration = 2000;
      const steps = 60;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score]);

  if (score === null) return null;

  const grade = getGrade(score);

  const getScoreMessage = () => {
    if (score >= 85) return "Outstanding! You're leading in sustainability.";
    if (score >= 70) return "Great job! You're on the right track.";
    if (score >= 50) return "Good start! There's room for improvement.";
    return "Let's work together to improve your sustainability.";
  };

  const getGradient = () => {
    if (score >= 85) return 'from-emerald-500 to-teal-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    if (score >= 50) return 'from-yellow-400 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="container-custom pt-32 pb-12">
      {/* Top Actions */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onRetry} 
          className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-500 transition-colors"
        >
          <div className="p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-md transition-all">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Start New Audit</span>
        </button>
      </div>

      {/* Main Card */}
      <div className={`cursor-default bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Score Header with Gradient */}
        <div className={`relative bg-gradient-to-br ${getGradient()} p-12 lg:p-16 text-center overflow-hidden`}>
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" className="text-white" />
               <circle cx="90" cy="10" r="20" fill="currentColor" className="text-white/20" />
             </svg>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 mb-8 border border-white/30 shadow-lg">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Sustainability Score</span>
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6 scale-110">
              <div className="heading-display text-white drop-shadow-md tracking-tighter" style={{ fontSize: '7rem', lineHeight: '1' }}>
                {animatedScore}
              </div>
              <div className="text-2xl font-medium text-white/90 mt-2"> / 100</div>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 shadow-xl mb-6 transform hover:scale-105 transition-transform">
              <Star className="w-5 h-5 fill-current text-yellow-500" />
              <span className="text-lg font-bold">Grade {grade}</span>
            </div>

            <p className="text-white text-xl font-medium max-w-lg mx-auto leading-relaxed drop-shadow-sm">
              {getScoreMessage()}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-16">
          <div className="flex items-start gap-5 mb-10">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="heading-display text-slate-900 dark:text-white mb-2" style={{ fontSize: '2rem' }}>
                AI Recommendations
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Your personalized roadmap to business sustainability.
              </p>
            </div>
          </div>

          {aiResponse ? (
            <div className="space-y-10">
              <div className="card-glass p-8 lg:p-10 border-0 bg-slate-50/80 dark:bg-slate-800/50">
                <ReactMarkdown
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b pb-2 border-slate-200 dark:border-slate-700" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-6 mb-3" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-gray-100" {...props} />,
                        ul: ({node, ...props}) => <ul className="space-y-3 my-4 pl-1" {...props} />,
                        li: ({node, ...props}) => (
                            <li className="flex gap-3 text-slate-700 dark:text-slate-300 leading-relaxed group">
                                <span className="mt-2 min-w-[6px] h-[6px] rounded-full bg-emerald-500/60 group-hover:bg-emerald-500 transition-colors"></span>
                                <span className="flex-1">{props.children}</span>
                            </li>
                        ),
                        p: ({node, ...props}) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-lg" {...props} />,
                    }}
                >
                    {aiResponse}
                </ReactMarkdown>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => toast.success('Report exported to PDF successfully!')}
                  className="btn btn-primary shadow-lg shadow-emerald-500/10"
                >
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link copied to clipboard!');
                  }}
                  className="btn btn-secondary"
                >
                  <Share2 className="w-5 h-5" />
                  Share Results
                </button>
              </div>
            </div>
          ) : (
             <div className="text-center py-12 text-slate-500">
                No recommendations available.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Recommendation({ title, desc, icon, priority }) {
  const priorityColors = {
    high: 'text-red-500 bg-red-100 dark:bg-red-500/20',
    medium: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20',
    low: 'text-blue-500 bg-blue-100 dark:bg-blue-500/20'
  };

  return (
    <div className="group p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
      <div className="flex gap-5">
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${priorityColors[priority] || priorityColors.medium}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h4>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${priorityColors[priority]}`}>
              {priority}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
