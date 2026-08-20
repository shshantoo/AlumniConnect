import React, { useState, useEffect } from 'react';
import { generateAICVAnalysis, AICVAnalysisResult } from '../services/aiCareerCoach';
import { Sparkles, FileText, Check, X, RefreshCw, ArrowRight } from 'lucide-react';

interface AICVAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
  onApplySuggestion?: (section: string, newText: string) => void;
}

export const AICVAnalyzerModal: React.FC<AICVAnalyzerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onApplySuggestion,
}) => {
  const [analysis, setAnalysis] = useState<AICVAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [appliedSections, setAppliedSections] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      generateAICVAnalysis(profile).then((res) => {
        setAnalysis(res);
        setLoading(false);
      });
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleApply = (section: string, text: string) => {
    if (onApplySuggestion) {
      onApplySuggestion(section, text);
    }
    setAppliedSections((prev) => [...prev, section]);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-amber-500 to-[#ff5500] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-zinc-900">✨ AI CV Improvement Assistant</h3>
              <p className="text-xs text-zinc-500">Automated quality & keyword optimization analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-800 font-bold text-lg">
            ✕
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#ff5500] animate-spin mx-auto" />
            <p className="text-xs font-bold text-zinc-600">Analyzing CV content, ATS keywords, and structure...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6 text-xs max-h-[60vh] overflow-y-auto pr-1">
            {/* Overall Score */}
            <div className="bg-[#fffaf7] border border-[#f8cbb0] p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Overall CV Score</span>
                <div className="text-2xl font-black text-[#ff5500]">{analysis.overallScore} / 10</div>
              </div>
              <p className="text-xs text-zinc-700 max-w-md font-medium leading-relaxed">{analysis.summaryFeedback}</p>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <h4 className="font-bold text-zinc-900 text-sm">Recommended Improvements</h4>

              {analysis.suggestions.map((sug) => {
                const isApplied = appliedSections.includes(sug.section);

                return (
                  <div key={sug.section} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900 text-xs">{sug.section}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-100 font-bold px-2 py-0.5 rounded">
                        💡 {sug.reason}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white border border-zinc-200 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Current Text</span>
                        <p className="text-zinc-700 leading-relaxed font-medium">{sug.currentText}</p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">AI Suggestion</span>
                        <p className="text-emerald-950 font-bold leading-relaxed">{sug.suggestedText}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => handleApply(sug.section, sug.suggestedText)}
                        disabled={isApplied}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isApplied
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#ff5500] hover:bg-[#e04b00] text-white shadow-xs'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Applied to Profile</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Apply Suggestion</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="flex justify-end pt-2 border-t border-zinc-100">
          <button onClick={onClose} className="bg-[#0a0a0a] text-white hover:bg-zinc-800 font-bold px-6 py-2.5 rounded-xl text-xs">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
