import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  getSavedUserGoal, 
  getSavedUserSkills, 
  INITIAL_CAREER_PATHS,
  getSavedRoadmapSteps
} from '../career/services/careerService';
import { calculateCareerReadiness } from '../career/utils/calculateReadiness';
import { MOCK_ALUMNI_MENTORS } from '../mentorship/pages/MentorMatches';
import { calculateMentorMatch } from '../mentorship/utils/calculateMatch';
import { getSavedMentorPreferences } from '../mentorship/pages/MentorPreferences';
import { 
  Target, Sparkles, Map, GraduationCap, ArrowRight, CheckCircle2, 
  Briefcase, Award, ChevronRight, Zap, RefreshCw 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const goalId = getSavedUserGoal();
  const careerPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === goalId) || INITIAL_CAREER_PATHS[0];
  const userSkills = getSavedUserSkills();
  const readiness = calculateCareerReadiness(careerPath, userSkills);

  // Top Mentor Match
  const prefs = getSavedMentorPreferences();
  const userSkillsList = userSkills.map((us) => us.skillName);
  const matches = MOCK_ALUMNI_MENTORS.map((m) =>
    calculateMentorMatch(m, careerPath.title, userSkillsList, prefs)
  ).sort((a, b) => b.matchScore - a.matchScore);
  const topMatch = matches[0];

  // Roadmap Progress
  const roadmapSteps = getSavedRoadmapSteps(goalId);
  const completedSteps = roadmapSteps.filter((s) => s.status === 'Completed').length;
  const roadmapProgress = Math.round((completedSteps / roadmapSteps.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Welcome & Goal Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#ff5500]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              Student Career Dashboard
            </span>
            <h1 className="text-3xl font-black">Hello, {profile?.first_name || 'Shanto'} 👋</h1>
            <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
              Target Specialization: <strong className="text-white bg-[#ff5500]/20 border border-[#ff5500]/30 px-2 py-0.5 rounded text-xs">{readiness.careerTitle}</strong>
            </p>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-700/80 p-5 rounded-2xl text-center space-y-2 min-w-[200px]">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Career Readiness</span>
            <div className="text-4xl font-black text-[#ff5500]">{readiness.readinessScore}%</div>
            <Link
              to="/career/analysis"
              className="inline-flex items-center gap-1 text-[11px] text-[#ff5500] font-bold hover:underline"
            >
              <span>View Analysis</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Core Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YOUR NEXT STEP CARD */}
        <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff5500] bg-[#fce8d5] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>YOUR NEXT STEP</span>
            </span>
            <span className="text-xs text-zinc-400 font-medium">Highest Priority</span>
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="text-xl font-bold text-zinc-900">
              Master {readiness.nextPrioritySkill || 'React'}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <strong>{readiness.nextPrioritySkill || 'React'}</strong> is currently your highest-weight missing skill gap for {readiness.careerTitle}.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('/career/roadmap')}
              className="w-full bg-[#0a0a0a] hover:bg-zinc-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>Start Skill Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TOP MENTOR MATCH CARD */}
        {topMatch && (
          <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-emerald-700" />
                <span>TOP MENTOR MATCH</span>
              </span>
              <span className="text-xs font-black text-[#ff5500]">{topMatch.matchScore}% Match</span>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <img
                src={topMatch.mentor.photoUrl}
                alt={topMatch.mentor.alumniName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-zinc-100 shadow-xs shrink-0"
              />
              <div>
                <h3 className="text-base font-bold text-zinc-900">{topMatch.mentor.alumniName}</h3>
                <p className="text-xs text-zinc-600 font-medium">{topMatch.mentor.headline} • {topMatch.mentor.company}</p>
                <p className="text-[11px] text-emerald-700 font-bold mt-0.5">✓ Same career path • {topMatch.mentor.skills.slice(0, 2).join(', ')}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/mentorship/matches')}
                className="w-full bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#ff5500]/20"
              >
                <span>View Mentor Details & Request</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ROADMAP PROGRESS CARD */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">CAREER ROADMAP</span>
            <h3 className="text-lg font-bold text-zinc-900">{readiness.careerTitle} Path</h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-zinc-700">{completedSteps} / {roadmapSteps.length} Milestones ({roadmapProgress}%)</span>
            <Link
              to="/career/roadmap"
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold px-4 py-2 rounded-xl text-xs transition-all"
            >
              Continue Roadmap
            </Link>
          </div>
        </div>

        <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff5500] to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${roadmapProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {roadmapSteps.slice(0, 3).map((step) => (
            <div key={step.id} className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">{step.title}</span>
                {step.status === 'Completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Pending</span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED OPPORTUNITIES */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#ff5500]" />
            <span>Recommended Opportunities for {readiness.careerTitle}</span>
          </h3>
          <Link to="/jobs" className="text-xs text-[#ff5500] font-bold hover:underline">
            View All Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-zinc-200 rounded-2xl space-y-2 hover:border-[#ff5500] transition-all">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Full-Time</span>
            <h4 className="text-sm font-bold text-zinc-900">Junior Frontend Developer</h4>
            <p className="text-xs text-zinc-500">Brain Station 23 • Dhaka / Remote</p>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-zinc-600 font-bold">BDT 45k - 60k/mo</span>
              <Link to="/jobs" className="text-[#ff5500] font-bold hover:underline">Apply Now →</Link>
            </div>
          </div>

          <div className="p-4 border border-zinc-200 rounded-2xl space-y-2 hover:border-[#ff5500] transition-all">
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Internship</span>
            <h4 className="text-sm font-bold text-zinc-900">React Software Engineering Intern</h4>
            <p className="text-xs text-zinc-500">ShopUp • Dhaka</p>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-zinc-600 font-bold">BDT 20k/mo</span>
              <Link to="/jobs" className="text-[#ff5500] font-bold hover:underline">Apply Now →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
