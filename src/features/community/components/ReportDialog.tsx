import React, { useState } from 'react';
import { ReportTargetType } from '../types/community.types';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ReportDialogProps {
  isOpen: boolean;
  targetType: ReportTargetType;
  targetId: string;
  onClose: () => void;
  onSubmitReport: (reason: string, description: string) => void;
}

const REPORT_REASONS = [
  'Spam',
  'Harassment',
  'Offensive content',
  'Misleading information',
  'Irrelevant content',
  'Other'
];

export const ReportDialog: React.FC<ReportDialogProps> = ({
  isOpen,
  targetType,
  targetId,
  onClose,
  onSubmitReport
}) => {
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0]);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(selectedReason, description);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#e5e0d5] rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-scaleUp relative">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2 text-red-600 font-extrabold text-sm">
            <AlertTriangle className="w-4 h-4" /> Report Inappropriate Content
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-1 font-bold text-xs">✕</button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="font-extrabold text-zinc-950 text-sm">Report Submitted</h4>
            <p className="text-xs text-zinc-500">Thank you. Our admin moderators will review this content shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-950">Select Reason</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full bg-white border border-[#e5e0d5] rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#ff5500]"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-950">Additional Details (Optional)</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain why this content violates community guidelines..."
                className="w-full bg-white border border-[#e5e0d5] rounded-xl p-3 text-xs text-zinc-900 font-medium focus:outline-none focus:border-[#ff5500]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="btn-white px-3.5 py-1.5 text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs">
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
