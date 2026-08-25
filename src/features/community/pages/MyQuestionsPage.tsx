import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CommunityQuestion } from '../types/community.types';
import { QuestionCard } from '../components/QuestionCard';
import { getSavedQuestionsFromStorage, saveQuestionsToStorage, getUserSavedQuestionIds, toggleSaveQuestion } from '../services/communityService';
import { HelpCircle, MessageSquare, Plus, ArrowLeft } from 'lucide-react';

export const MyQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');

  const userId = profile?.user_id || currentUser?.id || 'usr-1';

  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => {
    const all = getSavedQuestionsFromStorage();
    return all.filter((q) => q.user_id === userId);
  });

  const handleToggleUpvote = (questionId: string) => {
    const all = getSavedQuestionsFromStorage();
    const updatedAll = all.map((q) => {
      if (q.id === questionId) {
        const isVoted = Boolean(q.is_upvoted_by_user);
        return {
          ...q,
          upvote_count: isVoted ? Math.max(0, q.upvote_count - 1) : q.upvote_count + 1,
          is_upvoted_by_user: !isVoted
        };
      }
      return q;
    });
    saveQuestionsToStorage(updatedAll);
    setQuestions(updatedAll.filter((q) => q.user_id === userId));
  };

  const handleToggleSave = (questionId: string) => {
    toggleSaveQuestion(userId, questionId);
    setQuestions(getSavedQuestionsFromStorage().filter((q) => q.user_id === userId));
  };

  const filteredQuestions = useMemo(() => {
    if (filter === 'answered') {
      return questions.filter((q) => (q.answer_count || 0) > 0);
    }
    if (filter === 'unanswered') {
      return questions.filter((q) => (q.answer_count || 0) === 0);
    }
    return questions;
  }, [questions, filter]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff5500]" /> Back to Community Feed
      </button>

      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl space-y-2 shadow-sm">
        <h1 className="text-2xl font-black text-[#0a0a0a]">My Asked Questions</h1>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Manage and track all community discussions you have initiated.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="taste-card p-2 bg-white border border-[#e5e0d5] rounded-2xl flex items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'all', label: `All (${questions.length})` },
            { id: 'answered', label: `Answered (${questions.filter(q => (q.answer_count || 0) > 0).length})` },
            { id: 'unanswered', label: `Unanswered (${questions.filter(q => (q.answer_count || 0) === 0).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === tab.id
                  ? 'bg-[#0a0a0a] text-white shadow-xs'
                  : 'text-zinc-700 hover:bg-[#f0ede6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/community/ask')}
          className="btn-black px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-[#ff5500]" /> Ask New Question
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="taste-card p-10 bg-white border border-[#e5e0d5] rounded-3xl text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-extrabold text-[#0a0a0a]">No questions in this filter</h3>
            <p className="text-xs text-zinc-500 font-medium">You have not posted any questions matching this filter criteria.</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onToggleUpvote={handleToggleUpvote}
              onToggleSave={handleToggleSave}
            />
          ))
        )}
      </div>
    </div>
  );
};
