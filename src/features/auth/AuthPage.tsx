import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';
import { 
  GraduationCap, Briefcase, Building2, BookOpen, ShieldCheck, 
  Lock, Mail, User, Phone, MapPin, Globe, ArrowRight, Sparkles, 
  CheckCircle2, AlertCircle, Eye, EyeOff, ShieldAlert, KeyRound, Clock
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { loginWithSupabase, signUpWithSupabase, switchRole } = useAuth();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode');

  const [isSignIn, setIsSignIn] = useState(initialMode !== 'register');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  useEffect(() => {
    if (initialMode === 'register') {
      setIsSignIn(false);
    } else if (initialMode === 'login') {
      setIsSignIn(true);
    }
  }, [initialMode]);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal State
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Sign In Form State
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form State (Validated Student & Alumni IUB Registration)
  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    iubEmail: '',
    iubId: '',
    mobile: '',
    school: 'SETS',
    department: 'CSE',
    batch: '2026',
    graduationYear: '2022',
    convocationNumber: '23rd Convocation',
    currentCompany: '',
    currentPosition: '',
    country: 'Bangladesh',
    location: 'Dhaka',
    password: '',
    confirmPassword: ''
  });

  // Calculate Password Strength Score (0 to 100)
  const calculatePasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return score;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
    return score;
  };

  const passwordStrength = calculatePasswordStrength(signUpForm.password);

  const getStrengthLabel = (score: number) => {
    if (score === 0) return { label: 'Empty', color: 'bg-zinc-200', text: 'text-zinc-400' };
    if (score <= 25) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (score <= 50) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
    if (score <= 75) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
    return { label: 'Excellent', color: 'bg-[#ff5500]', text: 'text-[#ff5500]' };
  };

  const strengthMeta = getStrengthLabel(passwordStrength);

  // Handle Sign In Submit
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    if (!signInIdentifier || !signInPassword) {
      setErrorMsg('Please enter your Username/Email and password.');
      setIsSubmitting(false);
      return;
    }

    const success = await loginWithSupabase(signInIdentifier, selectedRole);
    if (success) {
      setSuccessMsg('Sign in successful! Redirecting...');
    } else {
      setErrorMsg('Invalid credentials. Try quick demo sign in buttons below!');
    }
    setIsSubmitting(false);
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    // Validation 1: Password match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    // Validation 2: Student 7-digit IUB ID & @iub.edu.bd email check
    if (selectedRole === 'student') {
      if (!/^\d{7}$/.test(signUpForm.iubId.trim())) {
        setErrorMsg('Validation Error: Student IUB ID must be a valid 7-digit number (e.g. 2220145).');
        setIsSubmitting(false);
        return;
      }

      const emailToCheck = signUpForm.iubEmail || signUpForm.email;
      if (!emailToCheck.toLowerCase().trim().endsWith('@iub.edu.bd')) {
        setErrorMsg('Validation Error: Student email must end with @iub.edu.bd domain.');
        setIsSubmitting(false);
        return;
      }
    }

    // Validation 3: Alumni 7-digit IUB ID check
    if (selectedRole === 'alumni') {
      if (!/^\d{7}$/.test(signUpForm.iubId.trim())) {
        setErrorMsg('Validation Error: Alumni IUB ID must be a valid 7-digit number (e.g. 1910123).');
        setIsSubmitting(false);
        return;
      }
    }

    const res = await signUpWithSupabase({
      email: signUpForm.email || `${signUpForm.iubId}@iub.edu.bd`,
      password: signUpForm.password,
      role: selectedRole,
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      username: signUpForm.username || `user_${Date.now().toString().slice(-4)}`,
      mobile: signUpForm.mobile,
      country: signUpForm.country,
      location: signUpForm.location,
      iubId: signUpForm.iubId,
      iubEmail: signUpForm.iubEmail,
      school: signUpForm.school,
      department: signUpForm.department,
      batch: signUpForm.batch,
      graduationYear: signUpForm.graduationYear,
      convocationNumber: signUpForm.convocationNumber,
      currentCompany: signUpForm.currentCompany,
      currentPosition: signUpForm.currentPosition
    });

    if (res.success) {
      setSuccessMsg(res.message || 'Account created successfully!');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fadeIn">
      
      {/* Top Identity Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce8d5] border border-[#f8cbb0] text-zinc-950 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-[#ff5500]" />
          <span>Independent University, Bangladesh (IUB) Institutional Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0a0a0a] tracking-tight">
          AlumniConnect Institutional Authentication
        </h1>
        <p className="text-xs text-zinc-600 max-w-lg mx-auto">
          Sign in or create your validated Student / Alumni account using your 7-Digit IUB ID & @iub.edu.bd email.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="taste-card p-2 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'student', label: 'Student', icon: GraduationCap },
          { id: 'alumni', label: 'Alumni', icon: Briefcase },
          { id: 'employer', label: 'Employer', icon: Building2 },
          { id: 'faculty', label: 'Faculty', icon: BookOpen },
          { id: 'admin', label: 'Admin', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = selectedRole === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedRole(tab.id as UserRole);
                switchRole(tab.id as UserRole);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-[#0a0a0a] text-white shadow-sm'
                  : 'bg-[#f8f6f0] text-zinc-700 hover:bg-[#f0ede6] border border-[#e5e0d5]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff5500]' : 'text-zinc-500'}`} />
              {tab.label} Portal
            </button>
          );
        })}
      </div>

      {/* Authentication Card */}
      <div className="taste-card p-6 sm:p-8 space-y-6 max-w-2xl mx-auto border border-[#e5e0d5] bg-white">
        
        {/* Toggle Sign In vs Sign Up */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSignIn(true)}
              className={`text-base font-extrabold pb-1 transition border-b-2 ${
                isSignIn ? 'border-[#ff5500] text-[#0a0a0a]' : 'border-transparent text-zinc-400'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`text-base font-extrabold pb-1 transition border-b-2 ${
                !isSignIn ? 'border-[#ff5500] text-[#0a0a0a]' : 'border-transparent text-zinc-400'
              }`}
            >
              Register Account
            </button>
          </div>

          <span className="text-xs font-semibold text-[#ff5500] capitalize bg-[#fce8d5] px-3 py-1 rounded-full">
            {selectedRole} Mode
          </span>
        </div>

        {/* Notifications & Alert Messages */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Alumni Institutional Pending Verification Info Banner */}
        {!isSignIn && selectedRole === 'alumni' && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-800">
              <Clock className="w-4 h-4 text-amber-600" /> Institutional Alumni Verification Required
            </p>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Upon submitting registration, your alumni profile will enter <strong>Pending Verification</strong> status. An Administrator will verify your 7-digit IUB ID & Convocation Number before granting full alumni directory access.
            </p>
          </div>
        )}

        {/* FORM 1: SIGN IN */}
        {isSignIn ? (
          <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1 text-zinc-900">Username, Email, or 7-Digit IUB ID *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. shshantoo, student@iub.edu.bd, or 2220145"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl pl-9 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-zinc-900">Password *</label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-xs text-[#ff5500] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl pl-9 pr-10 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-black w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
            >
              Sign In to {selectedRole.toUpperCase()} Portal <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </button>
          </form>
        ) : (
          /* FORM 2: SIGN UP WITH IUB VALIDATION */
          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shanto"
                  value={signUpForm.firstName}
                  onChange={(e) => setSignUpForm({ ...signUpForm, firstName: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahman"
                  value={signUpForm.lastName}
                  onChange={(e) => setSignUpForm({ ...signUpForm, lastName: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            {/* IUB ID & Email Validation Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">
                  7-Digit IUB ID * {selectedRole === 'student' && <span className="text-[#ff5500] text-[10px]">(e.g. 2220145)</span>}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2220145"
                  value={signUpForm.iubId}
                  onChange={(e) => setSignUpForm({ ...signUpForm, iubId: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  {selectedRole === 'student' ? 'Official IUB Email (@iub.edu.bd) *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder={selectedRole === 'student' ? '2220145@iub.edu.bd' : 'alumni@company.com'}
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value, iubEmail: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            {/* Username & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">Username *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. shshantoo"
                  value={signUpForm.username}
                  onChange={(e) => setSignUpForm({ ...signUpForm, username: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Mobile Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+880 1700-123456"
                  value={signUpForm.mobile}
                  onChange={(e) => setSignUpForm({ ...signUpForm, mobile: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            {/* School & Department Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">IUB School *</label>
                <select
                  value={signUpForm.school}
                  onChange={(e) => setSignUpForm({ ...signUpForm, school: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                >
                  <option value="SETS">SETS - School of Engineering, Technology & Sciences</option>
                  <option value="SBE">SBE - School of Business & Entrepreneurship</option>
                  <option value="SLASS">SLASS - School of Liberal Arts & Social Sciences</option>
                  <option value="SPHS">SPHS - School of Pharmacy & Public Health</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Department *</label>
                <select
                  value={signUpForm.department}
                  onChange={(e) => setSignUpForm({ ...signUpForm, department: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                >
                  <option value="CSE">CSE - Computer Science & Engineering</option>
                  <option value="EEE">EEE - Electrical & Electronic Engineering</option>
                  <option value="PS">Physical Sciences</option>
                  <option value="BBA">BBA - Business Administration</option>
                </select>
              </div>
            </div>

            {/* Alumni Specific Fields: Graduation Year & Convocation Number */}
            {selectedRole === 'alumni' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f8f6f0] p-3 rounded-xl border border-[#e5e0d5]">
                <div>
                  <label className="block font-bold mb-1">Graduation Year *</label>
                  <select
                    value={signUpForm.graduationYear}
                    onChange={(e) => setSignUpForm({ ...signUpForm, graduationYear: e.target.value })}
                    className="w-full bg-white border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none"
                  >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Convocation Number *</label>
                  <select
                    value={signUpForm.convocationNumber}
                    onChange={(e) => setSignUpForm({ ...signUpForm, convocationNumber: e.target.value })}
                    className="w-full bg-white border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none"
                  >
                    <option value="24th Convocation">24th Convocation (2024)</option>
                    <option value="23rd Convocation">23rd Convocation (2023)</option>
                    <option value="22nd Convocation">22nd Convocation (2022)</option>
                    <option value="21st Convocation">21st Convocation (2021)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Current Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Google / Microsoft / Grameenphone"
                    value={signUpForm.currentCompany}
                    onChange={(e) => setSignUpForm({ ...signUpForm, currentCompany: e.target.value })}
                    className="w-full bg-white border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Current Position</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={signUpForm.currentPosition}
                    onChange={(e) => setSignUpForm({ ...signUpForm, currentPosition: e.target.value })}
                    className="w-full bg-white border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                  />
                </div>
              </div>
            )}

            {/* Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                  className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

            {/* LIVE PASSWORD STRENGTH METER */}
            {signUpForm.password && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-zinc-600">Password Strength:</span>
                  <span className={`font-bold ${strengthMeta.text}`}>{strengthMeta.label} ({passwordStrength}%)</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${strengthMeta.color}`} 
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500">
                  Tip: Include at least 8 characters, uppercase letters, numbers, and special symbols (!@#$).
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-black w-full py-3 text-xs font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 mt-2"
            >
              Complete {selectedRole.toUpperCase()} Registration <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </button>
          </form>
        )}

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e5e0d5] rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-scaleUp text-xs text-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#ff5500]" /> Password Recovery Engine
              </h3>
              <button onClick={() => setIsForgotPasswordOpen(false)} className="text-zinc-500 hover:text-zinc-800">
                ✕
              </button>
            </div>

            {forgotStep === 1 ? (
              <div className="space-y-3">
                <p className="text-zinc-600 leading-relaxed">
                  Enter your registered IUB Email or 7-Digit IUB ID. We will generate a 6-digit password verification code.
                </p>
                <div>
                  <label className="block font-bold mb-1">Email or 7-Digit IUB ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 2220145@iub.edu.bd"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs text-zinc-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (forgotEmail) setForgotStep(2);
                  }}
                  className="btn-black w-full py-2.5 text-xs font-bold"
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-emerald-700 font-semibold">
                  Verification code sent to {forgotEmail}! Enter code and new password.
                </p>
                <div>
                  <label className="block font-bold mb-1">6-Digit Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 892014"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-xl p-2.5 text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMsg('Password reset successfully! Please sign in with your new password.');
                    setIsForgotPasswordOpen(false);
                    setForgotStep(1);
                  }}
                  className="btn-black w-full py-2.5 text-xs font-bold"
                >
                  Update Password & Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
