import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  getSavedCvAiReport, 
  updateSuggestionStatus, 
  bulkApplyHighPrioritySuggestions 
} from '../services/aiCvService';
import { AiCvReviewReport, SuggestionPriority } from '../types/aiCv.types';
import { CvScoreCard } from '../components/CvScoreCard';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { AiSuggestionCard } from '../components/AiSuggestionCard';
import { 
  Sparkles, CheckCircle2, ArrowLeft, RefreshCw, FileText, 
  Check, Filter, Download, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AiCvReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateUserProfile } = useAuth();

  const [report, setReport] = useState<AiCvReviewReport>(() => getSavedCvAiReport(profile));
  const [filterPriority, setFilterPriority] = useState<'all' | SuggestionPriority | 'applied' | 'rejected'>('all');

  const suggestions = report.suggestions;
  const pendingCount = suggestions.filter((s) => s.status === 'pending').length;
  const highCount = suggestions.filter((s) => s.priority === 'high' && s.status === 'pending').length;
  const mediumCount = suggestions.filter((s) => s.priority === 'medium' && s.status === 'pending').length;
  const lowCount = suggestions.filter((s) => s.priority === 'low' && s.status === 'pending').length;

  const filteredSuggestions = suggestions.filter((s) => {
    if (filterPriority === 'all') return true;
    if (filterPriority === 'applied') return s.status === 'applied';
    if (filterPriority === 'rejected') return s.status === 'rejected';
    return s.priority === filterPriority && s.status === 'pending';
  });

  const handleApply = (suggestionId: string) => {
    const sug = suggestions.find((s) => s.id === suggestionId);
    if (sug && sug.section === 'Professional Summary') {
      updateUserProfile({ professional_summary: sug.suggestedText });
    }

    const updated = updateSuggestionStatus(report, profile, suggestionId, 'applied');
    setReport(updated);
  };

  const handleReject = (suggestionId: string) => {
    const updated = updateSuggestionStatus(report, profile, suggestionId, 'rejected');
    setReport(updated);
  };

  const handleBulkApplyHigh = () => {
    const updated = bulkApplyHighPrioritySuggestions(report, profile);
    setReport(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/profile')}
          className="text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile & CV Builder</span>
        </button>

        <span className="text-xs text-zinc-500 font-bold">
          Last Analyzed: {new Date(report.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* 1. Overall Score Card */}
      <CvScoreCard score={report.score} targetCareer={report.targetCareer} />

      {/* 2. Score Category Breakdown */}
      <ScoreBreakdown categories={report.score.categories} />

      {/* 3. Bulk Action Bar */}
      <div className="bg-[#fffaf7] border border-[#f8cbb0] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ff5500]" />
            <span>AI Review Summary</span>
          </h3>
          <p className="text-xs text-zinc-600 font-medium">
            AI identified <strong>{suggestions.length}</strong> total suggestions. Pending: <strong>{pendingCount}</strong> (High Priority: {highCount}, Medium: {mediumCount}, Low: {lowCount})
          </p>
        </div>

        {highCount > 0 && (
          <button
            onClick={handleBulkApplyHigh}
            className="bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md shadow-[#ff5500]/20 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply All High Priority ({highCount})</span>
          </button>
        )}
      </div>

      {/* 4. Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 text-xs font-bold">
        <span className="text-zinc-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>

        <button
          onClick={() => setFilterPriority('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterPriority === 'all'
              ? 'bg-[#0a0a0a] text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          All ({suggestions.length})
        </button>

        <button
          onClick={() => setFilterPriority('high')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterPriority === 'high'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
          }`}
        >
          High Priority ({highCount})
        </button>

        <button
          onClick={() => setFilterPriority('medium')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterPriority === 'medium'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
          }`}
        >
          Medium ({mediumCount})
        </button>

        <button
          onClick={() => setFilterPriority('applied')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterPriority === 'applied'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          Applied ({suggestions.filter((s) => s.status === 'applied').length})
        </button>

        <button
          onClick={() => setFilterPriority('rejected')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterPriority === 'rejected'
              ? 'bg-zinc-600 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          Rejected ({suggestions.filter((s) => s.status === 'rejected').length})
        </button>
      </div>

      {/* 5. Suggestions Cards List */}
      <div className="space-y-4">
        {filteredSuggestions.length === 0 ? (
          <div className="bg-white border border-[#e5e0d5] rounded-3xl p-12 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900">No suggestions in this category</h3>
            <p className="text-xs text-zinc-500">All suggestions for this filter have been reviewed or applied!</p>
          </div>
        ) : (
          filteredSuggestions.map((sug) => (
            <AiSuggestionCard
              key={sug.id}
              suggestion={sug}
              onApply={handleApply}
              onReject={handleReject}
            />
          ))
        )}
      </div>

      {/* 6. Footer Action Bar */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">Finished reviewing AI suggestions?</h3>
          <p className="text-xs text-zinc-500">Generate your updated PDF resume or return to your profile.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="bg-[#0a0a0a] text-white hover:bg-zinc-800 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <span>Return to Profile & Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
