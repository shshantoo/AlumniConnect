import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedQuestionsFromStorage, saveQuestionsToStorage, getSavedReportsFromStorage } from '../services/communityService';
import { CommunityQuestion } from '../types/community.types';
import { 
  ShieldCheck, HelpCircle, MessageSquare, AlertTriangle, 
  Eye, EyeOff, Trash2, CheckCircle2, ArrowRight, Activity 
} from 'lucide-react';

export const AdminCommunityPage: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => getSavedQuestionsFromStorage());
  const [reports] = useState(() => getSavedReportsFromStorage());
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Compute Analytics
  const totalQuestions = questions.length;
  const totalAnswers = questions.reduce((acc, q) => acc + (q.answer_count || 0), 0);
  const totalDiscussions = totalQuestions + totalAnswers;
  const activeUsersCount = 14; // Mocked active community participants
  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  const handleToggleHideQuestion = (questionId: string) => {
    const updated = questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, status: q.status === 'hidden' ? ('active' as const) : ('hidden' as const) };
      }
      return q;
    });
    setQuestions(updated);
    saveQuestionsToStorage(updated);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updated = questions.filter((q) => q.id !== questionId);
    setQuestions(updated);
    saveQuestionsToStorage(updated);
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="taste-card p-6 sm:p-8 bg-gradient-to-r from-purple-950 via-zinc-900 to-black text-white rounded-3xl space-y-3 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#ff5500]" /> Admin Governance Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Community Moderation & Analytics</h1>
        <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-2xl">
          Oversee discussion feeds, enforce community conduct guidelines, review flagged reports, and manage question categories.
        </p>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="taste-card p-5 bg-white border border-[#e5e0d5] rounded-2xl space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Total Questions</span>
          <p className="text-2xl font-black text-[#0a0a0a]">{totalQuestions}</p>
        </div>

        <div className="taste-card p-5 bg-white border border-[#e5e0d5] rounded-2xl space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Total Answers</span>
          <p className="text-2xl font-black text-[#ff5500]">{totalAnswers}</p>
        </div>

        <div className="taste-card p-5 bg-white border border-[#e5e0d5] rounded-2xl space-y-1 shadow-2xs">
          <span className="text-[11px] font-bold text-zinc-400 uppercase">Total Discussions</span>
          <p className="text-2xl font-black text-zinc-950">{totalDiscussions}</p>
        </div>

        <div 
          onClick={() => navigate('/admin/community/reports')}
          className="taste-card p-5 bg-red-50 border border-red-200 rounded-2xl space-y-1 shadow-2xs cursor-pointer hover:bg-red-100 transition"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-red-700 uppercase">
            <span>Pending Reports</span>
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <p className="text-2xl font-black text-red-900">{pendingReportsCount}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-base font-black text-[#0a0a0a]">Community Question Moderation Feed</h3>
        <button
          onClick={() => navigate('/admin/community/reports')}
          className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
        >
          <AlertTriangle className="w-4 h-4 text-red-400" /> Manage Flagged Reports ({pendingReportsCount})
        </button>
      </div>

      {/* Questions Moderation Table */}
      <div className="taste-card bg-white border border-[#e5e0d5] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f6f0] border-b border-[#e5e0d5] text-zinc-500 font-extrabold uppercase">
              <tr>
                <th className="p-4">Author</th>
                <th className="p-4">Question Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Answers</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium">
              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-[#f8f6f0]/60 transition">
                  <td className="p-4">
                    <div className="font-bold text-[#0a0a0a]">{q.author_name}</div>
                    <div className="text-[10px] text-zinc-400 capitalize">{q.author_role}</div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p 
                      onClick={() => navigate(`/community/questions/${q.id}`)}
                      className="font-bold text-zinc-900 hover:text-[#ff5500] cursor-pointer line-clamp-1"
                    >
                      {q.title}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className="bg-[#f8f6f0] border border-[#e5e0d5] px-2 py-0.5 rounded-md font-bold text-[10px]">
                      {q.category_name || 'General'}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-zinc-800">{q.answer_count || 0}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                      q.status === 'hidden'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleHideQuestion(q.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition ${
                          q.status === 'hidden'
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-zinc-700 hover:bg-zinc-100 border-[#e5e0d5]'
                        }`}
                      >
                        {q.status === 'hidden' ? 'Restore' : 'Hide'}
                      </button>

                      {confirmDeleteId === q.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-black rounded-lg shadow-xs"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-2 py-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-900"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(q.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                          title="Delete question permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
