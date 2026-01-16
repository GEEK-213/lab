import React, { useEffect, useState } from 'react';
import { getGrade, getGradeColor } from '../utils/scoreExtractor';
import { ArrowLeft, Download, Share2, FileText, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

export default function ScoreCard({ score, aiResponse, onRetry }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (score !== null) {
      const duration = 1500;
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
  const gradeColor = getGradeColor(score);
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    // ✅ FIX 1: Added 'pt-24' (Padding Top) to clear the Navbar
    // ✅ FIX 2: Added 'z-0' to ensure it sits behind any floating elements
    <div className={`container-custom pt-24 pb-12 relative z-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <button 
            onClick={onRetry} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-65" />
            <span className="text-sm font-semibold">Back to Audit</span>
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Audit Dashboard</h1>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => toast.success('Exporting PDF...')}
            className="btn btn-secondary text-sm px-4 py-2"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied!');
            }}
            className="btn btn-primary text-sm px-4 py-2"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* ✅ FIX 3: Changed grid breakpoint from 'lg' to 'xl' to prevent tablet overlap */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Metrics */}
        <div className="xl:col-span-4 space-y-6">
          <div className="card-glass p-8 flex flex-col items-center justify-center bg-white dark:bg-slate-900/50">
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-6 uppercase tracking-wider">Overall Score</h3>
            
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96" cy="96" r={radius}
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="12" fill="none"
                />
                <circle
                  cx="96" cy="96" r={radius}
                  className={`stroke-current transition-all duration-1000 ease-out ${gradeColor}`}
                  strokeWidth="12" fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* ✅ FIX 4: Responsive text size so 100 doesn't overflow */}
                <span className="text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">
                  {animatedScore}
                </span>
                <span className="text-sm font-medium text-slate-400">/ 100</span>
              </div>
            </div>

            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${grade.includes('A') ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
              Grade: {grade}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card-glass p-5 bg-white dark:bg-slate-900/50 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500 mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 uppercase font-bold">Potential</span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">High</span>
            </div>
            <div className="card-glass p-5 bg-white dark:bg-slate-900/50 flex flex-col items-center text-center">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-500 mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-500 uppercase font-bold">Priority</span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">Immediate</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Report */}
        <div className="xl:col-span-8">
          <div className="card-glass h-full bg-white dark:bg-slate-900/50 p-8 lg:p-10 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Executive Analysis</h3>
                <p className="text-sm text-slate-500">Generated by Gemini 1.5 Flash</p>
              </div>
            </div>

            {/* ✅ FIX 5: 'prose-sm' on mobile to prevent text overflow */}
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b pb-2 border-slate-200 dark:border-slate-800" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-4 mb-2" {...props} />,
                  ul: ({node, ...props}) => <ul className="space-y-3 my-4 pl-0" {...props} />,
                  li: ({node, ...props}) => (
                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{props.children}</span>
                    </li>
                  ),
                }}
              >
                {aiResponse}
              </ReactMarkdown>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}