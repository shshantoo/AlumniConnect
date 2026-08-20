import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  INITIAL_CAREER_PATHS, 
  getSavedUserGoal, 
  getSavedUserSkills, 
  getSavedRoadmapSteps, 
  saveRoadmapSteps,
  saveUserSkills
} from '../services/careerService';
import { calculateCareerReadiness } from '../utils/calculateReadiness';
import { RoadmapStep, UserSkill, ProficiencyLevel } from '../types/career';
import { 
  Map, CheckCircle2, Lock, Sparkles, Calendar, ChevronRight, 
  ArrowLeft, RefreshCcw, Layers, Trophy 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CareerRoadmap: React.FC = () => {
  const navigate = useNavigate();

  const goalId = getSavedUserGoal();
  const careerPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === goalId) || INITIAL_CAREER_PATHS[0];

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(getSavedRoadmapSteps(goalId));
  const [userSkills, setUserSkills] = useState<UserSkill[]>(getSavedUserSkills());

  // Calculate dynamic readiness score
  const readiness = calculateCareerReadiness(careerPath, userSkills);

  // Group steps by Phase
  const phases = [1, 2, 3, 4].map((phaseNum) => {
    const phaseSteps = roadmapSteps.filter((s) => s.phaseNumber === phaseNum);
    const completedCount = phaseSteps.filter((s) => s.status === 'Completed').length;
    const progressPercent = phaseSteps.length > 0 ? Math.round((completedCount / phaseSteps.length) * 100) : 0;
    
    // Phase 1 is always unlocked. Phase N requires previous phase to have at least 50% completion.
    const prevPhaseSteps = roadmapSteps.filter((s) => s.phaseNumber === phaseNum - 1);
    const prevCompleted = prevPhaseSteps.filter((s) => s.status === 'Completed').length;
    const isUnlocked = phaseNum === 1 || (prevPhaseSteps.length > 0 && prevCompleted / prevPhaseSteps.length >= 0.5);

    const titles: Record<number, string> = {
      1: 'Phase 1: Web Fundamentals',
      2: 'Phase 2: Modern Development & Frameworks',
      3: 'Phase 3: Professional Tools & APIs',
      4: 'Phase 4: Capstone Portfolio Projects',
    };

    return {
      phaseNumber: phaseNum,
      phaseTitle: titles[phaseNum],
      steps: phaseSteps,
      progressPercent,
      isUnlocked,
    };
  });

  const handleToggleStep = (stepId: string) => {
    const updatedSteps = roadmapSteps.map((step) => {
      if (step.id === stepId) {
        const nextStatus: 'Completed' | 'Pending' = step.status === 'Completed' ? 'Pending' : 'Completed';
        
        // Also update associated user skill proficiency if step linked to skill
        if (step.skillName) {
          const newLevel: ProficiencyLevel = nextStatus === 'Completed' ? 'Intermediate' : 'Beginner';
          setUserSkills((prev) => {
            const filtered = prev.filter((us) => us.skillName.toLowerCase() !== step.skillName?.toLowerCase());
            const updated: UserSkill[] = [...filtered, { skillId: `sk-${step.skillName}`, skillName: step.skillName!, proficiencyLevel: newLevel }];
            saveUserSkills(updated);
            return updated;
          });
        }

        return { ...step, status: nextStatus };
      }
      return step;
    });

    setRoadmapSteps(updatedSteps);
    saveRoadmapSteps(goalId, updatedSteps);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <button
              onClick={() => navigate('/career/analysis')}
              className="text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Readiness Analysis</span>
            </button>
            <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/30 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Map className="w-3.5 h-3.5" />
              <span>Personalized Career Roadmap</span>
            </div>
            <h1 className="text-3xl font-black">{careerPath.title} Roadmap</h1>
            <p className="text-xs text-zinc-300 max-w-xl">
              Complete each phase to unlock upcoming milestones, strengthen your technical skill gaps, and dynamically boost your readiness score.
            </p>
          </div>

          {/* Real-time Readiness Card */}
          <div className="bg-zinc-900/90 border border-zinc-700/80 p-5 rounded-2xl text-center space-y-1.5 min-w-[200px]">
            <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Live Readiness Score</span>
            <div className="text-4xl font-black text-[#ff5500]">{readiness.readinessScore}%</div>
            <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-[#ff5500] to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${readiness.readinessScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phases Accordion / List */}
      <div className="space-y-6">
        {phases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className={`bg-white border rounded-2xl transition-all overflow-hidden ${
              phase.isUnlocked ? 'border-[#e5e0d5] shadow-xs' : 'border-zinc-200 opacity-60 bg-zinc-50'
            }`}
          >
            {/* Phase Header */}
            <div className="p-6 bg-gradient-to-r from-[#f8f6f0] to-white border-b border-[#e5e0d5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    phase.isUnlocked ? 'bg-[#0a0a0a] text-white' : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {phase.isUnlocked ? phase.phaseNumber : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">{phase.phaseTitle}</h2>
                  <span className="text-xs text-zinc-500">
                    {phase.steps.length} Milestones • {phase.progressPercent}% Completed
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-48 space-y-1">
                <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${phase.progressPercent}%` }}
                  />
                </div>
                {!phase.isUnlocked && (
                  <span className="text-[10px] text-zinc-500 font-medium">Locked (Complete 50%+ of previous phase)</span>
                )}
              </div>
            </div>

            {/* Steps List */}
            {phase.isUnlocked && (
              <div className="p-6 divide-y divide-zinc-100">
                {phase.steps.map((step) => {
                  const isDone = step.status === 'Completed';

                  return (
                    <div
                      key={step.id}
                      className="py-4 first:pt-0 last:pb-0 flex items-start gap-4 hover:bg-zinc-50/50 p-2 rounded-xl transition-all"
                    >
                      <button
                        onClick={() => handleToggleStep(step.id)}
                        className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-zinc-300 hover:border-zinc-500 bg-white'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-sm font-bold ${isDone ? 'line-through text-zinc-400' : 'text-zinc-900'}`}>
                            {step.title}
                          </h3>
                          {step.skillName && (
                            <span className="text-[10px] bg-[#fce8d5] text-zinc-900 font-bold px-2 py-0.5 rounded border border-[#f8cbb0]">
                              {step.skillName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">{step.description}</p>
                      </div>

                      <div className="text-right flex flex-col items-end gap-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          {isDone ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Target Roadmap Footer */}
      <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fce8d5] text-[#ff5500] flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Roadmap Goal: Career Ready</h3>
            <p className="text-xs text-zinc-500">Achieve 80%+ readiness score to unlock priority alumni mentor recommendations.</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/mentorship/matches')}
          className="bg-[#0a0a0a] text-white hover:bg-zinc-800 text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-sm"
        >
          <span>Find Matching Mentors</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
