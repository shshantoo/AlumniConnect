import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedReportsFromStorage, saveReportsToStorage, getSavedQuestionsFromStorage, saveQuestionsToStorage } from '../services/communityService';
import { CommunityReport } from '../types/community.types';
import { AlertTriangle, ArrowLeft, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from '../../../utils/formatTime';

export const AdminReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<CommunityReport[]>(() => getSavedReportsFromStorage());

  const handleUpdateReportStatus = (reportId: string, status: 'resolved' | 'dismissed') => {
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status,
          resolved_at: new Date().toISOString(),
          resolved_by: 'Admin User'
        };
      }
      return r;
    });
    setReports(updated);
    saveReportsToStorage(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      <button
        onClick={() => navigate('/admin/community')}
        className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff5500]" /> Back to Admin Moderation Dashboard
      </button>

      <div className="taste-card p-6 sm:p-8 bg-white border border-[#e5e0d5] rounded-3xl space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 text-[11px] font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Flagged Content Reports
        </div>
        <h1 className="text-2xl font-black text-[#0a0a0a]">Community Conduct Reports</h1>
        <p className="text-xs text-zinc-500 font-medium leading-relaxed">
          Review community reports filed by students and alumni for moderation review.
        </p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="taste-card p-10 bg-white border border-[#e5e0d5] rounded-3xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-extrabold text-[#0a0a0a]">No pending reports</h3>
            <p className="text-xs text-zinc-500 font-medium">All community discussion content is clean and compliant with guidelines.</p>
          </div>
        ) : (
          reports.map((rep) => (
            <div key={rep.id} className="taste-card p-5 bg-white border border-[#e5e0d5] rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-[#0a0a0a]">{rep.reporter_name}</span>
                  <span className="text-[10px] text-zinc-400 font-medium">reported a {rep.target_type}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                  rep.status === 'pending'
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : rep.status === 'resolved'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                }`}>
                  {rep.status}
                </span>
              </div>

              <div className="bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5] space-y-1 text-xs">
                <span className="font-extrabold text-red-700">Reason: {rep.reason}</span>
                {rep.description && <p className="text-zinc-700 font-medium">{rep.description}</p>}
              </div>

              {rep.status === 'pending' && (
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
                  <button
                    onClick={() => handleUpdateReportStatus(rep.id, 'dismissed')}
                    className="btn-white px-3 py-1.5 text-xs font-bold"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleUpdateReportStatus(rep.id, 'resolved')}
                    className="btn-black px-4 py-1.5 text-xs font-bold"
                  >
                    Resolve & Take Action
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
