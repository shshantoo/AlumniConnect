import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, Phone, 
  Edit3, GraduationCap, Sparkles 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole, profile, studentProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [linkedin, setLinkedin] = useState(profile?.linkedin || '');
  const [portfolio, setPortfolio] = useState(profile?.portfolio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Card */}
      <div className="relative rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-xs overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt="Profile Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-orange-500/20 shadow-md"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-zinc-900">{profile?.full_name || 'User Profile'}</h1>
                <p className="text-xs text-orange-600 font-semibold capitalize flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <GraduationCap className="w-4 h-4" /> CSE {currentRole} Profile
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4 text-orange-600" /> Edit Profile
              </button>
            </div>

            <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">{profile?.bio || 'No biography added yet.'}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-500 pt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-orange-600" /> {currentUser?.email || 'user@univ.edu'}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {profile?.phone || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        {studentProfile && (
          <div className="pt-6 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="text-zinc-500 text-[10px] uppercase font-bold">Student ID</span>
              <p className="font-bold text-zinc-900 mt-0.5">{studentProfile.student_id || 'CSE-2026'}</p>
            </div>
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="text-zinc-500 text-[10px] uppercase font-bold">Academic Standing</span>
              <p className="font-bold text-emerald-600 mt-0.5">{studentProfile.cgpa || '3.88'} CGPA</p>
            </div>
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200">
              <span className="text-zinc-500 text-[10px] uppercase font-bold">Department</span>
              <p className="font-bold text-orange-600 mt-0.5">{studentProfile.department || 'CSE'}</p>
            </div>
          </div>
        )}

        {/* Skills Tag Cloud */}
        {studentProfile && studentProfile.skills && studentProfile.skills.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-zinc-900 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" /> Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl animate-scaleUp">
            <h3 className="text-lg font-bold text-zinc-900">Edit Profile Details</h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Portfolio Link</label>
                <input
                  type="text"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-semibold hover:bg-zinc-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
