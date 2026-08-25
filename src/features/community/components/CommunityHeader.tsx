import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Plus, Sparkles, HelpCircle } from 'lucide-react';

export const CommunityHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="taste-card p-6 sm:p-8 bg-gradient-to-br from-[#0a0a0a] via-zinc-900 to-zinc-950 text-white rounded-3xl shadow-xl relative overflow-hidden mb-6">
      {/* Decorative Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5500]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 border border-white/15 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> AlumniConnect Knowledge Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AlumniConnect Community
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
            "Ask. Answer. Learn. Connect." — A dedicated discussion space where CSE students ask questions, alumni share real industry experiences, and developers exchange knowledge.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate('/community/ask')}
            className="w-full md:w-auto px-6 py-3 bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" /> Ask a Question
          </button>
        </div>
      </div>
    </div>
  );
};
