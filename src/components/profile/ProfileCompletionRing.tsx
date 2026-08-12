import React from 'react';
import { UserProfile, computeProfileCompletion } from '../../types/database.types';
import { Sparkles, ArrowRight, CheckCircle2, PlusCircle } from 'lucide-react';

interface ProfileCompletionRingProps {
  profile: Partial<UserProfile> | null;
  onOpenCvBuilder: () => void;
}

export const ProfileCompletionRing: React.FC<ProfileCompletionRingProps> = ({ profile, onOpenCvBuilder }) => {
  const { percentage, completedSections, missingSections } = computeProfileCompletion(profile);

  // SVG ring calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="taste-card p-5 sm:p-6 bg-white border border-[#e5e0d5] rounded-3xl shadow-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: SVG Circular Meter */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
              {/* Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-[#fce8d5]"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Progress Indicator */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-[#ff5500] transition-all duration-1000 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-[#0a0a0a] tracking-tight">{percentage}%</span>
              <span className="text-[9px] uppercase font-bold text-zinc-500">Filled</span>
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] text-[11px] font-semibold">
              <Sparkles className="w-3 h-3 text-[#ff5500]" /> CV & Alumni Readiness Score
            </div>
            <h3 className="text-lg font-extrabold text-[#0a0a0a]">
              Your Profile is {percentage}% Complete
            </h3>
            <p className="text-xs text-zinc-600 font-medium">
              {percentage >= 80
                ? 'Great job! Your profile is verified & ready for alumni networking and CV export.'
                : 'Complete missing sections to unlock direct job referrals and AI CV generation.'}
            </p>
          </div>
        </div>

        {/* Right: Quick Action & Missing Badges */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          
          {missingSections.length > 0 && (
            <div className="hidden lg:flex flex-col gap-1 text-xs">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Next Suggested Steps:</span>
              <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                {missingSections.slice(0, 2).map((item) => (
                  <span
                    key={item.key}
                    onClick={onOpenCvBuilder}
                    className="cursor-pointer px-2.5 py-1 rounded-lg bg-[#f8f6f0] border border-[#e5e0d5] hover:border-[#ff5500] text-zinc-800 text-[11px] font-semibold flex items-center gap-1 transition"
                  >
                    <PlusCircle className="w-3 h-3 text-[#ff5500]" /> +{item.weight}% {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onOpenCvBuilder}
            className="btn-black px-5 py-3 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
          >
            {percentage < 100 ? 'Complete Profile & Build CV' : 'Edit Profile & Export CV'}
            <ArrowRight className="w-4 h-4 text-[#ff5500]" />
          </button>

        </div>

      </div>
    </div>
  );
};
