import React, { useState } from 'react';
import { CommunityAnswer } from '../types/community.types';
import { VoteButton } from './VoteButton';
import { ReplyForm } from './ReplyForm';
import { ReplyList } from './ReplyList';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { CheckCircle2, MessageSquare, Trash2, Edit3, AlertTriangle, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from '../../../utils/formatTime';

interface AnswerCardProps {
  answer: CommunityAnswer;
  isQuestionOwner: boolean;
  currentUserId: string;
  isAdmin: boolean;
  onToggleUpvote: (answerId: string) => void;
  onToggleAccept: (answerId: string) => void;
  onAddReply: (answerId: string, content: string) => void;
  onDeleteReply: (answerId: string, replyId: string) => void;
  onDeleteAnswer: (answerId: string) => void;
  onOpenReportModal: (targetId: string, type: 'answer') => void;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  isQuestionOwner,
  currentUserId,
  isAdmin,
  onToggleUpvote,
  onToggleAccept,
  onAddReply,
  onDeleteReply,
  onDeleteAnswer,
  onOpenReportModal
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const canManage = currentUserId === answer.user_id || isAdmin;
  const formattedTime = formatDistanceToNow(new Date(answer.created_at), { addSuffix: true });

  return (
    <div className={`taste-card p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
      answer.is_accepted 
        ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-500/20 shadow-md' 
        : 'bg-white border-[#e5e0d5] shadow-xs'
    }`}>
      {/* Header Bar */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={answer.author_photo || DEFAULT_STUDENT_PHOTO}
            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_STUDENT_PHOTO; }}
            alt={answer.author_name}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#ff5500]/20 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-[#0a0a0a] text-sm">{answer.author_name}</span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                answer.author_role === 'alumni'
                  ? 'bg-amber-100 text-amber-950 border-amber-300'
                  : answer.author_role === 'admin'
                  ? 'bg-purple-100 text-purple-950 border-purple-300'
                  : 'bg-orange-100 text-orange-950 border-orange-300'
              }`}>
                {answer.author_role}
              </span>
              {answer.author_department && (
                <span className="text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                  • {answer.author_department}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{formattedTime}</p>
          </div>
        </div>

        {/* Accepted Answer Badge */}
        {answer.is_accepted && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Accepted Answer
          </span>
        )}
      </div>

      {/* Answer Content */}
      <div className="text-xs sm:text-sm text-zinc-800 font-medium leading-relaxed whitespace-pre-wrap">
        {answer.content}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs font-semibold text-zinc-500 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <VoteButton
            count={answer.upvote_count}
            isVoted={Boolean(answer.is_upvoted_by_user)}
            onToggleVote={() => onToggleUpvote(answer.id)}
            size="sm"
          />

          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1.5 px-3 py-1 text-zinc-700 bg-[#f8f6f0] hover:bg-[#f0ede6] border border-[#e5e0d5] rounded-xl font-bold text-[11px] transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>Reply ({answer.replies?.length || 0})</span>
          </button>

          {/* Question Owner: Mark as Accepted Button */}
          {isQuestionOwner && (
            <button
              onClick={() => onToggleAccept(answer.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition ${
                answer.is_accepted
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-zinc-700 hover:bg-emerald-50 border-zinc-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{answer.is_accepted ? 'Accepted ✓' : 'Mark as Accepted'}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenReportModal(answer.id, 'answer')}
            className="p-1.5 text-zinc-400 hover:text-red-600 transition text-[11px] flex items-center gap-1 font-medium"
            title="Report this answer"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Report
          </button>

          {canManage && (
            <button
              onClick={() => onDeleteAnswer(answer.id)}
              className="p-1.5 text-zinc-400 hover:text-red-600 transition"
              title="Delete answer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Single-Level Nested Replies */}
      {showReplyForm && (
        <ReplyForm
          answerId={answer.id}
          onSubmitReply={(ansId, content) => {
            onAddReply(ansId, content);
            setShowReplyForm(false);
          }}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      <ReplyList
        replies={answer.replies || []}
        currentUserId={currentUserId}
        isAdmin={isAdmin}
        onDeleteReply={(repId) => onDeleteReply(answer.id, repId)}
      />
    </div>
  );
};
