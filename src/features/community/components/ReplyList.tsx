import React from 'react';
import { CommunityReply } from '../types/community.types';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { formatDistanceToNow } from '../../../utils/formatTime';
import { Trash2, Edit2 } from 'lucide-react';

interface ReplyListProps {
  replies: CommunityReply[];
  currentUserId: string;
  isAdmin: boolean;
  onDeleteReply: (replyId: string) => void;
}

export const ReplyList: React.FC<ReplyListProps> = ({
  replies,
  currentUserId,
  isAdmin,
  onDeleteReply
}) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="space-y-3 mt-3 pl-4 sm:pl-6 border-l-2 border-[#e5e0d5]">
      {replies.map((rep) => {
        const canDelete = currentUserId === rep.user_id || isAdmin;
        const formattedTime = formatDistanceToNow(new Date(rep.created_at), { addSuffix: true });

        return (
          <div key={rep.id} className="bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5] space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={rep.author_photo || DEFAULT_STUDENT_PHOTO}
                  onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_STUDENT_PHOTO; }}
                  alt={rep.author_name}
                  className="w-6 h-6 rounded-lg object-cover ring-1 ring-[#ff5500]/20"
                />
                <span className="font-bold text-zinc-950">{rep.author_name}</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-white border border-zinc-200 text-zinc-700">
                  {rep.author_role}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">• {formattedTime}</span>
              </div>

              {canDelete && (
                <button
                  onClick={() => onDeleteReply(rep.id)}
                  className="text-zinc-400 hover:text-red-600 transition p-1"
                  title="Delete Reply"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>

            <p className="text-zinc-800 font-medium pl-8 leading-relaxed whitespace-pre-wrap">
              {rep.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};
