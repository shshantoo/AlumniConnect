import React, { useState } from 'react';
import { INITIAL_CAREER_PATHS, INITIAL_SKILLS } from '../career/services/careerService';
import { 
  ShieldCheck, Target, Plus, Edit2, Trash2, CheckCircle2, 
  Users, Award, Settings, BookOpen, Layers, Save 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'career_paths' | 'skills' | 'verification'>('career_paths');

  const [paths, setPaths] = useState(INITIAL_CAREER_PATHS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  // New Career Path form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Engineering');

  const handleAddPath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newCp = {
      id: `cp-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      skills: [
        { skillId: 'sk-1', skillName: 'HTML', importanceWeight: 8, requiredLevel: 'Intermediate' as const },
        { skillId: 'sk-3', skillName: 'JavaScript', importanceWeight: 10, requiredLevel: 'Advanced' as const },
      ],
    };
    setPaths([...paths, newCp]);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Control Center</span>
            </div>
            <h1 className="text-3xl font-black mt-2">Career Intelligence Management</h1>
            <p className="text-xs text-zinc-300 max-w-xl">
              Configure career path requirements, skill importance weights ($w_i$), roadmap templates, and user verifications.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('career_paths')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'career_paths' ? 'bg-[#ff5500] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Career Paths ({paths.length})
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'skills' ? 'bg-[#ff5500] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Skills Library ({skills.length})
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'verification' ? 'bg-[#ff5500] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Alumni Verification (3 Pending)
          </button>
        </div>
      </div>

      {/* TAB 1: CAREER PATHS MANAGEMENT */}
      {activeTab === 'career_paths' && (
        <div className="space-y-6">
          {/* Add New Career Path Card */}
          <form onSubmit={handleAddPath} className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#ff5500]" />
              <span>Create New Career Path</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title (e.g. Mobile Developer)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-bold focus:outline-none focus:border-[#ff5500]"
              />

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 font-bold focus:outline-none focus:border-[#ff5500]"
              >
                <option value="Engineering">Engineering</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Design">Design</option>
                <option value="Security">Security</option>
              </select>
            </div>

            <textarea
              rows={2}
              placeholder="Description & Industry Scope..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#0a0a0a] hover:bg-zinc-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Career Path</span>
              </button>
            </div>
          </form>

          {/* List Existing Paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paths.map((cp) => (
              <div key={cp.id} className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] bg-[#fce8d5] text-zinc-900 font-bold px-2 py-0.5 rounded uppercase">
                      {cp.category}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 mt-1">{cp.title}</h3>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-700">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">{cp.description}</p>

                <div className="pt-2 border-t border-zinc-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Configured Skill Weights ($w_i$)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cp.skills.map((s) => (
                      <span key={s.skillId} className="text-[11px] bg-zinc-100 border border-zinc-200 text-zinc-800 font-bold px-2 py-0.5 rounded">
                        {s.skillName} (w={s.importanceWeight})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SKILLS LIBRARY */}
      {activeTab === 'skills' && (
        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-zinc-900">Configured Skills Library</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div key={s.id} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-zinc-900">{s.name}</h4>
                  <span className="text-[10px] bg-zinc-200 text-zinc-700 font-bold px-1.5 py-0.5 rounded">{s.category}</span>
                </div>
                <p className="text-[11px] text-zinc-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-zinc-900">Pending Alumni Verification Requests</h3>
          <div className="space-y-3">
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Ahmed Hasan</h4>
                <p className="text-xs text-zinc-500">IUB Convocation 2021 • CSE Batch 173 • Senior Frontend Engineer @ Google</p>
              </div>
              <button className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
                Approve & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
