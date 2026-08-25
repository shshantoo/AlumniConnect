import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CommunityQuestion } from '../types/community.types';
import { QuestionCard } from '../components/QuestionCard';
import { getSavedQuestionsFromStorage, saveQuestionsToStorage, getUserSavedQuestionIds, toggleSaveQuestion } from '../services/communityService';
import { Bookmark, ArrowLeft, MessageSquare } from 'lucide-react';

export const SavedQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();
  const userId = profile?.user_id || currentUser?.id || 'usr-1';

  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => {
    const savedIds = getUserSavedQuestionIds(userId);
    const all = getSavedQuestionsFromStorage();
    return all.filter((q) => savedIds.includes(q.id));
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
    const savedIds = getUserSavedQuestionIds(userId);
    setQuestions(updatedAll.filter((q) => savedIds.includes(q.id)));
  };

  const handleToggleSave = (questionId: string) => {
    toggleSaveQuestion(userId, questionId);
    const savedIds = getUserSavedQuestionIds(userId);
    const all = getSavedQuestionsFromStorage();
    setQuestions(all.filter((q) => savedIds.includes(q.id)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff5500]" /> Back to Community Feed
      </button>

      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold">
          <Bookmark className="w-3.5 h-3.5 text-emerald-600" /> Saved Discussions
        </div>
        <h1 className="text-2xl font-black text-[#0a0a0a]">Bookmarked Community Discussions</h1>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Access all saved questions and tech discussions for future reference.
        </p>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="taste-card p-10 bg-white border border-[#e5e0d5] rounded-3xl text-center space-y-3">
            <Bookmark className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-extrabold text-[#0a0a0a]">You haven't saved any discussions yet</h3>
            <p className="text-xs text-zinc-500 font-medium max-w-sm mx-auto">
              Click the "Save" button on any interesting question in the community feed to bookmark it here.
            </p>
            <button onClick={() => navigate('/community')} className="btn-black px-6 py-2.5 text-xs font-bold shadow-md">
              Explore Community Feed
            </button>
          </div>
        ) : (
          questions.map((question) => (
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
