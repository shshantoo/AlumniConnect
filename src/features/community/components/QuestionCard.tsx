import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommunityQuestion } from '../types/community.types';
import { VoteButton } from './VoteButton';
import { SaveButton } from './SaveButton';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { MessageSquare, Eye, Share2, Check, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from '../../../utils/formatTime';

interface QuestionCardProps {
  question: CommunityQuestion;
  onToggleUpvote: (questionId: string) => void;
  onToggleSave: (questionId: string) => void;
  onOpenReportModal?: (questionId: string, type: 'question') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onToggleUpvote,
  onToggleSave,
  onOpenReportModal
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/community/questions/${question.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = formatDistanceToNow(new Date(question.created_at), { addSuffix: true });

  return (
    <div 
      onClick={() => navigate(`/community/questions/${question.id}`)}
      className="taste-card p-5 sm:p-6 space-y-4 hover:border-[#ff5500]/40 transition-all cursor-pointer group bg-white border border-[#e5e0d5] rounded-3xl shadow-xs"
    >
      {/* Header: Author Metadata */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={question.author_photo || DEFAULT_STUDENT_PHOTO}
            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_STUDENT_PHOTO; }}
            alt={question.author_name}
            className="w-10 h-10 rounded-2xl object-cover ring-2 ring-[#ff5500]/20 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0a0a0a] text-sm group-hover:text-[#ff5500] transition">
                {question.author_name}
              </span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                question.author_role === 'alumni' 
                  ? 'bg-amber-50 text-amber-900 border-amber-200' 
                  : question.author_role === 'admin'
                  ? 'bg-purple-50 text-purple-900 border-purple-200'
                  : 'bg-orange-50 text-orange-950 border-orange-200'
              }`}>
                {question.author_role}
              </span>
              {question.author_department && (
                <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                  • {question.author_department}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{formattedTime}</p>
          </div>
        </div>

        {question.accepted_answer_id && (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5" /> Answered
          </span>
        )}
      </div>

      {/* Body: Title & Content Preview */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-black text-[#0a0a0a] group-hover:text-[#ff5500] transition leading-snug">
          {question.title}
        </h3>
        <p className="text-xs text-zinc-600 font-medium line-clamp-2 leading-relaxed">
          {question.content}
        </p>
      </div>

      {/* Categories & Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        {question.category_name && (
          <span className="text-[11px] font-bold text-zinc-800 bg-[#f8f6f0] border border-[#e5e0d5] px-2.5 py-0.5 rounded-lg">
            {question.category_name}
          </span>
        )}
        {question.tags.map((tag) => (
          <span key={tag} className="text-[11px] font-bold text-[#ff5500] hover:underline">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Metrics & Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs font-semibold text-zinc-500 gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <VoteButton
            count={question.upvote_count}
            isVoted={Boolean(question.is_upvoted_by_user)}
            onToggleVote={(e) => {
              e.stopPropagation();
              onToggleUpvote(question.id);
            }}
            size="sm"
          />

          <button
            onClick={() => navigate(`/community/questions/${question.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-700 bg-[#f8f6f0] hover:bg-[#f0ede6] border border-[#e5e0d5] font-bold text-[11px] transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>{question.answer_count} Answers</span>
          </button>

          <SaveButton
            isSaved={Boolean(question.is_saved_by_user)}
            onToggleSave={(e) => {
              e.stopPropagation();
              onToggleSave(question.id);
            }}
            size="sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-zinc-400 text-[11px]">
            <Eye className="w-3.5 h-3.5" /> {question.view_count} views
          </span>

          <button
            onClick={handleShare}
            className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition"
            title="Share link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
