import React from 'react';
import { CvScoreResult } from '../types/aiCv.types';
import { Sparkles, Trophy, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CvScoreCardProps {
  score: CvScoreResult;
  targetCareer: string;
}

export const CvScoreCard: React.FC<CvScoreCardProps> = ({ score, targetCareer }) => {
  const isScoreImproved = score.previousScore !== undefined && score.overallScore > score.previousScore;

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/30 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Quality Analysis</span>
          </div>
          <h1 className="text-3xl font-black">AI CV Improvement Assistant</h1>
          <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
            Target Career: <strong className="text-white bg-zinc-800 px-2.5 py-0.5 rounded border border-zinc-700">{targetCareer}</strong>
          </p>
        </div>

        {/* Score Card Circle / Gauge */}
        <div className="bg-zinc-900/90 border border-zinc-700/80 p-6 rounded-3xl text-center space-y-2 min-w-[220px]">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Calculated CV Score</span>
          
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black text-[#ff5500]">{score.overallScore}</span>
            <span className="text-xs text-zinc-400 font-bold">/ 100</span>
          </div>

          <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-[#ff5500] to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${score.overallScore}%` }}
            />
          </div>

          {isScoreImproved && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1 pt-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>🎉 Score Improved: {score.previousScore} → {score.overallScore}!</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
