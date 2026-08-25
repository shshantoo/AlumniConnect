import React, { useState } from 'react';
import { Send, X } from 'lucide-react';

interface ReplyFormProps {
  answerId: string;
  onSubmitReply: (answerId: string, content: string) => void;
  onCancel?: () => void;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({
  answerId,
  onSubmitReply,
  onCancel
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitReply(answerId, content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-3 animate-fadeIn">
      <div className="relative">
        <textarea
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a reply to this answer..."
          className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-3 text-xs text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:border-[#ff5500] leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1 text-xs font-bold text-zinc-500 hover:text-zinc-900"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-3.5 py-1.5 bg-[#0a0a0a] hover:bg-zinc-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs disabled:opacity-40"
        >
          <Send className="w-3 h-3 text-[#ff5500]" /> Post Reply
        </button>
      </div>
    </form>
  );
};
