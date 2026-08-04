import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, Users, CheckCircle, FileText, Filter 
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const { profile, jobs, applications, updateApplicationStatus } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredApps = filterStatus === 'All' 
    ? applications 
    : applications.filter(a => a.status === filterStatus);

  return (
    <div className="space-y-8">
      
      {/* Employer Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 overflow-hidden shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5" /> Corporate Hiring Partner
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {profile?.full_name || 'Employer Account'} - Recruitment Portal
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm font-medium">
              CSE Talent Acquisition & Applicant Tracking System
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/20 border border-white/30 px-3 py-1.5 rounded-xl text-white text-xs font-bold backdrop-blur-md">
            <CheckCircle className="w-4 h-4 text-white" /> Employer Verified
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Total Applicants</span>
          <p className="text-2xl font-extrabold text-zinc-900 mt-1">{applications.length}</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Shortlisted Candidates</span>
          <p className="text-2xl font-extrabold text-orange-600 mt-1">
            {applications.filter(a => a.status === 'Shortlisted').length}
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Active Job Postings</span>
          <p className="text-2xl font-extrabold text-zinc-900 mt-1">{jobs.length}</p>
        </div>
      </div>

      {/* Applicant Management Pipeline Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" /> Candidate Applications Pipeline
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Review resume submissions and manage hiring statuses</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-800 focus:outline-none focus:bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-100 text-zinc-600 uppercase font-semibold text-[10px] tracking-wider border-b border-zinc-200">
              <tr>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No applications match this filter.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-zinc-50 transition">
                    <td className="py-3.5 px-4 font-bold text-zinc-900">{app.student_name || 'Applicant'}</td>
                    <td className="py-3.5 px-4 text-orange-600 font-semibold">{app.job_title}</td>
                    <td className="py-3.5 px-4 text-zinc-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-orange-600 hover:underline font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5" /> PDF Resume
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        app.status === 'Shortlisted' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                        app.status === 'Reviewing' ? 'bg-zinc-100 text-zinc-700 border-zinc-200' :
                        app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                        'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                        className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-[11px] text-zinc-800 focus:outline-none"
                      >
                        <option value="Pending">Set Pending</option>
                        <option value="Reviewing">Set Reviewing</option>
                        <option value="Shortlisted">Shortlist Candidate</option>
                        <option value="Accepted">Accept / Offer</option>
                        <option value="Rejected">Reject</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
