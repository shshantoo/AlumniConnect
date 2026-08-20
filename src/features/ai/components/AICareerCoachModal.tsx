import React, { useState, useEffect } from 'react';
import { CareerReadinessResult } from '../../career/types/career';
import { generateAICareerAdvice, AICareerAdvice } from '../services/aiCareerCoach';
import { Sparkles, CheckCircle2, ArrowRight, Lightbulb, Bot, RefreshCw } from 'lucide-react';

interface AICareerCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  readiness: CareerReadinessResult;
}

export const AICareerCoachModal: React.FC<AICareerCoachModalProps> = ({
  isOpen,
  onClose,
  readiness,
}) => {
  const [advice, setAdvice] = useState<AICareerAdvice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      generateAICareerAdvice(readiness).then((res) => {
        setAdvice(res);
        setLoading(false);
      });
    }
  }, [isOpen, readiness]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-[#ff5500] text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-900">AI Career Coach</h3>
              <p className="text-xs text-zinc-500">Personalized Career Insights for {readiness.careerTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-800 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ff5500] animate-spin mx-auto" />
            <p className="text-xs font-bold text-zinc-600">Analyzing your readiness score & skill gaps...</p>
          </div>
        ) : advice ? (
          <div className="space-y-5 text-xs relative z-10">
            {/* Summary */}
            <div className="bg-[#fffaf7] border border-[#f8cbb0] p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff5500] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Skill Synthesis</span>
              </span>
              <p className="text-zinc-800 leading-relaxed font-medium">{advice.summary}</p>
            </div>

            {/* Primary Priority */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
              <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Highest Priority Focus</span>
              </h4>
              <p className="text-amber-900 leading-relaxed">{advice.primaryPriority}</p>
            </div>

            {/* Weekly Action Plan */}
            <div className="space-y-2">
              <h4 className="font-bold text-zinc-900">4-Week Recommended Action Plan</h4>
              <div className="space-y-2">
                {advice.weeklyPlan.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-zinc-700 leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex justify-end pt-2 border-t border-zinc-100 relative z-10">
          <button
            onClick={onClose}
            className="bg-[#0a0a0a] text-white hover:bg-zinc-800 font-bold px-6 py-2.5 rounded-xl text-xs"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
