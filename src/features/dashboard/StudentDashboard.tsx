import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, Briefcase, Calendar, Award, ArrowUpRight, 
  CheckCircle2, DollarSign, Send, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProfileCompletionRing } from '../../components/profile/ProfileCompletionRing';
import { CvBuilderModal } from '../../features/profile/CvBuilderModal';

import { RolePreviewBar } from '../../components/dashboard/RolePreviewBar';

export const StudentDashboard: React.FC = () => {
  const { 
    profile, studentProfile, applications, mentorshipRequests, 
    events, jobs, alumniProfiles, applyForJob, requestMentorship, updateUserProfile 
  } = useAuth();

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [mentorModal, setMentorModal] = useState<typeof alumniProfiles[0] | null>(null);
  const [mentorTopic, setMentorTopic] = useState('Career Roadmap & Tech Interview Prep');
  const [mentorMsg, setMentorMsg] = useState('');

  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false);

  const activeAppsCount = applications.length;
  const activeMentorships = mentorshipRequests.filter(m => m.status === 'Accepted').length;
  const registeredEvents = events.filter(e => e.is_registered).length;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJob) {
      applyForJob(selectedJob, coverLetter);
      setSelectedJob(null);
      setCoverLetter('');
    }
  };

  const handleSendMentorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (mentorModal) {
      requestMentorship(mentorModal.user_id, mentorModal.name, mentorModal.company, mentorTopic, mentorMsg);
      setMentorModal(null);
      setMentorMsg('');
    }
  };

  return (
    <div className="space-y-8">
      <RolePreviewBar />
      
      {/* Hero Banner */}
      <div className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <span className="taste-pill">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
            <span>CSE Student Portal</span>
            <span className="text-zinc-600 font-normal">v2 active →</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight">
          Welcome back, {profile?.full_name || 'Student'}
        </h1>

        <p className="font-serif text-2xl sm:text-3xl text-zinc-800 tracking-tight font-normal leading-snug">
          The Alumni Advisory & Interactive CV Engine for CSE Engineers
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setIsCvBuilderOpen(true)}
            className="btn-black px-6 py-3.5 text-xs font-bold rounded-2xl flex items-center gap-2 shadow-md"
          >
            Launch 18-Section CV Builder <ArrowRight className="w-4 h-4 text-[#ff5500]" />
          </button>
          <Link
            to="/directory"
            className="btn-white px-6 py-3.5 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-xs"
          >
            Find Alumni Mentor <ArrowUpRight className="w-4 h-4 text-zinc-600" />
          </Link>
        </div>
      </div>

      {/* PROFILE COMPLETION PERCENTAGE RING WIDGET */}
      <ProfileCompletionRing
        profile={profile}
        onOpenCvBuilder={() => setIsCvBuilderOpen(true)}
      />

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="taste-card p-5 taste-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Applications</span>
            <div className="w-9 h-9 rounded-xl bg-[#fce8d5] text-[#0a0a0a] flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4 text-[#ff5500]" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0a0a0a] mt-2">{activeAppsCount}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active job tracker
          </p>
        </div>

        <div className="taste-card p-5 taste-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Active Mentors</span>
            <div className="w-9 h-9 rounded-xl bg-[#fce8d5] text-[#0a0a0a] flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4 text-[#ff5500]" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0a0a0a] mt-2">{activeMentorships}</p>
          <p className="text-[11px] text-[#ff5500] font-semibold mt-1">1-on-1 Advisory sessions</p>
        </div>

        <div className="taste-card p-5 taste-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Event RSVPs</span>
            <div className="w-9 h-9 rounded-xl bg-[#fce8d5] text-[#0a0a0a] flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4 text-[#ff5500]" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0a0a0a] mt-2">{registeredEvents}</p>
          <p className="text-[11px] text-zinc-500 font-medium mt-1">Upcoming tech reunions</p>
        </div>

        <div className="taste-card p-5 taste-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Academic Standing</span>
            <div className="w-9 h-9 rounded-xl bg-[#fce8d5] text-[#0a0a0a] flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-[#ff5500]" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#0a0a0a] mt-2">{profile?.cgpa || '3.88'}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Honors Student • CSE</p>
        </div>
      </div>

      {/* Featured Jobs & Alumni */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#0a0a0a] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#ff5500]" /> Featured Opportunities
            </h3>
            <Link to="/jobs" className="text-xs font-bold text-[#ff5500] hover:underline flex items-center gap-1">
              View All Opportunities <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="taste-card p-5 taste-card-hover group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center font-bold text-xs">
                      CSE
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-950 group-hover:text-[#ff5500] transition text-sm">{job.title}</h4>
                      <p className="text-xs text-zinc-500 font-medium">{job.company} • {job.location}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] text-[10px] font-semibold">
                          {job.type}
                        </span>
                        <span className="text-[11px] text-zinc-600 flex items-center gap-1 font-medium">
                          <DollarSign className="w-3 h-3 text-emerald-600" /> {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job.id)}
                    className="btn-black px-4 py-2 text-xs"
                  >
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="taste-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#0a0a0a] text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#ff5500]" /> Recommended Alumni
              </h3>
              <Link to="/directory" className="text-[11px] text-[#ff5500] hover:underline font-bold">View All</Link>
            </div>

            <div className="space-y-3">
              {alumniProfiles.slice(0, 3).map((alumni) => (
                <div key={alumni.id} className="flex items-center justify-between p-3 rounded-xl bg-[#f8f6f0] border border-[#e5e0d5]">
                  <div className="flex items-center gap-3">
                    <img
                      src={alumni.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={alumni.name}
                      className="w-9 h-9 rounded-lg object-cover ring-2 ring-[#ff5500]/30"
                    />
                    <div>
                      <p className="font-bold text-zinc-950 text-xs">{alumni.name}</p>
                      <p className="text-[11px] text-zinc-500">{alumni.position} at <span className="text-[#ff5500] font-semibold">{alumni.company}</span></p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMentorModal(alumni)}
                    className="p-2 rounded-lg bg-[#fce8d5] text-zinc-950 hover:bg-[#0a0a0a] hover:text-white transition text-xs font-semibold"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CV Builder Modal */}
      <CvBuilderModal
        isOpen={isCvBuilderOpen}
        onClose={() => setIsCvBuilderOpen(false)}
        initialProfile={profile}
        onSaveProfile={(updated) => updateUserProfile(updated)}
      />

    </div>
  );
};
