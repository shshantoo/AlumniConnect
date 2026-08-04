import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, Users, Briefcase, Calendar, CheckCircle, 
  BarChart3, Download, AlertCircle 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const USER_GROWTH_DATA = [
  { month: 'Jan', Students: 420, Alumni: 950, Employers: 30 },
  { month: 'Feb', Students: 480, Alumni: 1020, Employers: 35 },
  { month: 'Mar', Students: 530, Alumni: 1100, Employers: 38 },
  { month: 'Apr', Students: 590, Alumni: 1150, Employers: 40 },
  { month: 'May', Students: 650, Alumni: 1200, Employers: 45 },
];

export const AdminDashboard: React.FC = () => {
  const { jobs, events } = useAuth();
  
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'appr-1', name: 'Quantum Cloud Technologies', type: 'Employer', email: 'hr@quantumcloud.io', date: '2026-08-03' },
    { id: 'appr-2', name: 'Dr. Robert Miller', type: 'Alumni (2016)', email: 'robert@apple.com', date: '2026-08-04' },
    { id: 'appr-3', name: 'CyberPulse Security', type: 'Employer', email: 'contact@cyberpulse.com', date: '2026-08-04' },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* Admin Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 overflow-hidden shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" /> System Governance Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AlumniConnect Administration Portal
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm font-medium">
              Platform Analytics • Account Verification & Access Control
            </p>
          </div>

          <button
            onClick={() => alert('Exporting system analytics report (PDF)...')}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4 text-orange-400" /> Export Analytics Report
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Total Alumni Network</span>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">1,200+</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+12% growth this year</span>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Enrolled Students</span>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">650</p>
          <span className="text-[10px] text-orange-700 font-semibold">Batches 2022 - 2026</span>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Active Jobs & Internships</span>
            <Briefcase className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">{jobs.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Verified Companies</span>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Events Hosted</span>
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">{events.length}</p>
          <span className="text-[10px] text-zinc-500 font-semibold">Global Summits & Workshops</span>
        </div>
      </div>

      {/* Main Grid: Recharts User Growth & Approvals Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recharts Platform Growth Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-600" /> Platform Registration & Engagement Trends
            </h3>
            <span className="text-xs text-zinc-500 font-mono">2026 YTD</span>
          </div>

          <div className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="Alumni" fill="#ea580c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Students" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Employers" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification & Approvals Queue */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" /> Verification Approvals Queue
          </h3>

          <div className="space-y-3">
            {pendingApprovals.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">All pending approvals cleared!</p>
            ) : (
              pendingApprovals.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 font-bold">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500">{item.email}</p>
                  
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve Account
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-2 py-1 bg-zinc-200 hover:bg-rose-100 text-zinc-700 hover:text-rose-700 rounded text-[11px] transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
