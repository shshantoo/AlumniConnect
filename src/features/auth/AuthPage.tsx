import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';
import { 
  GraduationCap, Briefcase, Building2, BookOpen, ShieldCheck, 
  Mail, Lock, ArrowRight, Copy, Check 
} from 'lucide-react';

const ROLES: { id: UserRole; label: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'student', label: 'Student', desc: 'Enrolled CSE Student seeking internships, mentors & jobs', icon: GraduationCap },
  { id: 'alumni', label: 'Alumni', desc: 'CSE Graduate offering mentorship & company referrals', icon: Briefcase },
  { id: 'employer', label: 'Employer', desc: 'Corporate hiring team posting tech jobs & viewing applicants', icon: Building2 },
  { id: 'faculty', label: 'Faculty', desc: 'Department Head & Advisors managing counseling slots', icon: BookOpen },
  { id: 'admin', label: 'Admin', desc: 'System governance, user approvals & platform analytics', icon: ShieldCheck },
];

export const AuthPage: React.FC = () => {
  const { loginWithSupabase, signUpWithSupabase, switchRole } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const ok = await signUpWithSupabase(email, password, selectedRole, fullName);
      if (ok) navigate(`/dashboard/${selectedRole}`);
    } else {
      const ok = await loginWithSupabase(email, selectedRole);
      if (ok) navigate(`/dashboard/${selectedRole}`);
    }
    setLoading(false);
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    navigate(`/dashboard/${role}`);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText('npx skills add Leonxlnx/taste-skill');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side: Reference Image Style Branding */}
        <div className="space-y-6 lg:pr-4">
          
          {/* Pill Badge */}
          <div>
            <span className="taste-pill">
              <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
              <span>v2 (experimental) just shipped</span>
              <span className="text-[#ff5500] font-semibold">→</span>
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight">
            Alumni<span className="text-[#ff5500]">Connect</span>
          </h1>

          {/* Editorial Serif Subtitle */}
          <p className="font-serif text-2xl sm:text-3xl text-zinc-800 tracking-tight font-normal leading-snug">
            The Anti-Slop Alumni Network Framework for CSE Engineers
          </p>

          {/* Accent Slogan */}
          <p className="text-[#ff5500] font-semibold text-lg">
            Less slop, designs pop.
          </p>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-normal">
            The unified portal connecting Computer Science & Engineering students, alumni tech leaders, hiring corporate teams, and faculty.
          </p>

          {/* Reference Terminal Command Chip */}
          <div className="bg-[#121212] text-white p-3.5 rounded-2xl flex items-center justify-between font-mono text-xs shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">$</span>
              <span className="text-zinc-200">npx skills add Leonxlnx/taste-skill</span>
            </div>
            <button
              onClick={handleCopyCmd}
              className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-[11px] font-sans font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          {/* Quick Demo Switcher Buttons */}
          <div className="taste-card p-4 space-y-2.5">
            <p className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 1-Click Instant Demo Logins:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ROLES.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleQuickDemo(r.id)}
                    className="p-2 rounded-xl bg-[#f8f6f0] border border-[#e5e0d5] hover:border-[#ff945e] hover:bg-white text-zinc-800 transition text-xs font-bold flex items-center gap-2 text-left"
                  >
                    <Icon className="w-4 h-4 text-[#ff5500] flex-shrink-0" />
                    <span className="truncate">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Auth Form */}
        <div className="taste-card p-6 sm:p-8 space-y-6 shadow-md relative">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <h2 className="text-xl font-extrabold text-[#0a0a0a]">
              {isSignUp ? 'Create Account' : 'Sign In to AlumniConnect'}
            </h2>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-[#ff5500] hover:underline transition"
            >
              {isSignUp ? 'Already have account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-2">Select User Role</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.slice(0, 3).map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition text-center capitalize ${
                      selectedRole === r.id
                        ? 'bg-[#0a0a0a] border-[#0a0a0a] text-white shadow-xs'
                        : 'bg-[#f8f6f0] border-[#e5e0d5] text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Shanto Rahman"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-[#e5e0d5] rounded-xl p-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@univ.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-black w-full py-3.5 text-xs flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create & Launch Dashboard' : 'Sign In Now')}
              <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
