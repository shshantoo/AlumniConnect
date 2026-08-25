import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface NewDiscussionBannerProps {
  count: number;
  onRefresh: () => void;
}

export const NewDiscussionBanner: React.FC<NewDiscussionBannerProps> = ({ count, onRefresh }) => {
  if (count <= 0) return null;

  return (
    <div className="bg-[#0a0a0a] text-white border border-amber-500/30 rounded-2xl p-3 mb-6 flex items-center justify-between shadow-lg animate-bounce">
      <div className="flex items-center gap-2 text-xs font-bold px-2">
        <Sparkles className="w-4 h-4 text-[#ff5500] animate-spin" />
        <span>{count} new {count === 1 ? 'discussion' : 'discussions'} available</span>
      </div>

      <button
        onClick={onRefresh}
        className="px-3.5 py-1.5 bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-[0.97]"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Show New Discussions
      </button>
    </div>
  );
};
