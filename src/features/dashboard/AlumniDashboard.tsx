import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, GraduationCap, CheckCircle2, MessageSquare, Award, 
  Star, UserCheck, ArrowRight, ChevronRight, Shield 
} from 'lucide-react';

export const AlumniDashboard: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
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

      {/* Grid: Impact Metrics & Student Requests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Impact Cards */}
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

      {/* Pending Student Requests */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5500]">Mentorship Requests</span>
            <h3 className="text-lg font-bold text-zinc-900">Pending Student Applications (2)</h3>
          </div>
          <span className="text-xs bg-[#fce8d5] text-zinc-900 font-bold px-2.5 py-1 rounded-full">
            Action Required
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-black flex items-center justify-center text-sm">
                S
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900">Shanto (CSE Senior)</h4>
                <p className="text-xs text-zinc-500">Target Goal: <strong>Frontend Developer</strong> • 48% Readiness</p>
                <p className="text-xs text-zinc-600 italic mt-1 font-medium">
                  "Hello Ahmed! I'm preparing for frontend developer placement and would love code review on my React projects."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs">
                Accept Request
              </button>
              <button className="px-3 py-2 rounded-xl border border-zinc-300 text-zinc-700 text-xs font-bold hover:bg-zinc-100">
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMMENDED STUDENTS FOR ALUMNI */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">SMART REVERSE MATCHING</span>
            <h3 className="text-base font-bold text-zinc-900">Recommended Students for You</h3>
          </div>
          <span className="text-xs text-zinc-500">Matched to your expertise in Frontend & React</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-zinc-200 rounded-2xl space-y-2 hover:border-[#ff5500] transition-all">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-bold text-zinc-900">Mirza Mahbub</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">94% Goal Match</span>
            </div>
            <p className="text-xs text-zinc-500">Target: Frontend Developer • Missing: TypeScript</p>
            <button className="text-xs text-[#ff5500] font-bold hover:underline pt-1 block">
              Offer Mentorship Invitation →
            </button>
          </div>

          <div className="p-4 border border-zinc-200 rounded-2xl space-y-2 hover:border-[#ff5500] transition-all">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-bold text-zinc-900">Fariha Chowdhury</h4>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">89% Goal Match</span>
            </div>
            <p className="text-xs text-zinc-500">Target: Full Stack Developer • Missing: REST APIs</p>
            <button className="text-xs text-[#ff5500] font-bold hover:underline pt-1 block">
              Offer Mentorship Invitation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
