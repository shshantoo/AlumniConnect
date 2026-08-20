import React from 'react';
import { ScoreCategoryBreakdown } from '../types/aiCv.types';
import { CheckCircle2, AlertTriangle, XCircle, Sliders } from 'lucide-react';

interface ScoreBreakdownProps {
  categories: ScoreCategoryBreakdown[];
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ categories }) => {
  return (
    <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5500]">WEIGHTED SCORE FORMULA</span>
          <h3 className="text-lg font-bold text-zinc-900">CV Quality Category Breakdown</h3>
        </div>
        <span className="text-xs text-zinc-500 font-medium">Calculated by Application Logic</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const isExcellent = cat.status === 'excellent';
          const isNeedsWork = cat.status === 'needs_work';

          return (
            <div
              key={cat.category}
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                isExcellent
                  ? 'bg-emerald-50/40 border-emerald-200/80'
                  : isNeedsWork
                  ? 'bg-amber-50/40 border-amber-200/80'
                  : 'bg-rose-50/40 border-rose-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isExcellent ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isNeedsWork ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <h4 className="text-xs font-bold text-zinc-900">{cat.category}</h4>
                </div>
                <span className="text-[10px] text-zinc-500 font-bold">Weight: {cat.weightPercent}%</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-600 font-medium">
                  <span>Score</span>
                  <strong className="text-zinc-900">{cat.earnedScorePercent}%</strong>
                </div>

                <div className="w-full h-2 bg-zinc-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExcellent ? 'bg-emerald-500' : isNeedsWork ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${cat.earnedScorePercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
