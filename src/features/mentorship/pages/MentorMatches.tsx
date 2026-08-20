import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlumniMentorProfile, MentorMatchResult } from '../../career/types/career';
import { calculateMentorMatch } from '../utils/calculateMatch';
import { getSavedMentorPreferences } from './MentorPreferences';
import { getSavedUserGoal, getSavedUserSkills, INITIAL_CAREER_PATHS } from '../../career/services/careerService';
import { 
  GraduationCap, Sparkles, CheckCircle2, Sliders, MessageSquare, 
  MapPin, Building2, Star, ArrowRight, UserCheck, Check 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Alumni Mentors Seed Pool
export const MOCK_ALUMNI_MENTORS: AlumniMentorProfile[] = [
  {
    alumniId: 'alm-1',
    alumniName: 'Ahmed Hasan',
    headline: 'Senior Frontend Engineer',
    company: 'Google',
    role: 'Frontend Developer',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    isMentorEnabled: true,
    mentorshipTopics: ['Career Guidance', 'Technical Skills', 'Frontend Development'],
    skills: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'REST APIs'],
    industry: 'Technology',
    yearsOfExperience: 5,
    maxActiveMentees: 3,
    currentMenteesCount: 2,
    availability: ['Saturday', 'Sunday'],
    preferredMeeting: 'Online',
    location: 'Dhaka / Remote',
    rating: 4.9,
  },
  {
    alumniId: 'alm-2',
    alumniName: 'Nusrat Jahan',
    headline: 'Lead Software Architect',
    company: 'Microsoft',
    role: 'Full Stack Developer',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    isMentorEnabled: true,
    mentorshipTopics: ['System Architecture', 'Interview Prep', 'Career Guidance'],
    skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'TypeScript', 'Git'],
    industry: 'Technology',
    yearsOfExperience: 7,
    maxActiveMentees: 4,
    currentMenteesCount: 1,
    availability: ['Friday', 'Saturday'],
    preferredMeeting: 'Online',
    location: 'Dhaka',
    rating: 4.95,
  },
  {
    alumniId: 'alm-3',
    alumniName: 'Tanvir Rahman',
    headline: 'Backend Tech Lead',
    company: 'Databricks',
    role: 'Backend Developer',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    isMentorEnabled: true,
    mentorshipTopics: ['Python', 'Database Optimization', 'High Scalability'],
    skills: ['Python', 'SQL', 'REST APIs', 'Git', 'Node.js'],
    industry: 'Technology',
    yearsOfExperience: 6,
    maxActiveMentees: 2,
    currentMenteesCount: 1,
    availability: ['Sunday'],
    preferredMeeting: 'Online',
    location: 'Remote',
    rating: 4.85,
  },
];

export const MentorMatches: React.FC = () => {
  const navigate = useNavigate();

  const goalId = getSavedUserGoal();
  const careerPath = INITIAL_CAREER_PATHS.find((cp) => cp.id === goalId) || INITIAL_CAREER_PATHS[0];
  const userSkills = getSavedUserSkills().map((us) => us.skillName);
  const prefs = getSavedMentorPreferences();

  // Selected mentor for request modal
  const [selectedMentor, setSelectedMentor] = useState<AlumniMentorProfile | null>(null);
  const [requestNote, setRequestNote] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  // Calculate and sort match results
  const matchResults: MentorMatchResult[] = MOCK_ALUMNI_MENTORS.map((m) =>
    calculateMentorMatch(m, careerPath.title, userSkills, prefs)
  ).sort((a, b) => b.matchScore - a.matchScore);

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setSelectedMentor(null);
      setRequestNote('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#ff5500]/20 border border-[#ff5500]/30 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Alumni Matching Engine</span>
            </div>
            <h1 className="text-3xl font-black">Your Top Mentor Matches</h1>
            <p className="text-xs text-zinc-300 max-w-lg">
              Ranked by 5-factor compatibility (skills, career path, industry alignment, availability, and meeting format).
            </p>
          </div>

          <button
            onClick={() => navigate('/mentorship/preferences')}
            className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/80 text-xs font-bold text-white hover:bg-zinc-800 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Edit Preferences</span>
          </button>
        </div>
      </div>

      {/* Match Cards List */}
      <div className="space-y-6">
        {matchResults.map((result, idx) => {
          const mentor = result.mentor;

          return (
            <motion.div
              key={mentor.alumniId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-[#e5e0d5] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 hover:shadow-md transition-all"
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={mentor.photoUrl}
                      alt={mentor.alumniName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-100 shadow-sm"
                    />
                    <span className="absolute -top-2 -left-2 bg-[#0a0a0a] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-zinc-900">{mentor.alumniName}</h2>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-100">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{mentor.rating}</span>
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 font-medium">
                      {mentor.headline} • <strong className="text-zinc-900">{mentor.company}</strong>
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span>📍 {mentor.location}</span>
                      <span>•</span>
                      <span>💼 {mentor.yearsOfExperience} yrs exp</span>
                    </p>
                  </div>
                </div>

                {/* Compatibility Score Circle */}
                <div className="bg-[#fffaf7] border border-[#f8cbb0] p-4 rounded-2xl text-center space-y-1 sm:min-w-[140px]">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">MATCH SCORE</span>
                  <div className="text-3xl font-black text-[#ff5500]">{result.matchScore}%</div>
                  <span className="text-[10px] bg-[#fce8d5] text-zinc-900 font-bold px-2 py-0.5 rounded block">
                    High Compatibility
                  </span>
                </div>
              </div>

              {/* Match Reasons */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-bold text-zinc-800">Why this mentor?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                  {result.reasons.map((r, rIdx) => (
                    <div key={rIdx} className="flex items-center gap-2 font-medium">
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Breakdown Progress Bars */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-zinc-800">Compatibility Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                      <span>Skills</span>
                      <strong className="text-zinc-900">{result.breakdown.skillScore}%</strong>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff5500] rounded-full" style={{ width: `${result.breakdown.skillScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                      <span>Career Path</span>
                      <strong className="text-zinc-900">{result.breakdown.careerScore}%</strong>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${result.breakdown.careerScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                      <span>Industry</span>
                      <strong className="text-zinc-900">{result.breakdown.industryScore}%</strong>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${result.breakdown.industryScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                      <span>Availability</span>
                      <strong className="text-zinc-900">{result.breakdown.availabilityScore}%</strong>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${result.breakdown.availabilityScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-zinc-500 font-medium mb-1">
                      <span>Format</span>
                      <strong className="text-zinc-900">{result.breakdown.locationScore}%</strong>
                    </div>
                    <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${result.breakdown.locationScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-end pt-2 border-t border-zinc-100 gap-3">
                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="bg-[#0a0a0a] hover:bg-zinc-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Mentorship</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Request Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full my-auto space-y-5 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Request Mentorship</h3>
                <p className="text-xs text-zinc-500">Send a connection request to {selectedMentor.alumniName}</p>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-zinc-400 hover:text-zinc-800 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {requestSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-zinc-900">Request Sent Successfully!</h4>
                  <p className="text-xs text-zinc-500">
                    {selectedMentor.alumniName} will be notified and can accept your mentorship request from their dashboard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-700">Mentorship Goal / Note</label>
                    <textarea
                      rows={4}
                      required
                      value={requestNote}
                      onChange={(e) => setRequestNote(e.target.value)}
                      placeholder={`Hello ${selectedMentor.alumniName}, I am preparing for a ${careerPath.title} role and would love guidance on frontend development...`}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMentor(null)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#ff5500] hover:bg-[#e04b00] text-white text-xs font-bold transition-all shadow-md"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
