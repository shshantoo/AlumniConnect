import React from 'react';
import { UserProfile } from '../../types/database.types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, GraduationCap, Briefcase, Code, Award, BookOpen } from 'lucide-react';

export type CvTemplateType = 'classic' | 'modern' | 'academic' | 'creative';

interface CvTemplateEngineProps {
  profile: Partial<UserProfile> | null;
  template: CvTemplateType;
  elementId?: string;
  showPhoto?: boolean;
  showReferences?: boolean;
}

export const CvTemplateEngine: React.FC<CvTemplateEngineProps> = ({
  profile,
  template = 'modern',
  elementId = 'cv-template-document',
  showPhoto = true,
  showReferences = true,
}) => {
  if (!profile) return null;

  const fullName = profile.full_name || `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'MOHAMMAD RABBI';
  const headline = profile.headline || 'Computer Science Student | Creative Professional';
  const email = profile.email || 'email@example.com';
  const phone = profile.phone || '+880 1700-000000';
  const location = `${profile.location || 'Dhaka'}, ${profile.country || 'Bangladesh'}`;
  const photo = profile.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

  // Group skills by category
  const technicalSkills = (profile.skills_categorized || []).filter(s => s.category === 'Technical');
  const professionalSkills = (profile.skills_categorized || []).filter(s => s.category === 'Professional');
  const industrySkills = (profile.skills_categorized || []).filter(s => s.category === 'Industry');

  return (
    <div
      id={elementId}
      className="bg-white text-zinc-900 font-sans p-8 sm:p-10 max-w-[794px] mx-auto shadow-sm border border-zinc-200 print:border-none print:shadow-none print:p-0 leading-relaxed text-[11px]"
      style={{ width: '794px', minHeight: '1123px', boxSizing: 'border-box' }}
    >
      {/* ========================================================================= */}
      {/* TEMPLATE 1: CLASSIC (Traditional Professional ATS CV)                     */}
      {/* ========================================================================= */}
      {template === 'classic' && (
        <div className="space-y-5">
          {/* Header */}
          <div className="border-b-2 border-zinc-950 pb-4 text-center space-y-1">
            <h1 className="text-3xl font-extrabold text-zinc-950 uppercase tracking-tight">{fullName}</h1>
            <p className="text-xs font-bold text-zinc-800">{headline}</p>
            
            <p className="text-[10px] text-zinc-600 font-medium pt-1">
              📧 {email} | 📱 {phone} | 📍 {location}
            </p>
            
            <p className="text-[10px] text-zinc-500 font-mono flex items-center justify-center gap-3 pt-0.5">
              {profile.linkedin && <span>LinkedIn: {profile.linkedin}</span>}
              {profile.github && <span>GitHub: {profile.github}</span>}
              {profile.portfolio && <span>Portfolio: {profile.portfolio}</span>}
            </p>
          </div>

          {/* Professional Summary */}
          {profile.professional_summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Professional Summary</h2>
              <p className="text-zinc-800 text-[11px] leading-relaxed">{profile.professional_summary}</p>
            </div>
          )}

          {/* Education */}
          {profile.education_history && profile.education_history.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Education</h2>
              {profile.education_history.map(edu => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{edu.degree} — {edu.institution}</span>
                    <span className="font-mono text-zinc-600 text-[10px]">{edu.start_year} – {edu.end_year}</span>
                  </div>
                  {edu.cgpa && <p className="text-zinc-700 text-[10px]">CGPA: {edu.cgpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Work Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Work Experience</h2>
              {profile.work_experience.map(work => (
                <div key={work.id} className="space-y-1">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{work.title} — {work.company}</span>
                    <span className="font-mono text-zinc-600 text-[10px]">{work.start_date} – {work.is_current ? 'Present' : work.end_date} | {work.location}</span>
                  </div>
                  <p className="text-zinc-700 text-[11px] leading-snug">• {work.responsibilities}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {profile.skills_categorized && profile.skills_categorized.length > 0 && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Skills</h2>
              <div className="space-y-1 text-[11px]">
                {technicalSkills.length > 0 && (
                  <p><strong>Technical Skills:</strong> {technicalSkills.map(s => `${s.name} (${s.level})`).join(', ')}</p>
                )}
                {professionalSkills.length > 0 && (
                  <p><strong>Professional Skills:</strong> {professionalSkills.map(s => `${s.name} (${s.level})`).join(', ')}</p>
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {profile.projects_list && profile.projects_list.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Key Projects</h2>
              {profile.projects_list.map(prj => (
                <div key={prj.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-zinc-950 text-[11px]">
                    <span>{prj.name} ({prj.tag})</span>
                    {prj.project_url && <span className="font-mono text-zinc-500 text-[10px]">{prj.project_url}</span>}
                  </div>
                  <p className="text-zinc-700 text-[10px]">• {prj.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {showReferences && (
            <div className="pt-2 border-t border-zinc-200">
              <p className="italic text-zinc-500 text-[10px] text-center">References available upon request</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEMPLATE 2: MODERN (Clean Layout with Electric Orange Hierarchy)          */}
      {/* ========================================================================= */}
      {template === 'modern' && (
        <div className="space-y-5">
          {/* Header with optional photo */}
          <div className="border-b-2 border-[#ff5500] pb-4 flex items-center justify-between gap-6">
            <div className="space-y-1 flex-1">
              <h1 className="text-3xl font-extrabold text-[#0a0a0a] uppercase tracking-tight">{fullName}</h1>
              <p className="text-xs font-bold text-[#ff5500]">{headline}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-600 font-medium pt-1">
                <span>📧 {email}</span>
                <span>📱 {phone}</span>
                <span>📍 {location}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-500 pt-0.5">
                {profile.linkedin && <span>LinkedIn: {profile.linkedin}</span>}
                {profile.github && <span>GitHub: {profile.github}</span>}
              </div>
            </div>

            {showPhoto && photo && (
              <img
                src={photo}
                alt={fullName}
                crossOrigin="anonymous"
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#ff5500] shadow-sm flex-shrink-0"
              />
            )}
          </div>

          {/* Summary */}
          {profile.professional_summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Professional Summary
              </h2>
              <p className="text-zinc-800 text-[11px] leading-relaxed bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5]">
                {profile.professional_summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Work Experience
              </h2>
              {profile.work_experience.map(work => (
                <div key={work.id} className="space-y-1 bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5]">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{work.title} @ <span className="text-[#ff5500]">{work.company}</span></span>
                    <span className="font-mono text-zinc-600 text-[10px]">{work.start_date} – {work.is_current ? 'Present' : work.end_date}</span>
                  </div>
                  <p className="text-zinc-700 text-[11px]">• {work.responsibilities}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {profile.education_history && profile.education_history.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Education
              </h2>
              {profile.education_history.map(edu => (
                <div key={edu.id} className="flex justify-between text-xs font-bold text-zinc-950 bg-[#f8f6f0] p-2.5 rounded-xl border border-[#e5e0d5]">
                  <div>
                    <span>{edu.degree}</span> — <span className="text-[#ff5500]">{edu.institution}</span>
                  </div>
                  <span className="font-mono text-zinc-600 text-[10px]">{edu.start_year} – {edu.end_year}</span>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {profile.skills_categorized && profile.skills_categorized.length > 0 && (
            <div className="space-y-1">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Categorized Skills
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {profile.skills_categorized.map(skl => (
                  <span key={skl.id} className="px-2.5 py-1 rounded-lg bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] font-semibold text-[10px]">
                    {skl.name} ({skl.level})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {profile.projects_list && profile.projects_list.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5500]" /> Featured Projects
              </h2>
              {profile.projects_list.map(prj => (
                <div key={prj.id} className="p-3 rounded-xl bg-[#f8f6f0] border border-[#e5e0d5] space-y-1">
                  <div className="flex justify-between font-bold text-zinc-950 text-[11px]">
                    <span>{prj.name} <span className="text-[#ff5500]">({prj.tag})</span></span>
                    {prj.project_url && <span className="font-mono text-zinc-500 text-[10px]">{prj.project_url}</span>}
                  </div>
                  <p className="text-zinc-700 text-[10px]">{prj.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {showReferences && (
            <div className="pt-2 border-t border-zinc-200">
              <p className="italic text-zinc-500 text-[10px] text-center">References available upon request</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEMPLATE 3: ACADEMIC (Research, Thesis, Supervisor & Publications)         */}
      {/* ========================================================================= */}
      {template === 'academic' && (
        <div className="space-y-5">
          <div className="border-b-2 border-zinc-900 pb-3 space-y-1">
            <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight">{fullName}</h1>
            <p className="text-xs font-bold text-zinc-800">{headline} • {profile.department || 'CSE Department'}</p>
            <p className="text-[10px] text-zinc-600 font-mono">
              {email} | {phone} | {location}
            </p>
          </div>

          {/* Thesis & Academic Profile */}
          <div className="bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5] space-y-1">
            <h2 className="font-bold text-xs text-zinc-950 uppercase">Senior Thesis / Research Project</h2>
            <p className="font-bold text-[#ff5500]">{profile.thesis_project || 'Distributed Cloud Microservices & AI Systems'}</p>
            <p className="text-zinc-600 text-[10px]">Thesis Supervisor: {profile.thesis_supervisor || 'Prof. Alan Turing Jr.'}</p>
          </div>

          {/* Education */}
          {profile.education_history && profile.education_history.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Academic Qualifications</h2>
              {profile.education_history.map(edu => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{edu.degree} — {edu.institution}</span>
                    <span className="font-mono text-zinc-600 text-[10px]">{edu.start_year} – {edu.end_year}</span>
                  </div>
                  {edu.cgpa && <p className="text-zinc-700 text-[10px]">CGPA: {edu.cgpa} / 4.00</p>}
                </div>
              ))}
            </div>
          )}

          {/* Publications */}
          {profile.publications_list && profile.publications_list.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Publications & Research Papers</h2>
              {profile.publications_list.map(pub => (
                <div key={pub.id} className="space-y-0.5 bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5]">
                  <p className="font-bold text-zinc-950">{pub.title}</p>
                  <p className="text-zinc-600 text-[10px]">{pub.authors} ({pub.date}) — <em>{pub.publisher}</em></p>
                  {pub.doi && <p className="font-mono text-zinc-500 text-[10px]">DOI: {pub.doi}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Work / Teaching Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-300 pb-0.5">Teaching & Professional Experience</h2>
              {profile.work_experience.map(work => (
                <div key={work.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{work.title} @ {work.company}</span>
                    <span className="font-mono text-zinc-600 text-[10px]">{work.start_date} – {work.is_current ? 'Present' : work.end_date}</span>
                  </div>
                  <p className="text-zinc-700 text-[10px]">• {work.responsibilities}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEMPLATE 4: CREATIVE (Visual Accent & Portfolio Highlights)                 */}
      {/* ========================================================================= */}
      {template === 'creative' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div className="bg-[#0a0a0a] text-white p-6 rounded-2xl flex items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">{fullName}</h1>
              <p className="text-xs font-bold text-[#ff5500]">{headline}</p>
              <p className="text-[10px] text-zinc-300">📧 {email} • 📱 {phone} • 📍 {location}</p>
            </div>

            {showPhoto && photo && (
              <img
                src={photo}
                alt={fullName}
                crossOrigin="anonymous"
                className="w-20 h-20 rounded-xl object-cover ring-2 ring-[#ff5500] flex-shrink-0"
              />
            )}
          </div>

          {/* Summary */}
          {profile.professional_summary && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5">Creative Summary</h2>
              <p className="text-zinc-800 text-[11px] leading-relaxed">{profile.professional_summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {profile.work_experience && profile.work_experience.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5">Experience</h2>
              {profile.work_experience.map(work => (
                <div key={work.id} className="p-3 rounded-xl border border-zinc-200 space-y-1">
                  <div className="flex justify-between font-bold text-zinc-950 text-xs">
                    <span>{work.title} — <span className="text-[#ff5500]">{work.company}</span></span>
                    <span className="font-mono text-zinc-500 text-[10px]">{work.start_date} – {work.is_current ? 'Present' : work.end_date}</span>
                  </div>
                  <p className="text-zinc-700 text-[10px]">• {work.responsibilities}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {profile.skills_categorized && profile.skills_categorized.length > 0 && (
            <div className="space-y-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0a0a0a] border-b border-zinc-200 pb-0.5">Skills Matrix</h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {profile.skills_categorized.map(skl => (
                  <span key={skl.id} className="px-2.5 py-1 rounded-full bg-[#0a0a0a] text-white font-semibold text-[10px]">
                    {skl.name} • {skl.level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
