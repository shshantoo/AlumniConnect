import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CommunityQuestion, CommunityAnswer, CommunityReply } from '../types/community.types';
import { AnswerCard } from '../components/AnswerCard';
import { VoteButton } from '../components/VoteButton';
import { SaveButton } from '../components/SaveButton';
import { ReportDialog } from '../components/ReportDialog';
import { 
  getSavedQuestionsFromStorage, saveQuestionsToStorage, 
  getUserSavedQuestionIds, toggleSaveQuestion,
  getUserQuestionVotes, getUserAnswerVotes,
  getSavedReportsFromStorage, saveReportsToStorage
} from '../services/communityService';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { 
  ArrowLeft, Eye, MessageSquare, Share2, Check, 
  Send, AlertTriangle, CheckCircle2, Sparkles, Trash2 
} from 'lucide-react';
import { formatDistanceToNow } from '../../../utils/formatTime';
import { supabase } from '../../../utils/supabase';

export const QuestionDetailPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { currentUser, currentRole, profile } = useAuth();

  const [question, setQuestion] = useState<CommunityQuestion | null>(null);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [copied, setCopied] = useState(false);

  // Report Modal State
  const [reportModal, setReportModal] = useState<{ isOpen: boolean; targetType: 'question' | 'answer'; targetId: string }>({
    isOpen: false,
    targetType: 'question',
    targetId: ''
  });

  const userId = profile?.user_id || currentUser?.id || 'usr-1';
  const isAdmin = currentRole === 'admin';

  // Load question and increment view count
  useEffect(() => {
    const all = getSavedQuestionsFromStorage();
    const target = all.find((q) => q.id === questionId);

    if (target) {
      const incremented: CommunityQuestion = { ...target, view_count: (target.view_count || 0) + 1 };
      setQuestion(incremented);

      // Persist view count increment
      const updatedAll = all.map((q) => (q.id === questionId ? incremented : q));
      saveQuestionsToStorage(updatedAll);
    }
  }, [questionId]);

  // Realtime Answer/Reply Subscriptions
  useEffect(() => {
    if (!questionId) return;

    const channel = supabase
      .channel(`question_${questionId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_answers' }, () => {
        const fresh = getSavedQuestionsFromStorage().find((q) => q.id === questionId);
        if (fresh) setQuestion(fresh);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [questionId]);

  if (!question) {
    return (
      <div className="taste-card p-10 text-center bg-white border border-[#e5e0d5] rounded-3xl space-y-4 max-w-2xl mx-auto my-12">
        <h2 className="text-lg font-black text-[#0a0a0a]">Discussion Question Not Found</h2>
        <p className="text-xs text-zinc-500 font-medium">The question you are looking for may have been removed or does not exist.</p>
        <button onClick={() => navigate('/community')} className="btn-black px-5 py-2 text-xs font-bold">
          Return to Community Feed
        </button>
      </div>
    );
  }

  const isQuestionOwner = userId === question.user_id;
  const isSaved = getUserSavedQuestionIds(userId).includes(question.id);
  const isUpvoted = getUserQuestionVotes(userId).includes(question.id);

  // Upvote Question
  const handleToggleQuestionVote = () => {
    const all = getSavedQuestionsFromStorage();
    const updated = all.map((q) => {
      if (q.id === question.id) {
        const voted = Boolean(q.is_upvoted_by_user);
        return {
          ...q,
          upvote_count: voted ? Math.max(0, q.upvote_count - 1) : q.upvote_count + 1,
          is_upvoted_by_user: !voted
        };
      }
      return q;
    });
    saveQuestionsToStorage(updated);
    setQuestion((prev) => prev ? { 
      ...prev, 
      upvote_count: isUpvoted ? Math.max(0, prev.upvote_count - 1) : prev.upvote_count + 1,
      is_upvoted_by_user: !isUpvoted 
    } : null);
  };

  // Save Question
  const handleToggleQuestionSave = () => {
    const nowSaved = toggleSaveQuestion(userId, question.id);
    setQuestion((prev) => prev ? { ...prev, is_saved_by_user: nowSaved } : null);
  };

  // Submit Answer
  const handleAddAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim() || !question) return;

    const newAnswer: CommunityAnswer = {
      id: `ans-${Date.now()}`,
      question_id: question.id,
      user_id: userId,
      author_name: profile?.full_name || 'Shanto Rahman',
      author_role: currentRole as any,
      author_photo: profile?.photo || DEFAULT_STUDENT_PHOTO,
      author_department: profile?.department || 'B.Sc. in CSE',
      content: newAnswerText.trim(),
      is_accepted: false,
      status: 'active',
      upvote_count: 0,
      reply_count: 0,
      replies: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedAnswers = [...(question.answers || []), newAnswer];
    const updatedQuestion: CommunityQuestion = {
      ...question,
      answer_count: updatedAnswers.length,
      answers: updatedAnswers
    };

    setQuestion(updatedQuestion);
    setNewAnswerText('');

    // Persist to Storage & Supabase
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));

    try {
      supabase.from('community_answers').insert([{
        id: newAnswer.id,
        question_id: question.id,
        user_id: newAnswer.user_id,
        content: newAnswer.content
      }]);
    } catch (e) {}
  };

  // Toggle Accepted Answer
  const handleToggleAcceptAnswer = (answerId: string) => {
    if (!question) return;
    const updatedAnswers = (question.answers || []).map((ans) => {
      if (ans.id === answerId) {
        return { ...ans, is_accepted: !ans.is_accepted };
      }
      // Only 1 answer can be accepted at a time
      return { ...ans, is_accepted: false };
    });

    const isAcceptedNow = updatedAnswers.some((a) => a.is_accepted);
    const updatedQuestion: CommunityQuestion = {
      ...question,
      accepted_answer_id: isAcceptedNow ? answerId : undefined,
      answers: updatedAnswers
    };

    setQuestion(updatedQuestion);
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));
  };

  // Toggle Answer Upvote
  const handleToggleAnswerUpvote = (answerId: string) => {
    if (!question) return;
    const updatedAnswers = (question.answers || []).map((ans) => {
      if (ans.id === answerId) {
        const isV = Boolean(ans.is_upvoted_by_user);
        return {
          ...ans,
          upvote_count: isV ? Math.max(0, ans.upvote_count - 1) : ans.upvote_count + 1,
          is_upvoted_by_user: !isV
        };
      }
      return ans;
    });

    const updatedQuestion = { ...question, answers: updatedAnswers };
    setQuestion(updatedQuestion);
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));
  };

  // Add Reply to Answer (Single-Level Nesting)
  const handleAddReply = (answerId: string, replyContent: string) => {
    if (!question) return;

    const newReply: CommunityReply = {
      id: `rep-${Date.now()}`,
      answer_id: answerId,
      user_id: userId,
      author_name: profile?.full_name || 'Shanto Rahman',
      author_role: currentRole as any,
      author_photo: profile?.photo || DEFAULT_STUDENT_PHOTO,
      content: replyContent,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedAnswers = (question.answers || []).map((ans) => {
      if (ans.id === answerId) {
        const existingReps = ans.replies || [];
        return {
          ...ans,
          reply_count: existingReps.length + 1,
          replies: [...existingReps, newReply]
        };
      }
      return ans;
    });

    const updatedQuestion = { ...question, answers: updatedAnswers };
    setQuestion(updatedQuestion);
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));
  };

  // Delete Reply
  const handleDeleteReply = (answerId: string, replyId: string) => {
    if (!question) return;
    const updatedAnswers = (question.answers || []).map((ans) => {
      if (ans.id === answerId) {
        const filtered = (ans.replies || []).filter((r) => r.id !== replyId);
        return { ...ans, reply_count: filtered.length, replies: filtered };
      }
      return ans;
    });

    const updatedQuestion = { ...question, answers: updatedAnswers };
    setQuestion(updatedQuestion);
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));
  };

  // Delete Answer
  const handleDeleteAnswer = (answerId: string) => {
    if (!question) return;
    const filteredAnswers = (question.answers || []).filter((a) => a.id !== answerId);
    const updatedQuestion = { ...question, answer_count: filteredAnswers.length, answers: filteredAnswers };
    setQuestion(updatedQuestion);
    const all = getSavedQuestionsFromStorage();
    saveQuestionsToStorage(all.map((q) => (q.id === question.id ? updatedQuestion : q)));
  };

  // Submit Report
  const handleSubmitReport = (reason: string, description: string) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      reporter_id: userId,
      reporter_name: profile?.full_name || 'Shanto Rahman',
      target_type: reportModal.targetType,
      target_id: reportModal.targetId,
      reason,
      description,
      status: 'pending' as const,
      created_at: new Date().toISOString()
    };
    const current = getSavedReportsFromStorage();
    saveReportsToStorage([newReport, ...current]);
  };

  // Sort answers so Accepted Answer is pinned to top
  const sortedAnswers = useMemo(() => {
    const list = [...(question.answers || [])];
    return list.sort((a, b) => {
      if (a.is_accepted) return -1;
      if (b.is_accepted) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [question.answers]);

  const formattedTime = formatDistanceToNow(new Date(question.created_at), { addSuffix: true });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Bar */}
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff5500]" /> Back to Community Feed
      </button>

      {/* Main Question Card */}
      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl space-y-6 shadow-sm">
        {/* Author Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={question.author_photo || DEFAULT_STUDENT_PHOTO}
              onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_STUDENT_PHOTO; }}
              alt={question.author_name}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#ff5500]/20 flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-[#0a0a0a] text-sm sm:text-base">{question.author_name}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-50 text-orange-950 border border-orange-200">
                  {question.author_role}
                </span>
                {question.author_department && (
                  <span className="text-xs font-semibold text-zinc-500 hidden sm:inline">
                    • {question.author_department}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">{formattedTime}</p>
            </div>
          </div>

          {question.category_name && (
            <span className="text-xs font-bold text-zinc-800 bg-[#f8f6f0] border border-[#e5e0d5] px-3 py-1 rounded-xl">
              {question.category_name}
            </span>
          )}
        </div>

        {/* Title & Full Body */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-black text-[#0a0a0a] leading-snug">
            {question.title}
          </h1>
          <div className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed whitespace-pre-wrap">
            {question.content}
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-zinc-100">
          {question.tags.map((tag) => (
            <span key={tag} className="text-xs font-bold text-[#ff5500] hover:underline">
              #{tag}
            </span>
          ))}
        </div>

        {/* Metrics & Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-xs font-semibold text-zinc-500 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <VoteButton
              count={question.upvote_count}
              isVoted={isUpvoted}
              onToggleVote={handleToggleQuestionVote}
            />

            <SaveButton
              isSaved={isSaved}
              onToggleSave={handleToggleQuestionSave}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-zinc-400 text-xs">
              <Eye className="w-4 h-4" /> {question.view_count} views
            </span>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 text-zinc-500 hover:text-zinc-950 rounded-xl hover:bg-zinc-100 transition"
              title="Share discussion link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setReportModal({ isOpen: true, targetType: 'question', targetId: question.id })}
              className="p-2 text-zinc-400 hover:text-red-600 transition"
              title="Report question"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Post Answer Section */}
      <div className="taste-card p-6 bg-white border border-[#e5e0d5] rounded-3xl space-y-3 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#0a0a0a]">Your Answer & Experience</h3>
        <form onSubmit={handleAddAnswer} className="space-y-3">
          <textarea
            rows={4}
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            placeholder="Share your professional experience, code snippets, or answer guidance..."
            className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-2xl p-4 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] leading-relaxed shadow-2xs"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newAnswerText.trim()}
              className="btn-black px-6 py-2.5 text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-40"
            >
              <Send className="w-4 h-4 text-[#ff5500]" /> Submit Answer
            </button>
          </div>
        </form>
      </div>

      {/* Answers Section Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <h3 className="text-lg font-black text-[#0a0a0a] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#ff5500]" />
          <span>Answers ({question.answer_count || 0})</span>
        </h3>
      </div>

      {/* Answers List */}
      <div className="space-y-4">
        {sortedAnswers.length === 0 ? (
          <div className="taste-card p-8 text-center bg-white border border-[#e5e0d5] rounded-3xl space-y-2">
            <p className="text-xs text-zinc-500 font-medium">No answers yet. Share your experience and help the community!</p>
          </div>
        ) : (
          sortedAnswers.map((answer) => (
            <AnswerCard
              key={answer.id}
              answer={answer}
              isQuestionOwner={isQuestionOwner}
              currentUserId={userId}
              isAdmin={isAdmin}
              onToggleUpvote={handleToggleAnswerUpvote}
              onToggleAccept={handleToggleAcceptAnswer}
              onAddReply={handleAddReply}
              onDeleteReply={handleDeleteReply}
              onDeleteAnswer={handleDeleteAnswer}
              onOpenReportModal={(tId, tType) => setReportModal({ isOpen: true, targetType: tType, targetId: tId })}
            />
          ))
        )}
      </div>

      {/* Content Report Modal */}
      <ReportDialog
        isOpen={reportModal.isOpen}
        targetType={reportModal.targetType}
        targetId={reportModal.targetId}
        onClose={() => setReportModal({ isOpen: false, targetType: 'question', targetId: '' })}
        onSubmitReport={handleSubmitReport}
      />
    </div>
  );
};
