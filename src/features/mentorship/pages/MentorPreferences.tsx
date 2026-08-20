import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentMentorPreference } from '../../career/types/career';
import { GraduationCap, ArrowRight, Check, Sliders, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const PREF_STORAGE_KEY = 'alumni_connect_student_mentor_prefs';

export const getSavedMentorPreferences = (): StudentMentorPreference => {
  const saved = localStorage.getItem(PREF_STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : {
        helpTopics: ['Career Guidance', 'Technical Skills', 'Industry Knowledge'],
        preferredIndustry: 'Technology',
        preferredCareer: 'Frontend Development',
        preferredLocation: 'Any Location',
        preferredMeetingType: 'Online',
      };
};

export const MentorPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState<StudentMentorPreference>(getSavedMentorPreferences());

  const availableTopics = [
    'Career Guidance',
    'Technical Skills',
    'Higher Education',
    'Interview Preparation',
    'Industry Knowledge',
    'Resume Review',
  ];

  const availableIndustries = ['Technology', 'Software & SaaS', 'Data & AI', 'Finance & FinTech', 'E-Commerce'];

  const toggleTopic = (topic: string) => {
    setPrefs((prev) => {
      const exists = prev.helpTopics.includes(topic);
      const updated = exists
        ? prev.helpTopics.filter((t) => t !== topic)
        : [...prev.helpTopics, topic];
      return { ...prev, helpTopics: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(PREF_STORAGE_KEY, JSON.stringify(prefs));
    navigate('/mentorship/matches');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/30 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Smart Match Configuration</span>
          </div>
          <h1 className="text-3xl font-black">Set Your Mentor Preferences</h1>
          <p className="text-xs text-zinc-300 max-w-xl">
            Configure your mentorship needs so our algorithm can pair you with alumni mentors whose experience and availability best match your goals.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-[#e5e0d5] rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
        {/* Help Topics */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#ff5500]" />
            <span>What do you need help with?</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableTopics.map((topic) => {
              const isSelected = prefs.helpTopics.includes(topic);
              return (
                <button
                  type="button"
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#fffaf7] border-[#ff5500] text-[#ff5500] shadow-2xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>{topic}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#ff5500]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Industry & Career */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Preferred Industry</span>
            </label>
            <select
              value={prefs.preferredIndustry}
              onChange={(e) => setPrefs({ ...prefs, preferredIndustry: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#ff5500]"
            >
              {availableIndustries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>Preferred Meeting Type</span>
            </label>
            <select
              value={prefs.preferredMeetingType}
              onChange={(e) => setPrefs({ ...prefs, preferredMeetingType: e.target.value as any })}
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#ff5500]"
            >
              <option value="Online">Online (Zoom/Google Meet)</option>
              <option value="In-Person">In-Person (Campus/Office)</option>
              <option value="Any">Any Format</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-zinc-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#ff5500] hover:bg-[#e04b00] text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-md shadow-[#ff5500]/20"
          >
            <span>Find My Top Alumni Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
