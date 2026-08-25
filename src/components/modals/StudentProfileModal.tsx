import React from 'react';
import { 
  CheckCircle2, XCircle, GraduationCap, Award, Brain, 
  Target, Sparkles, BookOpen, FileText, User, Mail, Star, ShieldCheck 
} from 'lucide-react';

export interface StudentProfileData {
  id: string;
  name: string;
  email: string;
  photo?: string;
  department: string;
  graduation_year: string;
  cgpa: string;
  target_career: string;
  readiness_score: number;
  skills: { name: string; level: string; rating: number }[];
  projects: { title: string; description: string; tech: string }[];
  cv_summary: string;
  request_topic?: string;
  request_message?: string;
  application_date?: string;
}

interface StudentProfileModalProps {
  student: StudentProfileData | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
  requestStatus?: 'pending' | 'accepted' | 'declined';
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  isOpen,
  onClose,
  onAccept,
  onDecline,
  requestStatus = 'pending'
}) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleUp my-8 text-zinc-900">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6 sm:p-8 space-y-4">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#ff5500] text-white font-black flex items-center justify-center text-2xl ring-4 ring-white/10 flex-shrink-0 shadow-lg overflow-hidden">
              <img src={student.photo || '/images/student-profile.png'} alt={student.name} className="w-full h-full rounded-2xl object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase">
                  Verified Student Candidate
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium">
                {student.department} • Class of {student.graduation_year} • <span className="text-amber-300 font-bold">CGPA {student.cgpa}</span>
              </p>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#ff5500]" /> {student.email}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Target Career & Readiness Capability Gauge */}
          <div className="p-5 rounded-2xl bg-[#f8f6f0] border border-[#e5e0d5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#ff5500] uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Student Target Career Goal
              </span>
              <h3 className="text-lg font-black text-zinc-900">{student.target_career}</h3>
              <p className="text-xs text-zinc-600 font-medium">
                Readiness score calculated by Career Intelligence Engine based on skill proficiency.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-[#e5e0d5] flex-shrink-0 shadow-2xs">
              <div className="text-center">
                <span className="text-2xl font-black text-[#ff5500]">{student.readiness_score}%</span>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase">Readiness</span>
              </div>
              <div className="border-r border-zinc-200 h-8" />
              <div className="text-xs">
                <span className="font-extrabold text-emerald-700 block">
                  {student.readiness_score >= 70 ? 'High Capability' : student.readiness_score >= 40 ? 'Moderate Ready' : 'Emerging Trainee'}
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">Mentorship Fit</span>
              </div>
            </div>
          </div>

          {/* Student Mentorship Request Note */}
          {student.request_message && (
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 space-y-2">
              <span className="text-[10px] font-extrabold text-orange-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" /> Student Application Message & Topic
              </span>
              <p className="text-xs font-bold text-orange-950">Topic: {student.request_topic || 'Career & Technical Guidance'}</p>
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                "{student.request_message}"
              </p>
            </div>
          )}

          {/* Technical Skill Proficiencies */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#ff5500]" /> Technical Skill Matrix & Levels
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {student.skills.map((sk) => (
                <div key={sk.name} className="p-3 rounded-xl bg-white border border-[#e5e0d5] flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900">{sk.name}</span>
                  <span className={`px-2.5 py-0.5 rounded font-extrabold text-[10px] ${
                    sk.level === 'Expert' ? 'bg-emerald-100 text-emerald-800' :
                    sk.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    sk.level === 'Intermediate' ? 'bg-amber-100 text-amber-800' :
                    'bg-zinc-100 text-zinc-700'
                  }`}>
                    {sk.level} (Lvl {sk.rating}/5)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#ff5500]" /> Portfolio Projects & Code Implementations
            </h4>
            <div className="space-y-2">
              {student.projects.map((proj) => (
                <div key={proj.title} className="p-3.5 rounded-xl bg-[#f8f6f0] border border-[#e5e0d5] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-zinc-900">{proj.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                      {proj.tech}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CV Summary */}
          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#ff5500]" /> Resume Professional Summary
            </h4>
            <p className="text-xs text-zinc-700 leading-relaxed font-medium bg-[#f8f6f0] p-3.5 rounded-xl border border-[#e5e0d5]">
              {student.cv_summary}
            </p>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-5 bg-zinc-50 border-t border-[#e5e0d5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-zinc-500 font-semibold">
            Evaluate capability before accepting mentorship application
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onDecline && (
              <button
                onClick={() => {
                  onDecline(student.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition"
              >
                Decline Application
              </button>
            )}

            {onAccept && (
              <button
                onClick={() => {
                  onAccept(student.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-white" /> Accept Mentorship Request
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
