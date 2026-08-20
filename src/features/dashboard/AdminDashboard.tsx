import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, Users, Briefcase, Calendar, CheckCircle, 
  BarChart3, Download, AlertCircle, XCircle, GraduationCap, Check,
  Video, Plus, Trash2, Eye, EyeOff
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
  const { 
    jobs, events, alumniProfiles, approveAlumni, rejectAlumni, 
    homeMedia, addHomeMedia, deleteHomeMedia, togglePublishHomeMedia,
    createEvent, deleteEvent, togglePublishEvent 
  } = useAuth();
  
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'appr-1', name: 'Quantum Cloud Technologies', type: 'Employer', email: 'hr@quantumcloud.io', date: '2026-08-03' },
    { id: 'appr-2', name: 'Dr. Robert Miller', type: 'Alumni (2016)', email: 'robert@apple.com', date: '2026-08-04' },
  ]);

  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);
  const [mediaForm, setMediaForm] = useState({
    title: '',
    type: 'video' as 'image' | 'video',
    url: '',
    description: ''
  });

  const handleApproveEmployer = (id: string) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
  };

  const handleAddMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHomeMedia(mediaForm);
    setIsAddMediaOpen(false);
    setMediaForm({ title: '', type: 'video', url: '', description: '' });
  };

  // Pending Alumni registrations needing verification
  const pendingAlumniList = alumniProfiles.filter(a => (a as any).verification_status === 'pending');

  return (
    <div className="space-y-8">
      
      {/* Admin Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 overflow-hidden shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" /> Institutional Governance Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AlumniConnect Administration Portal
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm font-medium">
              Event Publishing • Home Media & Video Manager • IUB Verification Queue
            </p>
          </div>

          <button
            onClick={() => setIsAddMediaOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4 text-[#ff5500]" /> Add Home Media / Video
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
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">{alumniProfiles.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+12% growth this year</span>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Pending Verification</span>
            <AlertCircle className="w-5 h-5 text-amber-600 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">{pendingAlumniList.length + pendingApprovals.length}</p>
          <span className="text-[10px] text-amber-700 font-semibold">Requires Admin Review</span>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Published Home Media</span>
            <Video className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-zinc-900 mt-2">{homeMedia.length}</p>
          <span className="text-[10px] text-blue-600 font-semibold">Images & Video Links</span>
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

      {/* ADMIN HOME MEDIA & VIDEO MANAGER */}
      <div className="taste-card p-6 bg-white border border-[#e5e0d5] space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-[#ff5500]" /> Home Page Media & Video Control Panel (Admin Only)
          </h3>
          <button
            onClick={() => setIsAddMediaOpen(true)}
            className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#ff5500]" /> Add New Image/Video Link
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeMedia.map((m) => (
            <div key={m.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900 truncate max-w-[180px]">{m.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 uppercase">
                  {m.type}
                </span>
              </div>

              <p className="text-[11px] text-zinc-500 truncate">{m.url}</p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${m.is_published ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {m.is_published ? 'Published' : 'Unpublished'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => togglePublishHomeMedia(m.id)}
                    className="p-1 rounded bg-white border border-zinc-300 text-zinc-700"
                    title={m.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {m.is_published ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => deleteHomeMedia(m.id)}
                    className="p-1 rounded bg-white border border-zinc-300 text-rose-600"
                    title="Delete Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
            <AlertCircle className="w-5 h-5 text-amber-600" /> Institutional Verification Queue
          </h3>

          <div className="space-y-3">
            {/* Pending Alumni Applicants */}
            {pendingAlumniList.map((alum) => (
              <div key={alum.id} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#ff5500]" /> {alum.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                    Pending Alumni
                  </span>
                </div>
                
                <div className="text-[11px] text-zinc-600 space-y-0.5">
                  <p>IUB ID: <strong>{(alum as any).iub_id || '1910123'}</strong> • Batch of {alum.graduation_year}</p>
                  <p>Company: {alum.company} ({alum.position})</p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => approveAlumni(alum.user_id)}
                    className="w-full py-1 bg-[#0a0a0a] hover:bg-zinc-800 text-white rounded text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Check className="w-3 h-3 text-[#ff5500]" /> Verify & Approve
                  </button>
                  <button
                    onClick={() => rejectAlumni(alum.user_id)}
                    className="px-2 py-1 bg-white border border-zinc-300 hover:bg-rose-50 text-rose-600 rounded text-[11px] font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {/* Employer Queue Items */}
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900">{item.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 font-bold">
                    {item.type}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">{item.email}</p>
                
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleApproveEmployer(item.id)}
                    className="w-full py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-xs"
                  >
                    <CheckCircle className="w-3 h-3" /> Approve Account
                  </button>
                  <button
                    onClick={() => handleApproveEmployer(item.id)}
                    className="px-2 py-1 bg-zinc-200 hover:bg-rose-100 text-zinc-700 hover:text-rose-700 rounded text-[11px] transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {pendingAlumniList.length === 0 && pendingApprovals.length === 0 && (
              <p className="text-xs text-zinc-500 text-center py-6">All pending verification queue items cleared!</p>
            )}
          </div>
        </div>

      </div>

      {/* ADMIN ADD MEDIA MODAL */}
      {isAddMediaOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-scaleUp text-xs text-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-extrabold text-sm flex items-center gap-2 text-[#ff5500]">
                <Video className="w-4 h-4" /> Admin Home Media & Video Upload
              </h3>
              <button onClick={() => setIsAddMediaOpen(false)} className="text-zinc-500 hover:text-zinc-800">✕</button>
            </div>

            <form onSubmit={handleAddMediaSubmit} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Media Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Cloud Systems Keynote 2026"
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Media Type *</label>
                <select
                  value={mediaForm.type}
                  onChange={(e) => setMediaForm({ ...mediaForm, type: e.target.value as any })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                >
                  <option value="video">Video (YouTube / Vimeo / MP4 Link)</option>
                  <option value="image">Image (High-Res Photo URL)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">
                  {mediaForm.type === 'video' ? 'Video Link (YouTube, Vimeo, MP4) *' : 'Image URL *'}
                </label>
                <input
                  type="url"
                  required
                  placeholder={mediaForm.type === 'video' ? 'https://www.youtube.com/watch?v=...' : 'https://images.unsplash.com/...'}
                  value={mediaForm.url}
                  onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of this media item..."
                  value={mediaForm.description}
                  onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                />
              </div>

              <button
                type="submit"
                className="btn-black w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
              >
                Publish Media to Home Page
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
