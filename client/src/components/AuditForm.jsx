import React, { useState } from "react";
import toast from 'react-hot-toast';
import { auditService } from '../services/api';
import { extractScore } from '../utils/scoreExtractor';
import { useFormAutoSave } from '../hooks/useLocalStorage';
import { Building2, FileText, Cloud, Home, Recycle, Zap, Trash2, AlertCircle, ArrowRight, Activity, Loader2 } from 'lucide-react';

const AuditForm = ({ onResult }) => {
  const [formData, updateFormData, resetFormData] = useFormAutoSave('auditFormData', {
    text: "",
    paperUsage: "",
    cloudSpending: "",
    remotePercent: "",
    disposableCost: "",
    electricityUsage: "",
    wasteVolume: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = 'Business description is required';
    }

    const numericFields = {
      paperUsage: 'Paper usage',
      cloudSpending: 'Cloud spending',
      remotePercent: 'Remote percentage',
      disposableCost: 'Disposable items cost',
      electricityUsage: 'Electricity usage',
      wasteVolume: 'Waste volume'
    };

    Object.keys(numericFields).forEach(field => {
      const value = formData[field];
      if (value === "" || value === null || value === undefined) {
        newErrors[field] = `${numericFields[field]} is required`;
      } else if (isNaN(Number(value)) || Number(value) < 0) {
        newErrors[field] = `Please enter a valid number for ${numericFields[field].toLowerCase()}`;
      }
    });

    if (formData.remotePercent && (Number(formData.remotePercent) < 0 || Number(formData.remotePercent) > 100)) {
      newErrors.remotePercent = 'Remote percentage must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Analyzing your business metrics...', {
      duration: 10000,
    });

    try {
      const res = await auditService.submitAudit({
        ...formData,
        paperUsage: Number(formData.paperUsage),
        cloudSpending: Number(formData.cloudSpending),
        remotePercent: Number(formData.remotePercent),
        disposableCost: Number(formData.disposableCost),
        electricityUsage: Number(formData.electricityUsage),
        wasteVolume: Number(formData.wasteVolume)
      });

      const aiResponse = res.reply;
      const score = extractScore(aiResponse);
      
      toast.dismiss(loadingToast);
      toast.success('Audit completed successfully! 🎉');
      
      // Clear form data
      resetFormData();
      
      // Pass both score and full response to parent
      onResult({ score, response: aiResponse });

    } catch (err) {
      toast.dismiss(loadingToast);
      const errorMessage = err.userMessage || err.message || 'Failed to get AI response. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-5 py-4 rounded-xl border transition-all duration-200 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const errorInputClasses = "border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-red-500/20";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-6 uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          AI-Powered Analysis
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          Business Sustainability Audit
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
          Fill in your business metrics below. Our AI will analyze your sustainability practices and provide personalized recommendations.
        </p>
      </div>

      {/* Form Card */}
      <div className="relative">
         {/* Decorative Blur */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-[2rem] blur opacity-20 dark:opacity-10"></div>
        
        <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 sm:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-500" />
                Business Description
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputClasses} ${errors.text ? errorInputClasses : ''}`}
                placeholder="Describe your business, products, or services..."
              />
              {errors.text && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.text}
                </p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Paper Usage */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  Paper Usage (reams)
                </label>
                <input
                  type="number"
                  name="paperUsage"
                  value={formData.paperUsage}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className={`${inputClasses} ${errors.paperUsage ? errorInputClasses : ''}`}
                  placeholder="0"
                />
                {errors.paperUsage && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.paperUsage}
                  </p>
                )}
              </div>

              {/* Cloud Spending */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-emerald-500" />
                  Cloud Spending ($)
                </label>
                <input
                  type="number"
                  name="cloudSpending"
                  value={formData.cloudSpending}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className={`${inputClasses} ${errors.cloudSpending ? errorInputClasses : ''}`}
                  placeholder="0.00"
                />
                {errors.cloudSpending && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cloudSpending}
                  </p>
                )}
              </div>

              {/* Remote Percentage */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <Home className="w-5 h-5 text-emerald-500" />
                  Remote Work (%)
                </label>
                <input
                  type="number"
                  name="remotePercent"
                  value={formData.remotePercent}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="1"
                  className={`${inputClasses} ${errors.remotePercent ? errorInputClasses : ''}`}
                  placeholder="0"
                />
                {errors.remotePercent && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.remotePercent}
                  </p>
                )}
              </div>

              {/* Disposable Cost */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-emerald-500" />
                  Disposable Items Cost ($)
                </label>
                <input
                  type="number"
                  name="disposableCost"
                  value={formData.disposableCost}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className={`${inputClasses} ${errors.disposableCost ? errorInputClasses : ''}`}
                  placeholder="0.00"
                />
                {errors.disposableCost && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.disposableCost}
                  </p>
                )}
              </div>

              {/* Electricity Usage */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  Electricity Usage (kWh)
                </label>
                <input
                  type="number"
                  name="electricityUsage"
                  value={formData.electricityUsage}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className={`${inputClasses} ${errors.electricityUsage ? errorInputClasses : ''}`}
                  placeholder="0"
                />
                {errors.electricityUsage && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.electricityUsage}
                  </p>
                )}
              </div>

              {/* Waste Volume */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-emerald-500" />
                  Waste Volume (kg)
                </label>
                <input
                  type="number"
                  name="wasteVolume"
                  value={formData.wasteVolume}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  className={`${inputClasses} ${errors.wasteVolume ? errorInputClasses : ''}`}
                  placeholder="0"
                />
                {errors.wasteVolume && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.wasteVolume}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-3 h-14 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white font-bold hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Your Business...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    <span>Get Sustainability Score</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditForm;
