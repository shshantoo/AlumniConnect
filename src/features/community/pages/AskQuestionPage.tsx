import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { QuestionForm } from '../components/QuestionForm';
import { CommunityQuestion } from '../types/community.types';
import { getSavedQuestionsFromStorage, saveQuestionsToStorage } from '../services/communityService';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { ArrowLeft, MessageSquarePlus, Sparkles } from 'lucide-react';
import { supabase } from '../../../utils/supabase';

export const AskQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, currentRole, profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateQuestion = async (formData: Partial<CommunityQuestion>) => {
    setIsSubmitting(true);
    try {
      const newQuestion: CommunityQuestion = {
        id: `q-${Date.now()}`,
        user_id: profile?.user_id || currentUser?.id || 'usr-1',
        author_name: profile?.full_name || 'Shanto Rahman',
        author_role: currentRole as any,
        author_photo: profile?.photo || DEFAULT_STUDENT_PHOTO,
        author_department: profile?.department || 'B.Sc. in CSE',
        title: formData.title || '',
        content: formData.content || '',
        category_id: formData.category_id || 'cat-1',
        category_name: formData.category_name || 'Career Development',
        tags: formData.tags || ['career'],
        target_audience: formData.target_audience || 'Everyone',
        status: 'active',
        view_count: 1,
        upvote_count: 0,
        answer_count: 0,
        answers: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // 1. Save to LocalStorage Database
      const existing = getSavedQuestionsFromStorage();
      const updated = [newQuestion, ...existing];
      saveQuestionsToStorage(updated);

      // 2. Sync to Supabase table
      try {
        await supabase.from('community_questions').insert([{
          id: newQuestion.id,
          user_id: newQuestion.user_id,
          title: newQuestion.title,
          content: newQuestion.content,
          category_id: newQuestion.category_id,
          target_audience: newQuestion.target_audience
        }]);
      } catch (e) {
        console.warn('Supabase sync info:', e);
      }

      setIsSubmitting(false);
      navigate(`/community/questions/${newQuestion.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Bar Navigation */}
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff5500]" /> Back to Community Feed
      </button>

      {/* Header Card */}
      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] text-[11px] font-bold">
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#ff5500]" /> Ask the Community
        </div>
        <h1 className="text-2xl font-black text-[#0a0a0a]">Ask a Public Discussion Question</h1>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Ask verified alumni and fellow CSE students for technical code guidance, career preparation advice, or software engineering mentorship.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl shadow-sm">
        <QuestionForm
          initialValues={{
            author_name: profile?.full_name || 'Shanto Rahman',
            author_role: currentRole as any
          }}
          onSubmit={handleCreateQuestion}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
