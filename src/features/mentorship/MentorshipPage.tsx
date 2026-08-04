import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, CheckCircle2, Send, Sparkles } from 'lucide-react';

export const MentorshipPage: React.FC = () => {
  const { alumniProfiles, mentorshipRequests, requestMentorship } = useAuth();
  const [selectedMentor, setSelectedMentor] = useState<typeof alumniProfiles[0] | null>(null);
  const [topic, setTopic] = useState('FAANG Technical System Design & Interview Preparation');
  const [message, setMessage] = useState('');

  const mentors = alumniProfiles.filter(a => a.mentor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMentor) {
      requestMentorship(selectedMentor.user_id, selectedMentor.name, selectedMentor.company, topic, message);
      setSelectedMentor(null);
      setMessage('');
      alert(`Mentorship request submitted to ${selectedMentor.name}!`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Mentorship Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 border border-orange-400/30 shadow-md text-white">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5" /> 1-on-1 Alumni Advisory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            CSE Mentorship & Career Guidance Program
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm max-w-xl font-medium">
            Get 1-on-1 career guidance, resume feedback, and technical interview coaching directly from CSE alumni leaders.
          </p>
        </div>
      </div>

      {/* Active Mentorship Tracker */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-orange-600" /> My Active Mentorship Requests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentorshipRequests.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4">No active mentorship requests submitted yet.</p>
          ) : (
            mentorshipRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-zinc-900 text-xs">{req.mentor_name} ({req.mentor_company})</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-xs text-orange-700 font-semibold">Topic: {req.topic}</p>
                <p className="text-[11px] text-zinc-600 italic">"{req.message}"</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mentors Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900">Available CSE Alumni Mentors</h3>

        {mentors.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-500 space-y-2 shadow-xs">
            <GraduationCap className="w-8 h-8 text-orange-600 mx-auto opacity-80" />
            <p className="font-bold text-zinc-900 text-sm">No mentors listed currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <div key={mentor.id} className="bg-white border border-zinc-200 hover:border-orange-500/50 rounded-2xl p-5 space-y-4 transition-all shadow-sm hover:shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-orange-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-1">
                      {mentor.name} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </h4>
                    <p className="text-xs text-orange-600 font-semibold">{mentor.position}</p>
                    <p className="text-xs text-zinc-500 font-medium">{mentor.company}</p>
                  </div>
                </div>

                <div className="text-xs text-zinc-600 space-y-1">
                  <p><strong>Graduated:</strong> CSE Class of {mentor.graduation_year}</p>
                  <p><strong>Experience:</strong> {mentor.experience}</p>
                  <p><strong>Location:</strong> {mentor.city}, {mentor.country}</p>
                </div>

                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Book Advisory Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-bold text-zinc-900">Book Session with {selectedMentor.name}</h3>
            <p className="text-xs text-orange-600 font-semibold">{selectedMentor.position} at {selectedMentor.company}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Primary Guidance Goal</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Detailed Introduction & Request</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current status, questions, or guidance needed..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 shadow-sm"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
