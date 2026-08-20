import React from 'react';
import { AiCvSuggestion } from '../types/aiCv.types';
import { Sparkles, Check, X, AlertCircle, Lightbulb, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AiSuggestionCardProps {
  suggestion: AiCvSuggestion;
  onApply: (id: string) => void;
  onReject: (id: string) => void;
}

export const AiSuggestionCard: React.FC<AiSuggestionCardProps> = ({
  suggestion,
  onApply,
  onReject,
}) => {
  const isHigh = suggestion.priority === 'high';
  const isMedium = suggestion.priority === 'medium';
  const isApplied = suggestion.status === 'applied';
  const isRejected = suggestion.status === 'rejected';
  const isSkillsGap = suggestion.section === 'Skills Gap Analysis';

  return (
    <div
      className={`bg-white border rounded-3xl p-6 transition-all space-y-4 shadow-xs hover:shadow-md ${
        isApplied
          ? 'border-emerald-300 bg-emerald-50/20'
          : isRejected
          ? 'border-zinc-200 opacity-60 bg-zinc-50/50'
          : isHigh
          ? 'border-rose-200'
          : 'border-[#e5e0d5]'
      }`}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-xl">
            {suggestion.section}
          </span>
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
              isHigh
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : isMedium
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
          >
            {suggestion.priority} priority
          </span>
        </div>

        {/* Status Badge */}
        {isApplied && (
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <Check className="w-3.5 h-3.5" />
            <span>Applied to CV (+5 pts)</span>
          </span>
        )}

        {isRejected && (
          <span className="text-xs bg-zinc-200 text-zinc-600 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <X className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </span>
        )}
      </div>

      {/* Issue & Reason */}
      <div className="space-y-2">
        <div className="flex items-start gap-2 text-zinc-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <h4 className="text-sm font-bold">{suggestion.issue}</h4>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed font-medium flex items-center gap-1.5 pl-6">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Why improve? {suggestion.reason}</span>
        </p>
      </div>

      {/* Text Comparison Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Current Text */}
        <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1.5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Current CV Text</span>
          <p className="text-xs text-zinc-700 leading-relaxed font-medium">
            {suggestion.originalText || 'Not specified'}
          </p>
        </div>

        {/* AI Suggested Text */}
        <div className="p-4 bg-[#fffaf7] border border-[#f8cbb0] rounded-2xl space-y-1.5">
          <span className="text-[10px] font-bold text-[#ff5500] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff5500]" />
            <span>✨ AI Suggested Version</span>
          </span>
          <p className="text-xs text-zinc-900 font-bold leading-relaxed">
            {suggestion.suggestedText}
          </p>
        </div>
      </div>

      {/* Career Gap Link Notice if applicable */}
      {isSkillsGap && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
          <span className="text-amber-900 font-bold">Want to learn these missing career skills first?</span>
          <Link
            to="/career/roadmap"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 text-[11px]"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Go to Career Roadmap</span>
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      {!isApplied && !isRejected && (
        <div className="flex justify-end items-center gap-3 pt-2 border-t border-zinc-100">
          <button
            onClick={() => onReject(suggestion.id)}
            className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-all"
          >
            Reject
          </button>

          <button
            onClick={() => onApply(suggestion.id)}
            className="px-6 py-2 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-bold transition-all shadow-md shadow-[#ff5500]/20 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Suggestion</span>
          </button>
        </div>
      )}
    </div>
  );
};
