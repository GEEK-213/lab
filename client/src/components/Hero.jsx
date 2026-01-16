import React from 'react';
import { ArrowRight, Play, CheckCircle2, Leaf, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <section className="hero-section">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="hero-blob bg-emerald-400" style={{ top: '-10%', right: '-5%', width: '500px', height: '500px' }} />
        <div className="hero-blob bg-teal-400" style={{ bottom: '-10%', left: '-10%', width: '600px', height: '600px', animationDelay: '2s' }} />
      </div>

      <div className="container-custom w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center lg:gap-20">
          
          {/* Left Content */}
          <div className="flex flex-col gap-8 lg:w-1/2 animate-fade-in lg:pr-4">
            {/* Pill Badge */}
            <div className="badge">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>AI-Driven Carbon Reporting</span>
            </div>

            {/* Heading */}
            <h1 className="heading-display">
              Sustainability, <br/>
              <span className="text-gradient-primary">
                Reshaped by AI.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-light">
              Transform your environmental impact with real-time analytics. 
              Optimize resources and achieve net-zero faster than ever before.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <button 
                onClick={onStart}
                className="btn btn-primary group"
              >
                Start Free Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="btn btn-secondary">
                <Play className="w-5 h-5 fill-current" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Instant Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>ISO 14001 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>24/7 Monitoring</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:w-1/2 relative perspective-1000">
            {/* Main Image Card */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/20 border-4 border-white dark:border-white/5 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
                alt="Eco-friendly office" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              
              {/* Overlay Stat - Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500 rounded-xl">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white">
                      <p className="text-xs font-medium opacity-80">Carbon Saved</p>
                      <p className="text-lg font-bold">2,543 kg</p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="text-emerald-300 flex items-center gap-1 font-semibold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */ }
            <div className="absolute -top-12 -right-12 z-0 hidden lg:block">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500/20 animate-spin-slow">
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8"/>
              </svg>
            </div>

            {/* Stat Card Floating */}
            <div className="absolute top-10 -left-12 lg:-left-16 z-20 animate-float-delayed hidden sm:block">
               <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">EFFICIENCY</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">98%</div>
                  <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

