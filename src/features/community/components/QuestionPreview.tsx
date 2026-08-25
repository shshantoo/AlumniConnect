import React from 'react';
import { CommunityQuestion } from '../types/community.types';
import { DEFAULT_STUDENT_PHOTO } from '../../../mock/seedData';
import { X, CheckCircle2, Tag } from 'lucide-react';

interface QuestionPreviewProps {
  question: Partial<CommunityQuestion>;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPublish: () => void;
}

export const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  question,
  isOpen,
  onClose,
  onConfirmPublish
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#e5e0d5] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-scaleUp relative">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <h3 className="text-lg font-black text-[#0a0a0a]">Question Preview</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-1 text-sm font-bold">✕</button>
        </div>

        <div className="taste-card p-5 bg-[#f8f6f0] border border-[#e5e0d5] rounded-2xl space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={question.author_photo || DEFAULT_STUDENT_PHOTO}
              onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_STUDENT_PHOTO; }}
              alt={question.author_name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#ff5500]/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#0a0a0a] text-xs">{question.author_name}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-50 text-orange-950 border border-orange-200">
                  {question.author_role}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">Just now (Preview)</p>
            </div>
          </div>

          <h4 className="text-base font-extrabold text-[#0a0a0a]">{question.title}</h4>
          <p className="text-xs text-zinc-700 whitespace-pre-wrap leading-relaxed">{question.content}</p>

          <div className="flex items-center gap-2 flex-wrap pt-2">
            {question.category_name && (
              <span className="text-[10px] font-bold text-zinc-800 bg-white border border-[#e5e0d5] px-2 py-0.5 rounded-md">
                {question.category_name}
              </span>
            )}
            {question.tags?.map((tag) => (
              <span key={tag} className="text-[10px] font-bold text-[#ff5500]">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button onClick={onClose} className="btn-white px-4 py-2 text-xs font-bold">Back to Edit</button>
          <button onClick={onConfirmPublish} className="btn-black px-5 py-2 text-xs font-bold">Confirm & Publish Question</button>
        </div>
      </div>
    </div>
  );
};
