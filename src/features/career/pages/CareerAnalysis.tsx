import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { INITIAL_CAREER_PATHS, getSavedUserGoal, getSavedUserSkills } from '../services/careerService';
import { calculateCareerReadiness } from '../utils/calculateReadiness';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, 
  MapPin, GraduationCap, Users, ShieldAlert, Award, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AICareerCoachModal } from '../../ai/components/AICareerCoachModal';

export const CareerAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [showAIModal, setShowAIModal] = useState(false);

  const goalId = getSavedUserGoal();
  const userSkills = getSavedUserSkills();
  const careerPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === goalId) || INITIAL_CAREER_PATHS[0];

  const readiness = calculateCareerReadiness(careerPath, userSkills);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#e5e0d5] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#ff5500] bg-[#fce8d5] px-3 py-1 rounded-full">
              Assessment Results
            </span>
            <h1 className="text-3xl font-black text-zinc-900 mt-2">{readiness.careerTitle}</h1>
            <p className="text-xs text-zinc-500 mt-1">
              Based on your evaluation of {careerPath.skills.length} core weighted skills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/career/assessment')}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-100 flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>

            <button
              onClick={() => setShowAIModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#ff5500] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Career Coach</span>
            </button>
          </div>
        </div>

        {/* Readiness Score Card */}
        <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Calculated Career Readiness</span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl font-black tracking-tight text-[#ff5500]">{readiness.readinessScore}%</span>
              <span className="text-xs text-zinc-400 font-medium">overall match</span>
            </div>
            <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
              {readiness.readinessScore >= 75
                ? 'Excellent! You possess strong foundational skills and are nearly ready for professional placement.'
                : readiness.readinessScore >= 45
                ? 'Good progress! You have baseline skills but need targeted improvement in key high-weight skills.'
                : 'Starting out. Focus on foundational concepts in Phase 1 & 2 of your roadmap to build momentum.'}
            </p>
          </div>

          {/* Progress Visual Bar */}
          <div className="w-full md:w-64 bg-zinc-800/80 p-4 rounded-xl border border-zinc-700 space-y-2 z-10">
            <div className="flex justify-between text-xs text-zinc-300 font-bold">
              <span>Readiness Target</span>
              <span>{readiness.readinessScore} / 100</span>
            </div>
            <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-700">
              <div
                className="h-full bg-gradient-to-r from-[#ff5500] to-amber-400 rounded-full transition-all duration-1000"
                style={{ width: `${readiness.readinessScore}%` }}
              />
            </div>
            {readiness.nextPrioritySkill && (
              <p className="text-[11px] text-amber-400 font-medium pt-1">
                ⚡ Highest Priority Skill: <strong>{readiness.nextPrioritySkill}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Skill Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strong Areas */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-zinc-900">Strong Areas ({readiness.strongSkills.length})</h3>
          </div>

          {readiness.strongSkills.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">No advanced skills rated yet.</p>
          ) : (
            <div className="space-y-2">
              {readiness.strongSkills.map((s) => (
                <div key={s.skillName} className="flex items-center justify-between p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs">
                  <span className="font-bold text-emerald-950">✓ {s.skillName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {s.proficiency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Developing */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-zinc-900">Developing ({readiness.developingSkills.length})</h3>
          </div>

          {readiness.developingSkills.length === 0 ? (
            <p className="text-xs text-zinc-400 italic">No intermediate skills rated.</p>
          ) : (
            <div className="space-y-2">
              {readiness.developingSkills.map((s) => (
                <div key={s.skillName} className="flex items-center justify-between p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl text-xs">
                  <span className="font-bold text-amber-950">◐ {s.skillName}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                    {s.proficiency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skill Gaps */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-zinc-900">Skill Gaps ({readiness.skillGaps.length})</h3>
          </div>

          {readiness.skillGaps.length === 0 ? (
            <p className="text-xs text-emerald-600 font-bold">Awesome! You have no critical skill gaps!</p>
          ) : (
            <div className="space-y-2">
              {readiness.skillGaps.map((s) => (
                <div key={s.skillName} className="flex items-center justify-between p-2.5 bg-rose-50/50 border border-rose-100 rounded-xl text-xs">
                  <span className="font-bold text-rose-950">✗ {s.skillName}</span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                    Weight: {s.importanceWeight}/10
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Next Actions Bar */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-zinc-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Ready to take action on your career gaps?</h3>
          <p className="text-xs text-zinc-400">
            Generate your step-by-step roadmap or connect with top alumni mentors for guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/career/roadmap"
            className="bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <span>View Personalized Roadmap</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            to="/mentorship/matches"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 border border-white/10 transition-all"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Find Mentor Matches</span>
          </Link>
        </div>
      </div>

      {/* AI Career Coach Modal */}
      <AICareerCoachModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        readiness={readiness}
      />
    </div>
  );
};
