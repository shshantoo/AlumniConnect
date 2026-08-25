import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityCategory, TargetAudience, CommunityQuestion } from '../types/community.types';
import { INITIAL_CATEGORIES } from '../../../mock/communitySeedData';
import { normalizeTag } from '../services/communityService';
import { Sparkles, HelpCircle, ArrowLeft, Send, Eye, Check, AlertCircle } from 'lucide-react';
import { QuestionPreview } from './QuestionPreview';

interface QuestionFormProps {
  initialValues?: Partial<CommunityQuestion>;
  onSubmit: (questionData: Partial<CommunityQuestion>) => void;
  isSubmitting?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting = false
}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialValues?.title || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [categoryId, setCategoryId] = useState(initialValues?.category_id || INITIAL_CATEGORIES[0].id);
  const [rawTags, setRawTags] = useState(initialValues?.tags?.join(', ') || 'career, internship');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>(initialValues?.target_audience || 'Everyone');

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Optional AI Assistant state
  const [isAiImproving, setIsAiImproving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ title: string; content: string } | null>(null);

  const validate = (): boolean => {
    if (title.trim().length < 10) {
      setErrorMsg('Question title must be at least 10 characters long.');
      return false;
    }
    if (title.trim().length > 200) {
      setErrorMsg('Question title must be 200 characters or fewer.');
      return false;
    }
    if (content.trim().length < 20) {
      setErrorMsg('Question details must be at least 20 characters long.');
      return false;
    }
    if (content.trim().length > 5000) {
      setErrorMsg('Question details must be 5000 characters or fewer.');
      return false;
    }
    if (!categoryId) {
      setErrorMsg('Please select a category for your question.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const getCleanedTags = (): string[] => {
    return rawTags
      .split(/[,#\s]+/)
      .map(t => normalizeTag(t))
      .filter(t => t.length > 1);
  };

  const selectedCategoryObj = INITIAL_CATEGORIES.find(c => c.id === categoryId);

  const handleOpenPreview = () => {
    if (validate()) {
      setIsPreviewOpen(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Partial<CommunityQuestion> = {
      title: title.trim(),
      content: content.trim(),
      category_id: categoryId,
      category_name: selectedCategoryObj?.name || 'General',
      tags: getCleanedTags(),
      target_audience: targetAudience
    };

    onSubmit(payload);
  };

  // Optional AI Question Improvement Assistant
  const handleAiImprove = () => {
    if (title.trim().length < 5 && content.trim().length < 10) {
      setErrorMsg('Please write a basic title and question first before using AI improvement.');
      return;
    }
    setIsAiImproving(true);
    setTimeout(() => {
      setAiSuggestion({
        title: title.charAt(0).toUpperCase() + title.slice(1).replace(/\?*$/, '?'),
        content: `${content.trim()}\n\n---\n*Key Context & Goals*:\n- Seeking recommendations from verified alumni\n- Focused on technical skill development & placement strategies.`
      });
      setIsAiImproving(false);
    }, 1200);
  };

  const handleAcceptAiSuggestion = () => {
    if (aiSuggestion) {
      setTitle(aiSuggestion.title);
      setContent(aiSuggestion.content);
      setAiSuggestion(null);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 animate-fadeIn">
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-4 rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* AI Suggestion Modal Panel */}
      {aiSuggestion && (
        <div className="taste-card p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#ff5500] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Improved Suggestion Ready
            </span>
            <button type="button" onClick={() => setAiSuggestion(null)} className="text-xs font-bold text-zinc-400 hover:text-zinc-700">Dismiss</button>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="font-extrabold text-zinc-950">Suggested Title:</span>
              <p className="font-bold text-zinc-800 bg-white p-2 rounded-lg border border-[#e5e0d5] mt-1">{aiSuggestion.title}</p>
            </div>
            <div>
              <span className="font-extrabold text-zinc-950">Suggested Content Structure:</span>
              <p className="text-zinc-700 bg-white p-2.5 rounded-lg border border-[#e5e0d5] mt-1 whitespace-pre-wrap">{aiSuggestion.content}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAcceptAiSuggestion}
              className="btn-black px-4 py-1.5 text-xs font-bold flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5 text-[#ff5500]" /> Use Suggestion
            </button>
            <button
              type="button"
              onClick={() => setAiSuggestion(null)}
              className="btn-white px-3 py-1.5 text-xs font-bold"
            >
              Keep Original
            </button>
          </div>
        </div>
      )}

      {/* Title Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-zinc-950">
            Question Title <span className="text-[#ff5500]">*</span>
          </label>
          <span className={`text-[11px] font-bold ${title.length > 200 ? 'text-red-600' : 'text-zinc-400'}`}>
            {title.length} / 200
          </span>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How can I prepare for my first software engineering internship?"
          className="w-full bg-white border border-[#e5e0d5] rounded-2xl px-4 py-3 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] transition shadow-xs"
          maxLength={200}
        />
        <p className="text-[11px] text-zinc-500">Be specific and imagine you are asking another developer or alumni mentor.</p>
      </div>

      {/* Category & Target Audience Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-zinc-950">
            Category <span className="text-[#ff5500]">*</span>
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full bg-white border border-[#e5e0d5] rounded-2xl px-4 py-3 text-xs text-zinc-900 font-bold focus:outline-none focus:border-[#ff5500] transition shadow-xs"
          >
            {INITIAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Target Audience */}
        <div className="space-y-1.5">
          <label className="text-xs font-extrabold text-zinc-950">Target Audience</label>
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
            className="w-full bg-white border border-[#e5e0d5] rounded-2xl px-4 py-3 text-xs text-zinc-900 font-bold focus:outline-none focus:border-[#ff5500] transition shadow-xs"
          >
            <option value="Everyone">Everyone (Students & Alumni)</option>
            <option value="Students">Students Only</option>
            <option value="Alumni">Alumni Only</option>
          </select>
        </div>
      </div>

      {/* Content Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-zinc-950">
            Question Details & Code Context <span className="text-[#ff5500]">*</span>
          </label>
          <span className={`text-[11px] font-bold ${content.length > 5000 ? 'text-red-600' : 'text-zinc-400'}`}>
            {content.length} / 5000
          </span>
        </div>
        <textarea
          rows={7}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Provide all background context, programming languages, technologies tried, error tracebacks, or specific guidance requested..."
          className="w-full bg-white border border-[#e5e0d5] rounded-2xl p-4 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] transition shadow-xs leading-relaxed"
          maxLength={5000}
        />
      </div>

      {/* Tags Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-extrabold text-zinc-950">Tags (separated by comma)</label>
        <input
          type="text"
          value={rawTags}
          onChange={(e) => setRawTags(e.target.value)}
          placeholder="e.g. career, internship, react, leetcode, fullstack"
          className="w-full bg-white border border-[#e5e0d5] rounded-2xl px-4 py-2.5 text-xs text-zinc-900 font-medium focus:outline-none focus:border-[#ff5500] transition shadow-xs"
        />
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {getCleanedTags().map((t) => (
            <span key={t} className="text-[10px] font-bold text-[#ff5500] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-200">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/community')}
            className="btn-white px-4 py-2 text-xs font-bold"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAiImprove}
            disabled={isAiImproving}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-[#ff5500] text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-sm hover:opacity-95 transition disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isAiImproving ? 'Improving...' : 'Improve with AI'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenPreview}
            className="btn-white px-4 py-2 text-xs font-bold flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-700" /> Preview
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-extrabold rounded-xl flex items-center gap-2 shadow-md shadow-orange-500/25 transition active:scale-[0.97] disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isSubmitting ? 'Publishing...' : 'Publish Question'}
          </button>
        </div>
      </div>

      {/* Modal Live Preview */}
      <QuestionPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        question={{
          title: title.trim(),
          content: content.trim(),
          category_name: selectedCategoryObj?.name,
          tags: getCleanedTags(),
          author_name: initialValues?.author_name || 'Shanto Rahman',
          author_role: initialValues?.author_role || 'student'
        }}
        onConfirmPublish={() => {
          setIsPreviewOpen(false);
          const payload: Partial<CommunityQuestion> = {
            title: title.trim(),
            content: content.trim(),
            category_id: categoryId,
            category_name: selectedCategoryObj?.name || 'General',
            tags: getCleanedTags(),
            target_audience: targetAudience
          };
          onSubmit(payload);
        }}
      />
    </form>
  );
};
