import React, { useEffect, useState } from 'react';
import { getGrade, getGradeColor } from '../utils/scoreExtractor';
import { ArrowLeft, Leaf, Star, Sparkles, Download, Share2, History, Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ScoreCard({ score, aiResponse, onRetry }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate score counting up
    if (score !== null) {
      const duration = 2000; // 2 seconds
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
  // We'll map the legacy grade colors to our new design if needed, or just use dynamic classes
  const getGradeColorClass = (grade) => {
      if (grade === 'A') return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20';
      if (grade === 'B') return 'text-blue-500 bg-blue-100 dark:bg-blue-500/20';
      if (grade === 'C') return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20';
      return 'text-red-500 bg-red-100 dark:bg-red-500/20';
  }

  const getScoreMessage = () => {
    if (score >= 85) return "Outstanding! You're leading in sustainability.";
    if (score >= 70) return "Great job! You're on the right track.";
    if (score >= 50) return "Good start! There's room for improvement.";
    return "Let's work together to improve your sustainability.";
  };

  const getGradient = () => {
    if (score >= 85) return 'from-emerald-500 to-teal-400';
    if (score >= 70) return 'from-blue-500 to-cyan-400';
    if (score >= 50) return 'from-yellow-400 to-orange-400';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Back Button */}
      <button 
        onClick={onRetry} 
        className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-500 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Start New Audit
      </button>

      {/* Main Card */}
      <div className={`bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Score Header with Gradient */}
        <div className={`relative bg-gradient-to-br ${getGradient()} p-12 text-center overflow-hidden`}>
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 mb-8 border border-white/20">
              <Leaf className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Sustainability Score</span>
            </div>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="text-8xl lg:text-9xl font-bold text-white tracking-tighter drop-shadow-sm">
                {animatedScore}
              </div>
              <div className="text-xl font-medium text-white/80 mt-2">out of 100</div>
            </div>

            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-900 shadow-xl mb-6`}>
              <Star className="w-5 h-5 fill-current text-yellow-500" />
              <span className="text-lg font-bold">Grade {grade}</span>
            </div>

            <p className="text-white/95 text-xl font-medium max-w-lg mx-auto leading-relaxed">
              {getScoreMessage()}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-12">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                AI-Powered Recommendations
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Actionable insights tailored to your business metrics.
              </p>
            </div>
          </div>

          {aiResponse ? (
            <div className="space-y-8">
              <div className="relative p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {aiResponse}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-slate-900/10">
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <Share2 className="w-5 h-5" />
                  Share Results
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent text-slate-700 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <History className="w-5 h-5" />
                  View History
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <Recommendation
                title="Reduce Electricity Consumption"
                desc="Switch to energy-efficient devices and optimize office lighting. Consider LED bulbs and smart thermostats."
                icon={<TrendingUp className="w-6 h-6" />}
                priority="high"
              />
              <Recommendation
                title="Cut Down Disposable Items"
                desc="Replace single-use items with reusable or recyclable alternatives. Invest in quality, long-lasting products."
                icon={<Leaf className="w-6 h-6" />}
                priority="medium"
              />
               <Recommendation
                title="Improve Waste Management"
                desc="Track waste volume and introduce recycling or composting programs. Partner with local recycling facilities."
                icon={<AlertTriangle className="w-6 h-6" />}
                priority="high"
              />
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
