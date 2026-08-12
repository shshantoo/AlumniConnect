import React, { useState } from 'react';
import { 
  UserProfile, WorkExperienceItem, EducationItem, 
  CategorizedSkillItem, ProjectItem, CertificationItem 
} from '../../types/database.types';
import { 
  X, Check, Plus, Trash2, Sparkles, ArrowLeft, 
  ArrowRight, Printer, User, GraduationCap, 
  Briefcase, Code, Award, BookOpen, HeartHandshake, FileText,
  Camera, Upload, Image as ImageIcon
} from 'lucide-react';

interface CvBuilderModalProps {
  initialProfile: Partial<UserProfile> | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updatedProfile: Partial<UserProfile>) => void;
}

export const CvBuilderModal: React.FC<CvBuilderModalProps> = ({
  initialProfile,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    full_name: initialProfile?.full_name || '',
    first_name: initialProfile?.first_name || '',
    last_name: initialProfile?.last_name || '',
    username: initialProfile?.username || '',
    preferred_name: initialProfile?.preferred_name || '',
    headline: initialProfile?.headline || 'CSE Graduate & Full-Stack Software Engineer',
    email: initialProfile?.email || '',
    phone: initialProfile?.phone || '',
    country: initialProfile?.country || 'Bangladesh',
    location: initialProfile?.location || 'Dhaka',
    dob: initialProfile?.dob || '',
    gender: initialProfile?.gender || '',
    nationality: initialProfile?.nationality || '',
    photo: initialProfile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: initialProfile?.bio || '',
    linkedin: initialProfile?.linkedin || '',
    portfolio: initialProfile?.portfolio || '',
    github: initialProfile?.github || '',
    
    // University
    university: initialProfile?.university || 'University of Engineering & Technology',
    student_id: initialProfile?.student_id || 'CSE-2026-08',
    department: initialProfile?.department || 'Computer Science & Engineering',
    program_degree: initialProfile?.program_degree || 'B.Sc. in Computer Science & Engineering',
    major_minor: initialProfile?.major_minor || 'Software Engineering & AI',
    batch_year: initialProfile?.batch_year || '2026',
    enrollment_year: initialProfile?.enrollment_year || '2022',
    graduation_date: initialProfile?.graduation_date || '2026-06-30',
    cgpa: initialProfile?.cgpa || '3.88',
    thesis_project: initialProfile?.thesis_project || 'Distributed Cloud Microservices & AI Edge Computing',
    thesis_supervisor: initialProfile?.thesis_supervisor || 'Prof. Alan Turing Jr.',

    // Professional Summary
    career_objective: initialProfile?.career_objective || 'To build high-performance distributed backend architectures and scalable Web3/AI tools.',
    professional_summary: initialProfile?.professional_summary || 'Dedicated CSE graduate with expertise in React 19, TypeScript, Node.js, and cloud systems.',

    // Lists
    work_experience: initialProfile?.work_experience || [
      {
        id: 'exp-1',
        title: 'Full Stack Software Engineer Intern',
        company: 'Quantum Tech Solutions',
        type: 'Internship',
        location: 'Dhaka, Bangladesh',
        start_date: '2025-01',
        end_date: '2025-07',
        is_current: false,
        responsibilities: 'Engineered responsive React web apps and Supabase cloud APIs.',
        achievements: 'Boosted API query throughput by 35%.',
        technologies: 'React, TypeScript, Tailwind, Supabase'
      }
    ],

    education_history: initialProfile?.education_history || [
      {
        id: 'edu-1',
        degree: 'B.Sc. in Computer Science & Engineering',
        institution: 'University of Engineering & Technology',
        department: 'Computer Science & Engineering',
        major: 'Software Engineering',
        start_year: '2022',
        end_year: '2026',
        cgpa: '3.88',
        level: 'University'
      }
    ],

    skills_categorized: initialProfile?.skills_categorized || [
      { id: 'skl-1', name: 'TypeScript / JavaScript', category: 'Technical', level: 'Expert' },
      { id: 'skl-2', name: 'React 19 & Vite', category: 'Technical', level: 'Advanced' },
      { id: 'skl-3', name: 'Supabase & PostgreSQL', category: 'Technical', level: 'Advanced' },
      { id: 'skl-4', name: 'System Architecture', category: 'Professional', level: 'Advanced' },
      { id: 'skl-5', name: 'Technical Leadership', category: 'Professional', level: 'Intermediate' }
    ],

    projects_list: initialProfile?.projects_list || [
      {
        id: 'prj-1',
        name: 'AlumniConnect CSE Portal',
        description: 'Comprehensive alumni directory with OpenFreeMap vector tiles, role dashboards & Supabase database.',
        role: 'Lead Architect',
        technologies: 'React, Vite, Supabase, MapLibre GL',
        tag: 'University Project',
        project_url: 'https://github.com/shshantoo/AlumniConnect'
      }
    ],

    certifications_list: initialProfile?.certifications_list || [
      {
        id: 'crt-1',
        name: 'Google Cloud Certified Cloud Developer',
        issuing_org: 'Google Cloud',
        issue_date: '2025-05',
        credential_id: 'GCP-DEV-90812'
      }
    ],

    publications_list: initialProfile?.publications_list || [],
    extracurriculars_list: initialProfile?.extracurriculars_list || [],
    alumni_preferences: initialProfile?.alumni_preferences || {
      current_title: 'Software Engineer',
      current_company: 'Tech Enterprise',
      industry: 'Artificial Intelligence & Cloud',
      open_to_opportunities: true,
      open_to_networking: true,
      available_for_mentorship: true,
      can_help_with: ['Career Guidance', 'Job Referrals', 'Technical Mentoring'],
      looking_for: ['Job Opportunities', 'Research Partner', 'Networking']
    }
  });

  if (!isOpen) return null;

  // Photo File Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Dynamic Array Field Updates
  const addWorkExp = () => {
    const newWork: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      type: 'Full-time',
      location: '',
      start_date: '',
      is_current: true,
      responsibilities: ''
    };
    setFormData(prev => ({ ...prev, work_experience: [...(prev.work_experience || []), newWork] }));
  };

  const removeWorkExp = (id: string) => {
    setFormData(prev => ({
      ...prev,
      work_experience: (prev.work_experience || []).filter(w => w.id !== id)
    }));
  };

  const addEdu = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      start_year: '',
      end_year: '',
      level: 'University'
    };
    setFormData(prev => ({ ...prev, education_history: [...(prev.education_history || []), newEdu] }));
  };

  const removeEdu = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education_history: (prev.education_history || []).filter(e => e.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: CategorizedSkillItem = {
      id: `skl-${Date.now()}`,
      name: '',
      category: 'Technical',
      level: 'Intermediate'
    };
    setFormData(prev => ({ ...prev, skills_categorized: [...(prev.skills_categorized || []), newSkill] }));
  };

  const removeSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      skills_categorized: (prev.skills_categorized || []).filter(s => s.id !== id)
    }));
  };

  const addProject = () => {
    const newPrj: ProjectItem = {
      id: `prj-${Date.now()}`,
      name: '',
      description: '',
      tag: 'University Project'
    };
    setFormData(prev => ({ ...prev, projects_list: [...(prev.projects_list || []), newPrj] }));
  };

  const removeProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects_list: (prev.projects_list || []).filter(p => p.id !== id)
    }));
  };

  // AI Summary Generator Trigger
  const handleGenerateAiSummary = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      const generated = `Ambitious and results-driven ${formData.program_degree || 'CSE Graduate'} with expertise in ${
        (formData.skills_categorized || []).map(s => s.name).slice(0, 3).join(', ') || 'software engineering'
      }. Proven track record of developing scalable applications, conducting distributed systems research, and actively mentoring university peers. Seeking high-impact software engineering roles.`;
      
      setFormData(prev => ({ ...prev, professional_summary: generated }));
      setIsGeneratingAi(false);
    }, 900);
  };

  const handleSaveAll = () => {
    onSaveProfile(formData);
    onClose();
  };

  // Steps Configuration
  const STEPS = [
    { num: 1, title: 'Personal & Photo', icon: User },
    { num: 2, title: 'University & Alumni', icon: GraduationCap },
    { num: 3, title: 'AI Summary', icon: Sparkles },
    { num: 4, title: 'Work Experience', icon: Briefcase },
    { num: 5, title: 'Education', icon: BookOpen },
    { num: 6, title: 'Skills & Levels', icon: Code },
    { num: 7, title: 'Projects & Certs', icon: Award },
    { num: 8, title: 'Alumni Networking', icon: HeartHandshake },
    { num: 9, title: 'Template & Print CV', icon: FileText },
  ];

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-5xl my-auto shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-scaleUp">
        
        {/* Modal Top Header */}
        <div className="bg-[#f8f6f0] border-b border-[#e5e0d5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#ff5500]" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a] tracking-tight">Interactive 18-Section CV Builder</h2>
              <p className="text-xs text-zinc-500 font-medium">Build your professional CV & Alumni profile score</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="bg-white border-b border-[#e5e0d5] px-6 py-3 overflow-x-auto scrollbar-none flex items-center gap-2">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-semibold text-xs transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white shadow-sm'
                    : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff5500]' : 'text-zinc-500'}`} />
                <span>{s.num}. {s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-zinc-800">
          
          {/* STEP 1: Personal Info & Photo Upload */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 1: Personal Information & Profile Photo</h3>
              
              {/* Profile Photo Upload Box */}
              <div className="taste-card p-4 flex flex-col sm:flex-row items-center gap-4 bg-[#f8f6f0] border border-[#e5e0d5]">
                <div className="relative group w-20 h-20 flex-shrink-0">
                  <img
                    src={formData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt="Profile Avatar Preview"
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#ff5500]/30 shadow-sm"
                  />
                  <label className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-1">
                    <Camera className="w-4 h-4 text-[#ff5500]" />
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h4 className="font-bold text-zinc-950 text-xs">Profile Picture Avatar</h4>
                  <p className="text-[11px] text-zinc-500">Upload a JPG/PNG image file or paste an image URL.</p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                    <label className="btn-black px-3 py-1.5 text-[11px] font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-[#ff5500]" /> Upload Image File
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL..."
                      value={formData.photo || ''}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      className="bg-white border border-[#e5e0d5] rounded-xl px-3 py-1.5 text-xs text-zinc-900 focus:outline-none max-w-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.first_name || ''}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value, full_name: `${e.target.value} ${formData.last_name || ''}` })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.last_name || ''}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value, full_name: `${formData.first_name || ''} ${e.target.value}` })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Username *</label>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Professional Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer at Meta"
                    value={formData.headline || ''}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Mobile / Phone *</label>
                  <input
                    type="text"
                    placeholder="+880 1700-000000"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Country *</label>
                  <input
                    type="text"
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Current Location (City) *</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.in/in/username"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: University & Alumni Details */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 2: University & Academic Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">University Name</label>
                  <input
                    type="text"
                    value={formData.university || ''}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Student ID</label>
                  <input
                    type="text"
                    value={formData.student_id || ''}
                    onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Program / Degree</label>
                  <input
                    type="text"
                    value={formData.program_degree || ''}
                    onChange={(e) => setFormData({ ...formData, program_degree: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Batch / Graduation Year</label>
                  <input
                    type="text"
                    value={formData.batch_year || ''}
                    onChange={(e) => setFormData({ ...formData, batch_year: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">CGPA (Optional)</label>
                  <input
                    type="text"
                    value={formData.cgpa || ''}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Thesis / Capstone Project Title</label>
                  <input
                    type="text"
                    value={formData.thesis_project || ''}
                    onChange={(e) => setFormData({ ...formData, thesis_project: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Thesis Supervisor</label>
                  <input
                    type="text"
                    value={formData.thesis_supervisor || ''}
                    onChange={(e) => setFormData({ ...formData, thesis_supervisor: e.target.value })}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Professional Summary + AI Generator */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 3: Professional Summary</h3>
                  <p className="text-xs text-zinc-500">Draft a compelling summary for recruiters & alumni mentors.</p>
                </div>
                
                <button
                  type="button"
                  onClick={handleGenerateAiSummary}
                  disabled={isGeneratingAi}
                  className="btn-black px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ff5500] animate-spin" />
                  {isGeneratingAi ? 'Generating AI Draft...' : 'AI Auto-Generate Summary'}
                </button>
              </div>

              <div>
                <label className="block font-bold mb-1">Career Objective</label>
                <input
                  type="text"
                  value={formData.career_objective || ''}
                  onChange={(e) => setFormData({ ...formData, career_objective: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Professional Executive Summary</label>
                <textarea
                  rows={5}
                  value={formData.professional_summary || ''}
                  onChange={(e) => setFormData({ ...formData, professional_summary: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Work Experience */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 4: Work Experience</h3>
                <button
                  onClick={addWorkExp}
                  className="btn-white px-3 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#ff5500]" /> Add Experience
                </button>
              </div>

              {(formData.work_experience || []).map((work, idx) => (
                <div key={work.id} className="taste-card p-4 space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-extrabold text-[#0a0a0a]">Position #{idx + 1}</span>
                    <button
                      onClick={() => removeWorkExp(work.id)}
                      className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Job Title</label>
                      <input
                        type="text"
                        value={work.title}
                        onChange={(e) => {
                          const updated = [...(formData.work_experience || [])];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, work_experience: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Company</label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) => {
                          const updated = [...(formData.work_experience || [])];
                          updated[idx].company = e.target.value;
                          setFormData({ ...formData, work_experience: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Employment Type</label>
                      <select
                        value={work.type}
                        onChange={(e) => {
                          const updated = [...(formData.work_experience || [])];
                          updated[idx].type = e.target.value as any;
                          setFormData({ ...formData, work_experience: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Key Responsibilities & Achievements</label>
                    <textarea
                      rows={2}
                      value={work.responsibilities}
                      onChange={(e) => {
                        const updated = [...(formData.work_experience || [])];
                        updated[idx].responsibilities = e.target.value;
                        setFormData({ ...formData, work_experience: updated });
                      }}
                      className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: Education History */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 5: Education History</h3>
                <button
                  onClick={addEdu}
                  className="btn-white px-3 py-1.5 text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#ff5500]" /> Add Education
                </button>
              </div>

              {(formData.education_history || []).map((edu, idx) => (
                <div key={edu.id} className="taste-card p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-extrabold text-[#0a0a0a]">Degree #{idx + 1}</span>
                    <button onClick={() => removeEdu(edu.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...(formData.education_history || [])];
                          updated[idx].degree = e.target.value;
                          setFormData({ ...formData, education_history: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...(formData.education_history || [])];
                          updated[idx].institution = e.target.value;
                          setFormData({ ...formData, education_history: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Level</label>
                      <select
                        value={edu.level || 'University'}
                        onChange={(e) => {
                          const updated = [...(formData.education_history || [])];
                          updated[idx].level = e.target.value as any;
                          setFormData({ ...formData, education_history: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      >
                        <option value="University">University</option>
                        <option value="College">College</option>
                        <option value="School">School</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 6: Skills & Proficiency */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 6: Categorized Skills & Proficiency Levels</h3>
                <button onClick={addSkill} className="btn-white px-3 py-1.5 text-xs flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-[#ff5500]" /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(formData.skills_categorized || []).map((skl, idx) => (
                  <div key={skl.id} className="taste-card p-3 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Skill name (e.g. React 19)"
                      value={skl.name}
                      onChange={(e) => {
                        const updated = [...(formData.skills_categorized || [])];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, skills_categorized: updated });
                      }}
                      className="flex-1 bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                    />

                    <select
                      value={skl.category}
                      onChange={(e) => {
                        const updated = [...(formData.skills_categorized || [])];
                        updated[idx].category = e.target.value as any;
                        setFormData({ ...formData, skills_categorized: updated });
                      }}
                      className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Professional">Professional</option>
                      <option value="Industry">Industry</option>
                    </select>

                    <select
                      value={skl.level}
                      onChange={(e) => {
                        const updated = [...(formData.skills_categorized || [])];
                        updated[idx].level = e.target.value as any;
                        setFormData({ ...formData, skills_categorized: updated });
                      }}
                      className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs font-bold text-[#ff5500]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>

                    <button onClick={() => removeSkill(skl.id)} className="p-1 text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Projects */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 7: Key Projects</h3>
                <button onClick={addProject} className="btn-white px-3 py-1.5 text-xs flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-[#ff5500]" /> Add Project
                </button>
              </div>

              {(formData.projects_list || []).map((prj, idx) => (
                <div key={prj.id} className="taste-card p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-extrabold text-[#0a0a0a]">Project #{idx + 1}</span>
                    <button onClick={() => removeProject(prj.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Project Name</label>
                      <input
                        type="text"
                        value={prj.name}
                        onChange={(e) => {
                          const updated = [...(formData.projects_list || [])];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, projects_list: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Role</label>
                      <input
                        type="text"
                        value={prj.role || ''}
                        onChange={(e) => {
                          const updated = [...(formData.projects_list || [])];
                          updated[idx].role = e.target.value;
                          setFormData({ ...formData, projects_list: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Project Tag</label>
                      <select
                        value={prj.tag}
                        onChange={(e) => {
                          const updated = [...(formData.projects_list || [])];
                          updated[idx].tag = e.target.value as any;
                          setFormData({ ...formData, projects_list: updated });
                        }}
                        className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                      >
                        <option value="University Project">University Project</option>
                        <option value="Personal Project">Personal Project</option>
                        <option value="Professional Project">Professional Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Description & Technologies</label>
                    <textarea
                      rows={2}
                      value={prj.description}
                      onChange={(e) => {
                        const updated = [...(formData.projects_list || [])];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, projects_list: updated });
                      }}
                      className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 8: Alumni Networking Preferences */}
          {currentStep === 8 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 8: Alumni Networking Preferences</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="taste-card p-4 space-y-3">
                  <h4 className="font-bold text-[#ff5500]">"I Can Help With" (Select All That Apply)</h4>
                  <div className="space-y-2">
                    {['Career guidance', 'Internship opportunities', 'Job referrals', 'Industry advice', 'Technical mentoring', 'Entrepreneurship', 'Research collaboration'].map(tag => (
                      <label key={tag} className="flex items-center gap-2 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(formData.alumni_preferences?.can_help_with || []).includes(tag)}
                          onChange={(e) => {
                            const current = formData.alumni_preferences?.can_help_with || [];
                            const updated = e.target.checked
                              ? [...current, tag]
                              : current.filter(t => t !== tag);
                            setFormData({
                              ...formData,
                              alumni_preferences: { ...formData.alumni_preferences, can_help_with: updated }
                            });
                          }}
                          className="rounded text-[#ff5500]"
                        />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="taste-card p-4 space-y-3">
                  <h4 className="font-bold text-zinc-900">"I'm Looking For" (Select All That Apply)</h4>
                  <div className="space-y-2">
                    {['Job opportunities', 'Internship', 'Mentor', 'Mentee', 'Co-founder', 'Research partner', 'Networking'].map(tag => (
                      <label key={tag} className="flex items-center gap-2 font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={(formData.alumni_preferences?.looking_for || []).includes(tag)}
                          onChange={(e) => {
                            const current = formData.alumni_preferences?.looking_for || [];
                            const updated = e.target.checked
                              ? [...current, tag]
                              : current.filter(t => t !== tag);
                            setFormData({
                              ...formData,
                              alumni_preferences: { ...formData.alumni_preferences, looking_for: updated }
                            });
                          }}
                          className="rounded text-[#ff5500]"
                        />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Printable CV Preview & Template Export */}
          {currentStep === 9 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-[#0a0a0a]">Step 9: Professional CV Document Preview</h3>
                  <p className="text-xs text-zinc-500">Live printable template generated directly from your profile data.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-black px-4 py-2 text-xs flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#ff5500]" /> Print / Export PDF
                  </button>
                </div>
              </div>

              {/* CV Document Box */}
              <div className="bg-white border border-zinc-300 rounded-2xl p-8 space-y-6 shadow-md text-zinc-900 font-sans print:shadow-none print:border-none">
                {/* CV Header */}
                <div className="border-b border-zinc-900 pb-4 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt="CV Avatar"
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-zinc-300"
                    />
                    <div>
                      <h1 className="text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">{formData.full_name || 'Your Full Name'}</h1>
                      <p className="text-sm text-[#ff5500] font-bold">{formData.headline || 'Software Engineer'}</p>
                      <p className="text-xs text-zinc-600 mt-1">{formData.email} • {formData.phone} • {formData.location}, {formData.country}</p>
                    </div>
                  </div>
                  {formData.linkedin && (
                    <span className="text-[11px] font-mono text-zinc-500">{formData.linkedin}</span>
                  )}
                </div>

                {/* Summary */}
                {formData.professional_summary && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-0.5">Professional Summary</h3>
                    <p className="text-xs leading-relaxed text-zinc-700">{formData.professional_summary}</p>
                  </div>
                )}

                {/* Education */}
                {formData.education_history && formData.education_history.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-0.5">Education</h3>
                    {formData.education_history.map(edu => (
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
                {formData.work_experience && formData.work_experience.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-0.5">Work Experience</h3>
                    {formData.work_experience.map(work => (
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
                {formData.skills_categorized && formData.skills_categorized.length > 0 && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-0.5">Key Skills</h3>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {formData.skills_categorized.map(skl => (
                        <span key={skl.id} className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-medium">
                          {skl.name} ({skl.level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Controls */}
        <div className="bg-[#f8f6f0] border-t border-[#e5e0d5] px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            className="btn-white px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Step
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveAll}
              className="btn-black px-5 py-2.5 text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4 text-[#ff5500]" /> Save All & Complete Profile
            </button>

            {currentStep < 9 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, 9))}
                className="btn-white px-4 py-2 text-xs flex items-center gap-1.5"
              >
                Next Step <ArrowRight className="w-4 h-4 text-[#ff5500]" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
