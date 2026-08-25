import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StudentProfileModal, StudentProfileData } from '../../components/modals/StudentProfileModal';
import { RolePreviewBar } from '../../components/dashboard/RolePreviewBar';
import { 
  Users, GraduationCap, CheckCircle2, MessageSquare, Award, 
  Star, UserCheck, ArrowRight, ChevronRight, Shield, Eye, Check, X 
} from 'lucide-react';

const MOCK_PENDING_STUDENTS: StudentProfileData[] = [
  {
    id: 'std-1',
    name: 'Shanto Rahman',
    email: 'shanto.rahman@iub.edu.bd',
    photo: '/images/student-profile.png',
    department: 'B.Sc. in Computer Science & Engineering',
    graduation_year: '2026',
    cgpa: '3.88',
    target_career: 'Frontend Developer',
    readiness_score: 68,
    request_topic: 'FAANG Technical Code Review & Placement Strategy',
    request_message: "Hello Ahmed! I'm preparing for frontend developer placement and would love code review on my React 19 & TypeScript projects.",
    application_date: '2026-08-24',
    cv_summary: 'Dedicated CSE Senior specializing in React 19, TypeScript, Supabase, and MapLibre GL spatial architectures. Built production university alumni ecosystem delivering 99.9% uptime.',
    skills: [
      { name: 'HTML5 & CSS3', level: 'Expert', rating: 5 },
      { name: 'JavaScript (ES6+)', level: 'Advanced', rating: 4 },
      { name: 'React 19 & Vite', level: 'Advanced', rating: 4 },
      { name: 'TypeScript', level: 'Intermediate', rating: 3 },
      { name: 'Supabase & PostgreSQL', level: 'Intermediate', rating: 3 },
      { name: 'Git & GitHub Flow', level: 'Advanced', rating: 4 },
    ],
    projects: [
      { title: 'AlumniConnect Intelligent Platform', description: 'Built complete alumni networking platform with career readiness engine, OpenFreeMap integration, and Gemini AI review.', tech: 'React 19 • TypeScript • Supabase' },
      { title: 'Cloud Microservices API', description: 'Architected Node.js backend handling 500+ daily requests with PostgreSQL relational database.', tech: 'Node.js • PostgreSQL • Docker' }
    ]
  },
  {
    id: 'std-2',
    name: 'Mirza Mahbub',
    email: 'mirza.mahbub@iub.edu.bd',
    department: 'B.Sc. in Computer Science & Engineering',
    graduation_year: '2026',
    cgpa: '3.75',
    target_career: 'Frontend Developer',
    readiness_score: 74,
    request_topic: 'Senior System Design & Code Review Guidance',
    request_message: 'Hi Ahmed! Looking for guidance on state management caching and frontend architecture best practices.',
    application_date: '2026-08-25',
    cv_summary: 'CSE undergraduate passionate about building responsive client applications, TailwindCSS design systems, and WebSockets.',
    skills: [
      { name: 'React 19', level: 'Advanced', rating: 4 },
      { name: 'TailwindCSS', level: 'Expert', rating: 5 },
      { name: 'JavaScript', level: 'Advanced', rating: 4 },
      { name: 'REST APIs', level: 'Intermediate', rating: 3 }
    ],
    projects: [
      { title: 'E-Commerce Interactive Web App', description: 'Built client storefront with shopping cart state and payment gateway mock API.', tech: 'React • TailwindCSS' }
    ]
  }
];

