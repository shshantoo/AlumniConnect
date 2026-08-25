import React from 'react';
import { Bookmark, Check } from 'lucide-react';

interface SaveButtonProps {
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  isSaved,
  onToggleSave,
  size = 'md'
}) => {
  return (
    <button
      onClick={onToggleSave}
      className={`flex items-center gap-1.5 rounded-xl font-bold transition active:scale-[0.96] ${
        size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
      } ${
        isSaved
          ? 'bg-emerald-600 text-white shadow-xs'
          : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
      }`}
      title={isSaved ? 'Remove from Saved' : 'Save Discussion'}
    >
      {isSaved ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Saved ✓</span>
        </>
      ) : (
        <>
          <Bookmark className="w-3.5 h-3.5" />
          <span>Save</span>
        </>
      )}
    </button>
  );
};
