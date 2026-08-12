import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';
import { 
  GraduationCap, Briefcase, Building2, BookOpen, ShieldCheck, 
  Mail, Lock, ArrowRight, User, Phone, MapPin, Globe, AtSign, CheckCircle2 
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
  
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState(''); // Username or Email
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [location, setLocation] = useState('Dhaka');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const ok = await signUpWithSupabase({
        email,
        password,
        role: selectedRole,
        firstName,
        lastName,
        username,
        mobile,
        country,
        location
      });
      if (ok) navigate(`/dashboard/${selectedRole}`);
    } else {
      const ok = await loginWithSupabase(loginIdentifier, selectedRole);
      if (ok) navigate(`/dashboard/${selectedRole}`);
    }
    setLoading(false);
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side: Brand Showcase */}
        <div className="space-y-6 lg:pr-4">
          <div>
            <span className="taste-pill">
              <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
              <span>v2 (experimental) just shipped</span>
              <span className="text-[#ff5500] font-semibold">→</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a0a0a] tracking-tight">
            Alumni<span className="text-[#ff5500]">Connect</span>
          </h1>

          <p className="font-serif text-2xl sm:text-3xl text-zinc-800 tracking-tight font-normal leading-snug">
            The Anti-Slop Alumni Network & Interactive CV Engine
          </p>

          <p className="text-[#ff5500] font-semibold text-lg">
            Less slop, real connections pop.
          </p>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-normal">
            Unified portal connecting Computer Science & Engineering students, alumni tech leaders, corporate hiring teams, and department faculty.
          </p>

          {/* Quick Demo Logins Box */}
          <div className="taste-card p-4 space-y-2.5">
            <p className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1-Click Instant Persona Switches:
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
            <div>
              <h2 className="text-xl font-extrabold text-[#0a0a0a]">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {isSignUp ? 'Enter your basic details to get started' : 'Sign in using Username or Email'}
              </p>
            </div>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-[#ff5500] hover:underline transition"
            >
              {isSignUp ? 'Already have account? Sign In' : 'Need account? Sign Up'}
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

            {/* LOGIN FORM: Username or Email + Password */}
            {!isSignUp ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">Username or Email Address</label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="username or email@univ.edu"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
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
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* SIGNUP FORM: First Name, Last Name, Username, Mobile, Email, Country, Location */
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">First Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Shanto"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Rahman"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-white border border-[#e5e0d5] rounded-xl px-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Username *</label>
                    <div className="relative">
                      <AtSign className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="shshantoo"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="+880 1700-000000"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@univ.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Country *</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Bangladesh"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">Location / City *</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Dhaka"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-9 pr-3 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-[#e5e0d5] rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-black w-full py-3.5 text-xs flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Complete Registration' : 'Sign In Now')}
              <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
