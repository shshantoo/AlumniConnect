import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, Search, MapPin, DollarSign, Clock, 
  Building2, FileText 
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { jobs, internships, applyForJob } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'fulltime' | 'remote' | 'internship'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const allOpportunities = [
    ...jobs.map(j => ({ ...j, category: 'job' as const })),
    ...internships.map(i => ({ ...i, salary: (i as any).stipend || i.salary, type: 'Internship' as const, category: 'internship' as const, company_logo: '' }))
  ];

  const filteredItems = allOpportunities.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'fulltime') return matchesSearch && item.type === 'Full-Time';
    if (activeTab === 'remote') return matchesSearch && item.type === 'Remote';
    if (activeTab === 'internship') return matchesSearch && item.category === 'internship';
    return matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      applyForJob(selectedJob.id, coverLetter, selectedJob.category === 'internship');
      setSelectedJob(null);
      setCoverLetter('');
      alert('Application submitted successfully!');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-950 via-zinc-900 to-black p-6 sm:p-8 border border-orange-500/25 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" /> Career & Internship Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            CSE Job Board & Alumni Career Referrals
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-xl">
            Verified opportunities posted by CSE Alumni leaders and corporate partners.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search role, company, or tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'fulltime', label: 'Full-Time Roles' },
            { id: 'remote', label: 'Remote Only' },
            { id: 'internship', label: 'Internships' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Jobs Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400 space-y-2">
          <Briefcase className="w-8 h-8 text-orange-500 mx-auto opacity-80" />
          <p className="font-bold text-white text-sm">No job openings found.</p>
          <p className="text-xs text-zinc-500">Post a new referral or check back later!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 rounded-2xl p-6 transition-all shadow-lg group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center flex-shrink-0 font-bold text-orange-400 group-hover:scale-105 transition-transform">
                    <Building2 className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition">{item.title}</h3>
                      <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-500/30 text-[10px] uppercase font-bold">
                        {item.type || 'Internship'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 font-semibold">{item.company}</p>
                    <p className="text-xs text-zinc-400 line-clamp-2 max-w-2xl mt-1">{item.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {item.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {item.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-500" /> Deadline: {(item as any).deadline || 'Open'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end md:flex-col md:items-end gap-3 flex-shrink-0">
                  <button
                    onClick={() => setSelectedJob(item)}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition whitespace-nowrap"
                  >
                    Apply Position
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-scaleUp">
            <h3 className="text-lg font-bold text-white">Apply for {selectedJob.title}</h3>
            <p className="text-xs text-orange-300">{selectedJob.company} • {selectedJob.location}</p>
            
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Attached Resume</label>
                <div className="flex items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-300">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>resume-2026.pdf</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Cover Note / Pitch</label>
                <textarea
                  required
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Outline your background, relevant projects, and interest in this role..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
