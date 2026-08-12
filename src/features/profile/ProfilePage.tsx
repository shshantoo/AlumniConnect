import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, Phone, GraduationCap, Edit3, Sparkles, MapPin, 
  Globe, Briefcase, Award, Code, BookOpen, HeartHandshake, FileText, CheckCircle2 
} from 'lucide-react';
import { ProfileCompletionRing } from '../../components/profile/ProfileCompletionRing';
import { CvBuilderModal } from './CvBuilderModal';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, profile, updateUserProfile } = useAuth();
  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills' | 'projects' | 'networking'>('overview');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* PROFILE COMPLETION PERCENTAGE RING */}
      <ProfileCompletionRing
        profile={profile}
        onOpenCvBuilder={() => setIsCvBuilderOpen(true)}
      />

      {/* Profile Header Header Card */}
      <div className="taste-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#ff5500]/20 shadow-md"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0a0a0a]">{profile?.full_name || 'User Profile'}</h1>
                <p className="text-xs text-[#ff5500] font-bold capitalize flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-[#ff5500]" /> CSE {currentRole} Profile • {profile?.headline || 'Software Engineer'}
                </p>
              </div>

              <button
                onClick={() => setIsCvBuilderOpen(true)}
                className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-4 h-4 text-[#ff5500]" /> Edit 18-Section CV
              </button>
            </div>

            <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
              {profile?.professional_summary || profile?.bio || 'No professional summary added yet. Click Edit CV to generate an AI summary!'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-600 pt-2 font-medium">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#ff5500]" /> {profile?.email || currentUser?.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {profile?.phone || 'Not provided'}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#ff5500]" /> {profile?.location || 'Dhaka'}, {profile?.country || 'Bangladesh'}</span>
            </div>
          </div>
        </div>

        {/* Academic Details Strip */}
        <div className="pt-6 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
            <span className="text-zinc-500 text-[10px] uppercase font-bold">Student ID</span>
            <p className="font-bold text-[#0a0a0a] mt-0.5">{profile?.student_id || 'CSE-2026'}</p>
          </div>
          <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
            <span className="text-zinc-500 text-[10px] uppercase font-bold">Department & Degree</span>
            <p className="font-bold text-[#ff5500] mt-0.5 truncate">{profile?.program_degree || 'B.Sc. CSE'}</p>
          </div>
          <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
            <span className="text-zinc-500 text-[10px] uppercase font-bold">Graduation Year</span>
            <p className="font-bold text-[#0a0a0a] mt-0.5">Batch of {profile?.batch_year || '2026'}</p>
          </div>
          <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
            <span className="text-zinc-500 text-[10px] uppercase font-bold">CGPA</span>
            <p className="font-bold text-emerald-600 mt-0.5">{profile?.cgpa || '3.88'} / 4.00</p>
          </div>
        </div>
      </div>

      {/* Tabbed Profile Overview */}
      <div className="taste-card p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: BookOpen },
            { id: 'skills', label: 'Skills & Levels', icon: Code },
            { id: 'projects', label: 'Projects & Certs', icon: Award },
            { id: 'networking', label: 'Alumni Networking', icon: HeartHandshake },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white shadow-sm'
                    : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff5500]' : 'text-zinc-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="text-xs space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="font-extrabold text-[#0a0a0a] text-sm mb-1">Career Objective</h4>
                <p className="text-zinc-700 leading-relaxed bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5]">
                  {profile?.career_objective || 'Not specified. Complete your CV profile to add career objective.'}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-[#0a0a0a] text-sm mb-1">Senior Thesis & Supervisor</h4>
                <div className="bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5] space-y-1">
                  <p className="font-bold text-[#ff5500]">{profile?.thesis_project || 'Distributed Cloud Systems & AI'}</p>
                  <p className="text-zinc-500">Supervisor: {profile?.thesis_supervisor || 'Prof. Alan Turing Jr.'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-3 animate-fadeIn">
              <h4 className="font-extrabold text-[#0a0a0a] text-sm">Skills & Proficiency Levels</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(profile?.skills_categorized || []).map(skl => (
                  <div key={skl.id} className="p-3 rounded-xl bg-[#f8f6f0] border border-[#e5e0d5] flex items-center justify-between">
                    <span className="font-bold text-zinc-950">{skl.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] text-[10px] font-bold">
                      {skl.level} • {skl.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'networking' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#f8f6f0] border border-[#e5e0d5] space-y-2">
                <h4 className="font-bold text-[#ff5500]">"I Can Help With"</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(profile?.alumni_preferences?.can_help_with || ['Career Guidance', 'Job Referrals']).map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white border border-[#e5e0d5] font-semibold text-zinc-800">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8f6f0] border border-[#e5e0d5] space-y-2">
                <h4 className="font-bold text-zinc-950">"I'm Looking For"</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(profile?.alumni_preferences?.looking_for || ['Job Opportunities', 'Mentorship']).map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white border border-[#e5e0d5] font-semibold text-zinc-800">
                      🎯 {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CV Builder Modal Launcher */}
      <CvBuilderModal
        isOpen={isCvBuilderOpen}
        onClose={() => setIsCvBuilderOpen(false)}
        initialProfile={profile}
        onSaveProfile={(updated) => updateUserProfile(updated)}
      />

    </div>
  );
};