export const AlumniDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [pendingStudents, setPendingStudents] = useState<StudentProfileData[]>(MOCK_PENDING_STUDENTS);
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentProfileData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAcceptRequest = (studentId: string) => {
    const std = pendingStudents.find(s => s.id === studentId);
    setPendingStudents(prev => prev.filter(s => s.id !== studentId));
    setToastMessage(`Mentorship request accepted for ${std?.name || 'Student'}! Mentorship channel activated.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDeclineRequest = (studentId: string) => {
    const std = pendingStudents.find(s => s.id === studentId);
    setPendingStudents(prev => prev.filter(s => s.id !== studentId));
    setToastMessage(`Mentorship request from ${std?.name || 'Student'} declined.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-fadeIn">
      <RolePreviewBar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-zinc-900 text-white font-extrabold text-xs shadow-xl flex items-center justify-between animate-fadeIn border border-[#ff5500]">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#ff5500]" /> {toastMessage}
          </span>
          <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Verified Alumni Mentor Portal
            </span>
            <h1 className="text-3xl font-black">Welcome Back, {profile?.first_name || 'Ahmed'} 👋</h1>
            <p className="text-xs text-zinc-300 max-w-md">
              Guide the next generation of CSE students with your technical expertise and industry experience.
            </p>
          </div>

          {/* Mentorship Status Card */}
          <div className="bg-zinc-900/90 border border-zinc-700/80 p-5 rounded-2xl text-center space-y-2 min-w-[220px]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Mentorship Status</span>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-lg font-bold text-white">Available</span>
            </div>
            <span className="text-xs text-zinc-300 font-bold block">
              Active Mentees: <strong className="text-[#ff5500]">2 / 3</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Total Mentorship Impact</span>
          <div className="text-4xl font-black text-zinc-900">12</div>
          <p className="text-xs text-zinc-500 font-medium">Completed 1-on-1 Sessions</p>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Average Student Rating</span>
          <div className="text-4xl font-black text-amber-600 flex items-center gap-2">
            <span>4.9</span>
            <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          <p className="text-xs text-zinc-500 font-medium">Based on 14 reviews</p>
        </div>

        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Students Helped</span>
          <div className="text-4xl font-black text-[#ff5500]">7</div>
          <p className="text-xs text-zinc-500 font-medium">Landed Placement Roles</p>
        </div>
      </div>

      {/* Pending Student Requests with Profile Access */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5500]">Mentorship Applications</span>
            <h3 className="text-lg font-bold text-zinc-900">Pending Student Applications ({pendingStudents.length})</h3>
          </div>
          <span className="text-xs bg-[#fce8d5] text-zinc-900 font-bold px-2.5 py-1 rounded-full">
            Inspect Capabilities & Action
          </span>
        </div>

        {pendingStudents.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs">
            No pending student applications currently. All requests have been reviewed!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingStudents.map((student) => (
              <div 
                key={student.id} 
                className="p-5 bg-[#f8f6f0] border border-[#e5e0d5] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#ff5500] transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white font-black flex items-center justify-center text-lg flex-shrink-0 shadow-xs">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="w-full h-full rounded-2xl object-cover" />
                    ) : (
                      student.name.charAt(0)
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-zinc-900">{student.name}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                        {student.department}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 font-semibold">
                      Target Goal: <strong className="text-zinc-900">{student.target_career}</strong> • <span className="text-[#ff5500] font-black">{student.readiness_score}% Readiness</span>
                    </p>

                    <p className="text-xs text-zinc-600 italic font-medium line-clamp-2">
                      "{student.request_message}"
                    </p>
                  </div>
                </div>

                {/* Actions: View Profile, Accept, Decline */}
                <div className="flex items-center gap-2 flex-wrap self-end md:self-auto flex-shrink-0">
                  <button
                    onClick={() => setSelectedStudentModal(student)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-900 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ff5500]" /> View Student Profile
                  </button>

                  <button
                    onClick={() => handleAcceptRequest(student.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition shadow-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5 text-white" /> Accept
                  </button>

                  <button
                    onClick={() => handleDeclineRequest(student.id)}
                    className="px-3 py-2 rounded-xl border border-zinc-300 text-zinc-700 text-xs font-bold hover:bg-zinc-100 transition"
                  >
                    Decline
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECOMMENDED STUDENTS FOR ALUMNI WITH PROFILE VIEW */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">SMART REVERSE MATCHING</span>
            <h3 className="text-base font-bold text-zinc-900">Recommended Student Candidates for You</h3>
          </div>
          <span className="text-xs text-zinc-500 font-medium">Matched to your Frontend & React expertise</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_PENDING_STUDENTS.map((std) => (
            <div key={std.id} className="p-4 border border-[#e5e0d5] bg-[#f8f6f0] rounded-2xl space-y-3 hover:border-[#ff5500] transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-extrabold text-zinc-900">{std.name}</h4>
                  <p className="text-xs text-zinc-500">Target: {std.target_career}</p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded">
                  {std.readiness_score}% Readiness
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <button 
                  onClick={() => setSelectedStudentModal(std)}
                  className="text-xs text-[#ff5500] font-extrabold hover:underline flex items-center gap-1"
                >
                  Inspect Full Student Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Profile & Capability Modal */}
      <StudentProfileModal
        student={selectedStudentModal}
        isOpen={Boolean(selectedStudentModal)}
        onClose={() => setSelectedStudentModal(null)}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
      />

    </div>
  );
};
