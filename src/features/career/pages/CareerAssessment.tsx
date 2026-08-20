import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  INITIAL_CAREER_PATHS, 
  getSavedUserGoal, 
  getSavedUserSkills, 
  saveUserGoal, 
  saveUserSkills 
} from '../services/careerService';
import { ProficiencyLevel, UserSkill } from '../types/career';
import { Target, Sparkles, CheckCircle2, ArrowRight, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const CareerAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoalId, setSelectedGoalId] = useState<string>(getSavedUserGoal());
  const [userSkills, setUserSkills] = useState<UserSkill[]>(getSavedUserSkills());
  const [step, setStep] = useState<'goal' | 'skills'>('goal');

  const selectedPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === selectedGoalId) || INITIAL_CAREER_PATHS[0];

  const proficiencyLevels: ProficiencyLevel[] = [
    'Not Learned',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
  ];

  const getSkillProficiency = (skillName: string): ProficiencyLevel => {
    const existing = userSkills.find((us) => us.skillName.toLowerCase() === skillName.toLowerCase());
    return existing ? existing.proficiencyLevel : 'Not Learned';
  };

  const handleProficiencyChange = (skillName: string, level: ProficiencyLevel) => {
    setUserSkills((prev) => {
      const filtered = prev.filter((us) => us.skillName.toLowerCase() !== skillName.toLowerCase());
      return [...filtered, { skillId: `sk-${skillName}`, skillName, proficiencyLevel: level }];
    });
  };

  const handleCompleteAssessment = () => {
    saveUserGoal(selectedGoalId);
    saveUserSkills(userSkills);
    navigate('/career/analysis');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#ff5500]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/30 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Career Intelligence Engine</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Career Assessment & Skill Gap Detection</h1>
          <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
            Select your target career goal and evaluate your current technical proficiency to generate your personalized career readiness score and roadmap.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-800 text-xs font-medium">
          <button
            onClick={() => setStep('goal')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              step === 'goal' ? 'bg-[#ff5500] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>1. Select Goal</span>
          </button>
          <span className="text-zinc-600">/</span>
          <button
            onClick={() => setStep('skills')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              step === 'skills' ? 'bg-[#ff5500] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>2. Rate Skills</span>
          </button>
        </div>
      </div>

      {/* STEP 1: Select Career Goal */}
      {step === 'goal' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold text-zinc-900">What career path do you want to pursue?</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Select one target specialization to compare your skill set against industry requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_CAREER_PATHS.map((path) => {
              const isSelected = selectedGoalId === path.id;
              return (
                <div
                  key={path.id}
                  onClick={() => setSelectedGoalId(path.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#ff5500] bg-[#fffaf7] shadow-md'
                      : 'border-[#e5e0d5] bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5500] bg-[#fce8d5] px-2 py-0.5 rounded">
                        {path.category}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 mt-2">{path.title}</h3>
                    </div>
                    {isSelected && <CheckCircle2 className="w-6 h-6 text-[#ff5500]" />}
                  </div>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{path.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {path.skills.map((s) => (
                      <span
                        key={s.skillId}
                        className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded border border-zinc-200"
                      >
                        {s.skillName}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep('skills')}
              className="bg-[#0a0a0a] text-white hover:bg-zinc-800 font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <span>Next: Evaluate My Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: Rate Skills */}
      {step === 'skills' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-500 font-medium">Selected Goal:</span>
              <h2 className="text-xl font-bold text-zinc-900">{selectedPath.title}</h2>
            </div>
            <button
              onClick={() => setStep('goal')}
              className="text-xs text-[#ff5500] font-bold hover:underline"
            >
              Change Goal
            </button>
          </div>

          <div className="bg-white border border-[#e5e0d5] rounded-2xl p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ff5500]" />
                <span>Rate Your Current Skill Proficiencies</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Be honest with your self-assessment. The system will use your exact input to calculate your readiness score and missing skill gaps.
              </p>
            </div>

            <div className="space-y-6 divide-y divide-zinc-100">
              {selectedPath.skills.map((cSkill) => {
                const currentLevel = getSkillProficiency(cSkill.skillName);

                return (
                  <div key={cSkill.skillId} className="pt-4 first:pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900">{cSkill.skillName}</h4>
                        <span className="text-[11px] text-zinc-500">
                          Importance Weight: <strong className="text-zinc-800">{cSkill.importanceWeight}/10</strong> • Target: {cSkill.requiredLevel}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#ff5500] bg-[#fce8d5] px-2.5 py-1 rounded-lg">
                        {currentLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {proficiencyLevels.map((lvl) => {
                        const isSelected = currentLevel === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleProficiencyChange(cSkill.skillName, lvl)}
                            className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                              isSelected
                                ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-xs'
                                : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setStep('goal')}
              className="text-xs font-bold text-zinc-600 hover:text-zinc-900"
            >
              Back to Career Goal
            </button>

            <button
              onClick={handleCompleteAssessment}
              className="bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#ff5500]/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze My Career Readiness</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
