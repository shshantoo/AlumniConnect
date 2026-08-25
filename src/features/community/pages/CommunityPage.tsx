import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CommunityHeader } from '../components/CommunityHeader';
import { CommunitySearch } from '../components/CommunitySearch';
import { CategoryFilter } from '../components/CategoryFilter';
import { QuestionCard } from '../components/QuestionCard';
import { NewDiscussionBanner } from '../components/NewDiscussionBanner';
import { 
  getSavedQuestionsFromStorage, saveQuestionsToStorage, 
  getUserSavedQuestionIds, toggleSaveQuestion,
  getUserQuestionVotes, calculateRelevanceScore, calculatePopularityScore
} from '../services/communityService';
import { INITIAL_CATEGORIES } from '../../../mock/communitySeedData';
import { CommunityQuestion } from '../types/community.types';
import { Sparkles, MessageSquarePlus, Flame, Clock, HelpCircle, UserCheck } from 'lucide-react';
import { supabase } from '../../../utils/supabase';

export const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();

  const [questions, setQuestions] = useState<CommunityQuestion[]>(() => getSavedQuestionsFromStorage());
  const [activeTab, setActiveTab] = useState<'latest' | 'popular' | 'unanswered' | 'myfeed'>('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newDiscussionCount, setNewDiscussionCount] = useState(0);

  // User State Maps
  const userId = profile?.user_id || currentUser?.id || 'guest';
  const savedIds = useMemo(() => getUserSavedQuestionIds(userId), [userId, questions]);
  const votedIds = useMemo(() => getUserQuestionVotes(userId), [userId, questions]);

  // Real-Time Supabase Subscription
  useEffect(() => {
    const channel = supabase
      .channel('community_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_questions' }, () => {
        setNewDiscussionCount((prev) => prev + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRefreshNewDiscussions = () => {
    setQuestions(getSavedQuestionsFromStorage());
    setNewDiscussionCount(0);
  };

  // Upvote Handler
  const handleToggleUpvote = (questionId: string) => {
    setQuestions((prev) => {
      const updated = prev.map((q) => {
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
      saveQuestionsToStorage(updated);
      return updated;
    });
  };

  // Save Handler
  const handleToggleSave = (questionId: string) => {
    const nowSaved = toggleSaveQuestion(userId, questionId);
    setQuestions((prev) => {
      const updated = prev.map((q) => (q.id === questionId ? { ...q, is_saved_by_user: nowSaved } : q));
      saveQuestionsToStorage(updated);
      return updated;
    });
  };

  // Computed & Filtered Feed
  const processedQuestions = useMemo(() => {
    let result = questions.map((q) => ({
      ...q,
      is_saved_by_user: savedIds.includes(q.id),
      is_upvoted_by_user: votedIds.includes(q.id),
      relevance_score: calculateRelevanceScore(q, profile),
      popularity_score: calculatePopularityScore(q)
    }));

    // Category Filter
    if (selectedCategory) {
      result = result.filter((q) => q.category_id === selectedCategory);
    }

    // Search Term Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((q) => 
        q.title.toLowerCase().includes(term) ||
        q.content.toLowerCase().includes(term) ||
        q.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    // Sort according to active feed tab
    if (activeTab === 'latest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (activeTab === 'popular') {
      result.sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));
    } else if (activeTab === 'unanswered') {
      result = result.filter((q) => (q.answer_count || 0) === 0);
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (activeTab === 'myfeed') {
      result.sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0));
    }

    return result;
  }, [questions, activeTab, searchTerm, selectedCategory, savedIds, votedIds, profile]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <CommunityHeader />

      {/* Realtime Notification Banner */}
      <NewDiscussionBanner count={newDiscussionCount} onRefresh={handleRefreshNewDiscussions} />

      {/* Search Input & Category Pills */}
      <div className="space-y-3">
        <CommunitySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={INITIAL_CATEGORIES}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Feed Sorting Tabs Bar */}
      <div className="taste-card p-2 bg-white border border-[#e5e0d5] rounded-2xl flex items-center justify-between gap-2 overflow-x-auto shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'latest', label: 'Latest', icon: Clock },
            { id: 'popular', label: 'Popular', icon: Flame },
            { id: 'unanswered', label: 'Unanswered', icon: HelpCircle },
            { id: 'myfeed', label: 'My Feed (Relevance)', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white shadow-xs'
                    : 'text-zinc-700 hover:bg-[#f0ede6]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff5500]' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/community/ask')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-extrabold rounded-xl shadow-xs transition active:scale-[0.97]"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Feed Questions List */}
      <div className="space-y-4">
        {processedQuestions.length === 0 ? (
          <div className="taste-card p-10 bg-white border border-[#e5e0d5] rounded-3xl text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#fce8d5] text-[#ff5500] flex items-center justify-center mx-auto text-2xl font-black">
              💬
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-[#0a0a0a]">No discussions found</h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-medium">
                Be the first student or alumni to start a discussion in this topic!
              </p>
            </div>
            <button
              onClick={() => navigate('/community/ask')}
              className="btn-black px-6 py-2.5 text-xs font-bold shadow-md inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#ff5500]" /> Ask a Question Now
            </button>
          </div>
        ) : (
          processedQuestions.map((question) => (
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
