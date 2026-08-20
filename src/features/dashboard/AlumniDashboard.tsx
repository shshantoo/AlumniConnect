import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCheck, PlusCircle, Check, X, 
  GraduationCap, TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const INDUSTRY_DATA = [
  { name: 'Artificial Intelligence', value: 45, color: '#ea580c' },
  { name: 'Cloud Infrastructure', value: 30, color: '#f97316' },
  { name: 'Fintech & Security', value: 15, color: '#fb923c' },
  { name: 'Mobile Systems', value: 10, color: '#18181b' },
];

import { RolePreviewBar } from '../../components/dashboard/RolePreviewBar';

export const AlumniDashboard: React.FC = () => {
  const { profile, mentorshipRequests, updateMentorshipStatus, postJob, jobs } = useAuth();
  const [showPostModal, setShowPostModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobSalary, setJobSalary] = useState('$130,000 / yr');
  const [jobType, setJobType] = useState<'Full-Time' | 'Part-Time' | 'Remote'>('Full-Time');
  const [jobDesc, setJobDesc] = useState('');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    postJob({
      title: jobTitle,
      salary: jobSalary,
      type: jobType,
      description: jobDesc,
      company: 'Tech Enterprise (Alumni Referral)',
      location: 'San Francisco, CA'
    });
    setShowPostModal(false);
    setJobTitle('');
    setJobDesc('');
  };

  return (
    <div className="space-y-8">
      <RolePreviewBar />
      
      {/* Alumni Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 overflow-hidden shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
              <UserCheck className="w-3.5 h-3.5" /> Alumni Leadership Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile?.full_name || 'Alumni Leader'}!
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm font-medium">
              CSE Graduate • Mentorship & Talent Referral Network
            </p>
          </div>

          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition flex-shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-orange-400" /> Post Job Opening
          </button>
        </div>
      </div>

      {/* Pending Institutional Verification Alert Banner */}
      {profile?.verification_status === 'pending' && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-xs">
          <div className="space-y-1">
            <h4 className="font-extrabold text-amber-950 flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              Institutional Alumni Account Pending Admin Verification
            </h4>
            <p className="text-amber-800 leading-relaxed max-w-2xl">
              Your alumni registration (IUB ID: <strong>{profile?.iub_id || '1910123'}</strong>, Convocation: <strong>{profile?.convocation_number || '23rd Convocation'}</strong>) is currently undergoing Admin review. Full directory features will unlock upon approval.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[11px] whitespace-nowrap">
            Verification Pending
          </span>
        </div>
      )}

      {/* Stats Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Mentorship Status</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-5 h-5" /> Available Mentor
            </span>
            <span className="text-[11px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
              Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Pending Student Requests</span>
          <p className="text-2xl font-extrabold text-zinc-900 mt-1">
            {mentorshipRequests.filter(r => r.status === 'Pending').length}
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Referrals Posted</span>
          <p className="text-2xl font-extrabold text-orange-600 mt-1">{jobs.length}</p>
        </div>
      </div>

      {/* Main Grid: Mentorship Inbox & Industry Recharts Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mentorship Inbox (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-orange-600" /> Mentorship Requests Inbox
          </h3>

          <div className="space-y-4">
            {mentorshipRequests.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No pending mentorship requests.</p>
            ) : (
              mentorshipRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm">{req.student_name}</h4>
                      <p className="text-xs text-orange-700 font-semibold">Topic: {req.topic}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      req.status === 'Accepted'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-orange-100 text-orange-700 border-orange-200'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-700 bg-white p-3 rounded-lg border border-zinc-200 italic">
                    "{req.message}"
                  </p>

                  {req.status === 'Pending' && (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Accepted')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept Session
                      </button>
                      <button
                        onClick={() => updateMentorshipStatus(req.id, 'Rejected')}
                        className="px-3 py-1.5 bg-zinc-200 hover:bg-rose-100 text-zinc-700 hover:text-rose-700 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Industry Analytics Chart */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" /> Alumni Industry Breakdown
          </h3>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INDUSTRY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {INDUSTRY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e4e4e7', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-100 text-xs">
            {INDUSTRY_DATA.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-zinc-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-zinc-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Post Referral Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-bold text-zinc-900">Post Job Referral for CSE Students</h3>
            
            <form onSubmit={handlePostJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Position Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Stack Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Employment Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as any)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Job Description & Referral Note</label>
                <textarea
                  required
                  rows={4}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Provide role requirements and referral submission details..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 shadow-sm"
                >
                  Publish Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
