import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, Phone, GraduationCap, Edit3, MapPin, 
  Briefcase, Award, Code, BookOpen, HeartHandshake, FileText, Camera, Upload, Download, Printer, X, Share2, Check 
} from 'lucide-react';
import { ProfileCompletionRing } from '../../components/profile/ProfileCompletionRing';
import { CvBuilderModal } from './CvBuilderModal';
import { uploadProfilePictureToSupabase } from '../../utils/supabase';
import { generateCvPdf } from '../../utils/generatePdf';
import { CvTemplateEngine, CvTemplateType } from '../../components/profile/CvTemplateEngine';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, profile, updateUserProfile } = useAuth();
  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CvTemplateType>('modern');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills' | 'projects' | 'networking'>('overview');

  const handleDirectPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = await uploadProfilePictureToSupabase(profile?.user_id || 'usr-1', file);
      updateUserProfile({ photo: photoUrl });
    }
  };

  const handleTriggerPdfDownload = async () => {
    setIsDownloadingPdf(true);
    if (!isPdfPreviewOpen) {
      setIsPdfPreviewOpen(true);
      await new Promise(r => setTimeout(r, 400));
    }
    const filename = `${(profile?.full_name || 'AlumniConnect').replace(/\s+/g, '_')}_CV_${selectedTemplate.toUpperCase()}.pdf`;
    await generateCvPdf('cv-live-document-template', filename);
    setIsDownloadingPdf(false);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* PROFILE COMPLETION PERCENTAGE RING (Student Only) */}
      {currentRole === 'student' && (
        <ProfileCompletionRing
          profile={profile}
          onOpenCvBuilder={() => setIsCvBuilderOpen(true)}
        />
      )}

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

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0a0a0a]">{profile?.full_name || 'User Profile'}</h1>
                <p className="text-xs text-[#ff5500] font-bold capitalize flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-[#ff5500]" /> CSE {currentRole} Profile • {profile?.headline || 'Software Engineer'}
                </p>
              </div>

              {/* ACTION BUTTONS GROUP */}
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start lg:justify-end">
                {currentRole === 'student' && (
                  <button
                    onClick={() => setIsCvBuilderOpen(true)}
                    className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Edit3 className="w-4 h-4 text-[#ff5500]" /> Launch CV Builder
                  </button>
                )}

                <button
                  onClick={() => setIsPdfPreviewOpen(true)}
                  className="btn-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#ff5500]" /> CV Templates & PDF
                </button>

                <button
                  onClick={handleTriggerPdfDownload}
                  disabled={isDownloadingPdf}
                  className="btn-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" /> {isDownloadingPdf ? 'Generating...' : 'Download PDF'}
                </button>

                <button
                  onClick={handleShareProfile}
                  className="btn-white px-3 py-2 text-xs font-semibold flex items-center gap-1 shadow-xs"
                  title="Share Public Profile Link"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-zinc-700" />}
                  {copiedShare ? 'Copied' : 'Share'}
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
              {profile?.professional_summary || profile?.bio || 'No professional summary added yet. Click Launch CV Builder to auto-generate an AI summary!'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-600 pt-1 font-medium">
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

      {/* Tabbed Profile Overview (CLEAN FULL-WIDTH TAB BAR WITHOUT BUTTON OVERLAP) */}
      <div className="taste-card p-6 space-y-6">
        <div className="border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
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
        </div>

        {/* Tab Content */}
        <div className="text-xs space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="font-extrabold text-[#0a0a0a] text-sm mb-1">Career Objective</h4>
                <p className="text-zinc-700 leading-relaxed bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
                  {profile?.career_objective || 'Not specified. Complete your CV profile to add career objective.'}
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-[#0a0a0a] text-sm mb-1">Senior Thesis & Supervisor</h4>
                <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5] space-y-1">
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

      {/* LIVE MULTI-TEMPLATE CV PREVIEW MODAL */}
      {isPdfPreviewOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-5xl my-auto shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp">
            
            {/* Modal Top Bar */}
            <div className="bg-[#f8f6f0] border-b border-[#e5e0d5] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5 text-[#ff5500]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0a0a0a]">Interactive Live CV Preview & Templates</h3>
                  <p className="text-xs text-zinc-500">Choose from 4 ATS-friendly templates & auto-generate A4 PDF files.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerPdfDownload}
                  disabled={isDownloadingPdf}
                  className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-60"
                >
                  <Download className="w-4 h-4 text-[#ff5500]" />
                  {isDownloadingPdf ? 'Generating PDF...' : 'Download PDF File'}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-white px-3 py-2 text-xs font-semibold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-700" /> Print
                </button>

                <button
                  onClick={() => setIsPdfPreviewOpen(false)}
                  className="p-2 rounded-xl bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Template Selector Bar */}
            <div className="bg-white border-b border-[#e5e0d5] px-6 py-3 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-zinc-950">Select CV Design Template:</span>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {[
                  { id: 'classic', label: '1. Classic ATS' },
                  { id: 'modern', label: '2. Modern Accent' },
                  { id: 'academic', label: '3. Academic / Research' },
                  { id: 'creative', label: '4. Creative / Portfolio' },
                ].map(tmpl => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id as CvTemplateType)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition ${
                      selectedTemplate === tmpl.id
                        ? 'bg-[#0a0a0a] text-white shadow-xs'
                        : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE DOCUMENT TEMPLATE ENGINE RENDERER */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#f0ede6] flex justify-center">
              <CvTemplateEngine
                profile={profile}
                template={selectedTemplate}
                elementId="cv-live-document-template"
                showPhoto={true}
                showReferences={true}
              />
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
