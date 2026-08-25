import React from 'react';
import { ThumbsUp } from 'lucide-react';

interface VoteButtonProps {
  count: number;
  isVoted: boolean;
  onToggleVote: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  count,
  isVoted,
  onToggleVote,
  size = 'md'
}) => {
  return (
    <button
      onClick={onToggleVote}
      className={`flex items-center gap-1.5 rounded-xl font-bold transition active:scale-[0.96] ${
        size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
      } ${
        isVoted
          ? 'bg-[#ff5500] text-white shadow-xs'
          : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
      }`}
      title={isVoted ? 'Remove Upvote' : 'Upvote this content'}
    >
      <ThumbsUp className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${isVoted ? 'fill-current' : ''}`} />
      <span>{count} {count === 1 ? 'Upvote' : 'Upvotes'}</span>
    </button>
  );
};
