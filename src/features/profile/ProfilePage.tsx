import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, Phone, GraduationCap, Edit3, MapPin, 
  Briefcase, Award, Code, BookOpen, HeartHandshake, FileText, Camera, Upload, Download, Printer, X 
} from 'lucide-react';
import { ProfileCompletionRing } from '../../components/profile/ProfileCompletionRing';
import { CvBuilderModal } from './CvBuilderModal';
import { uploadProfilePictureToSupabase } from '../../utils/supabase';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, profile, updateUserProfile } = useAuth();
  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills' | 'projects' | 'networking'>('overview');

  const handleDirectPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = await uploadProfilePictureToSupabase(profile?.user_id || 'usr-1', file);
      updateUserProfile({ photo: photoUrl });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* PROFILE COMPLETION PERCENTAGE RING */}
      <ProfileCompletionRing
        profile={profile}
        onOpenCvBuilder={() => setIsCvBuilderOpen(true)}
      />

      {/* Profile Header Card */}
      <div className="taste-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          
          {/* Avatar with Instant Photo Upload Overlay */}
          <div className="relative group w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
            <img
              src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt="Profile Avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#ff5500]/20 shadow-md"
            />
            <label className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[11px] font-bold gap-1 text-center p-1">
              <Camera className="w-5 h-5 text-[#ff5500]" />
              <span>Change Photo</span>
              <input type="file" accept="image/*" onChange={handleDirectPhotoUpload} className="hidden" />
            </label>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0a0a0a]">{profile?.full_name || 'User Profile'}</h1>
                <p className="text-xs text-[#ff5500] font-bold capitalize flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-[#ff5500]" /> CSE {currentRole} Profile • {profile?.headline || 'Software Engineer'}
                </p>
              </div>

              {/* ACTION BUTTONS: Download CV PDF & Edit 18-Section CV */}
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                <button
                  onClick={() => setIsPdfPreviewOpen(true)}
                  className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4 text-[#ff5500]" /> Download CV (PDF)
                </button>

                <label className="btn-white px-3.5 py-2 text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#ff5500]" /> Upload Photo
                  <input type="file" accept="image/*" onChange={handleDirectPhotoUpload} className="hidden" />
                </label>

                <button
                  onClick={() => setIsCvBuilderOpen(true)}
                  className="btn-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-zinc-700" /> Edit 18-Section CV
                </button>
              </div>
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

      {/* DOWNLOAD CV PDF MODAL (PRINTABLE FORMAT WITH PROFILE PICTURE) */}
      {isPdfPreviewOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-4xl my-auto shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="bg-[#f8f6f0] border-b border-[#e5e0d5] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5 text-[#ff5500]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0a0a0a]">Print / Save CV as PDF</h3>
                  <p className="text-xs text-zinc-500">Official document template with your Supabase profile picture.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4 text-[#ff5500]" /> Download / Print PDF Now
                </button>
                <button
                  onClick={() => setIsPdfPreviewOpen(false)}
                  className="p-2 rounded-xl bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Printable Box */}
            <div className="p-8 overflow-y-auto flex-1 bg-white text-zinc-900 font-sans space-y-6 print:p-0">
              
              {/* Header with Profile Picture */}
              <div className="border-b border-zinc-900 pb-5 flex justify-between items-start">
                <div className="flex items-center gap-5">
                  <img
                    src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt="CV Profile Avatar"
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-zinc-400 shadow-sm flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">{profile?.full_name || 'Your Full Name'}</h1>
                    <p className="text-sm text-[#ff5500] font-bold">{profile?.headline || 'Software Engineer'}</p>
                    <p className="text-xs text-zinc-600 mt-1">{profile?.email} • {profile?.phone} • {profile?.location}, {profile?.country}</p>
                  </div>
                </div>
                {profile?.linkedin && (
                  <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">{profile.linkedin}</span>
                )}
              </div>

              {/* Summary */}
              {profile?.professional_summary && (
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Professional Executive Summary</h3>
                  <p className="text-xs leading-relaxed text-zinc-700">{profile.professional_summary}</p>
                </div>
              )}

              {/* Education */}
              {profile?.education_history && profile.education_history.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Education History</h3>
                  {profile.education_history.map(edu => (
                    <div key={edu.id} className="flex justify-between text-xs">
                      <div>
                        <strong className="text-zinc-950">{edu.degree}</strong> — <span className="text-zinc-700">{edu.institution}</span>
                      </div>
                      <span className="text-zinc-500 font-mono">{edu.start_year} – {edu.end_year}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {profile?.work_experience && profile.work_experience.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Work Experience</h3>
                  {profile.work_experience.map(work => (
                    <div key={work.id} className="space-y-0.5 text-xs">
                      <div className="flex justify-between font-bold text-zinc-950">
                        <span>{work.title} @ {work.company}</span>
                        <span className="text-zinc-500 font-mono text-[11px]">{work.start_date} – {work.is_current ? 'Present' : work.end_date}</span>
                      </div>
                      <p className="text-zinc-700 text-[11px]">{work.responsibilities}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {profile?.skills_categorized && profile.skills_categorized.length > 0 && (
                <div className="space-y-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Categorized Skills</h3>
                  <div className="flex flex-wrap gap-1.5 text-xs pt-1">
                    {profile.skills_categorized.map(skl => (
                      <span key={skl.id} className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-medium">
                        {skl.name} ({skl.level})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {profile?.projects_list && profile.projects_list.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Key Projects</h3>
                  {profile.projects_list.map(prj => (
                    <div key={prj.id} className="text-xs space-y-0.5">
                      <p className="font-bold text-zinc-950">{prj.name} <span className="text-zinc-500 font-normal">({prj.tag})</span></p>
                      <p className="text-zinc-700 text-[11px]">{prj.description}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

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
