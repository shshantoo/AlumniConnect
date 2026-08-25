import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, updateProfileInSupabase } from '../utils/supabase';
import { 
  UserRole, UserProfile, StudentProfile, AlumniProfile,
  JobListing, ApplicationRecord, MentorshipRequestRecord, 
  EventRecord, HomeMediaItem, NotificationRecord, AppointmentRecord 
} from '../types/database.types';
import { 
  INITIAL_PROFILES, INITIAL_STUDENT_PROFILE, INITIAL_ALUMNI_PROFILES, 
  INITIAL_JOBS, INITIAL_APPLICATIONS, INITIAL_MENTORSHIP_REQUESTS, 
  INITIAL_EVENTS, INITIAL_NOTIFICATIONS, INITIAL_APPOINTMENTS 
} from '../mock/seedData';

interface AuthContextType {
  currentUser: { id: string; email: string } | null;
  currentRole: UserRole;
  profile: UserProfile | null;
  studentProfile: StudentProfile | null;
  alumniProfiles: (AlumniProfile & { name: string; email: string; photo: string })[];
  jobs: JobListing[];
  internships: JobListing[];
  applications: ApplicationRecord[];
  mentorshipRequests: MentorshipRequestRecord[];
  events: EventRecord[];
  homeMedia: HomeMediaItem[];
  notifications: NotificationRecord[];
  appointments: AppointmentRecord[];
  isLoading: boolean;
  switchRole: (role: UserRole) => void;
  loginWithSupabase: (identifier: string, role?: UserRole) => Promise<boolean>;
  signUpWithSupabase: (data: {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    username: string;
    mobile: string;
    country: string;
    location: string;
    iubId?: string;
    iubEmail?: string;
    school?: string;
    department?: string;
    batch?: string;
    graduationYear?: string;
    convocationNumber?: string;
    currentCompany?: string;
    currentPosition?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  approveAlumni: (userId: string) => void;
  rejectAlumni: (userId: string) => void;
  updateUserProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
  applyForJob: (jobId: string, coverLetter: string, isInternship?: boolean) => void;
  postJob: (newJob: Partial<JobListing>) => void;
  requestMentorship: (mentorId: string, mentorName: string, mentorCompany: string, topic: string, message: string) => void;
  updateMentorshipStatus: (requestId: string, status: 'Accepted' | 'Rejected') => void;
  registerForEvent: (eventId: string) => void;
  createEvent: (data: Partial<EventRecord>) => void;
  editEvent: (id: string, data: Partial<EventRecord>) => void;
  deleteEvent: (id: string) => void;
  togglePublishEvent: (id: string) => void;
  addHomeMedia: (data: Partial<HomeMediaItem>) => void;
  deleteHomeMedia: (id: string) => void;
  togglePublishHomeMedia: (id: string) => void;
  bookAppointment?: (facultyId: string, facultyName: string, date: string, topic: string) => void;
  markNotificationRead: (id: string) => void;
  updateApplicationStatus: (appId: string, newStatus: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string } | null>({
    id: 'usr-student-1',
    email: 'shanto.student@iub.edu.bd'
  });
  const [profile, setProfile] = useState<UserProfile | null>(INITIAL_PROFILES['student'] as UserProfile);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(INITIAL_STUDENT_PROFILE);
  const [alumniProfiles, setAlumniProfiles] = useState<(AlumniProfile & { name: string; email: string; photo: string })[]>(INITIAL_ALUMNI_PROFILES);
  
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [internships, setInternships] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequestRecord[]>([]);
  const [events, setEvents] = useState<EventRecord[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Switch Active User Role (Demo Mode Persona Switcher)
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    let demoProf = INITIAL_PROFILES[role] as UserProfile;
    try {
      const saved = localStorage.getItem(`alumniconnect_profile_${role}`);
      if (saved) {
        demoProf = JSON.parse(saved);
      }
    } catch (e) {}
    setProfile(demoProf);
    setCurrentUser({
      id: demoProf?.user_id || `usr-${role}-1`,
      email: demoProf?.email || `${role}@iub.edu.bd`
    });
  };

  // Login by Username or Email
  const loginWithSupabase = async (identifier: string, role: UserRole = 'student'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanEmail = identifier.includes('@') ? identifier.trim() : `${identifier.trim()}@iub.edu.bd`;
      const cleanUsername = identifier.includes('@') ? identifier.split('@')[0] : identifier.trim();
      const userId = `usr-${role}-${Date.now()}`;

      const activeProf: UserProfile = {
        id: `prof-${Date.now()}`,
        user_id: userId,
        role: role,
        full_name: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
        first_name: cleanUsername,
        last_name: 'User',
        username: cleanUsername,
        email: cleanEmail,
        country: 'Bangladesh',
        location: 'Dhaka',
        verification_status: role === 'alumni' ? 'pending' : 'verified',
        account_status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setCurrentRole(role);
      setProfile(activeProf);
      setCurrentUser({ id: userId, email: cleanEmail });

      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  // Initial Signup with Names, Username, Mobile, Country, Location
  const signUpWithSupabase = async (data: {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    username: string;
    mobile: string;
    country: string;
    location: string;
    iubId?: string;
    iubEmail?: string;
    school?: string;
    department?: string;
    batch?: string;
    graduationYear?: string;
    convocationNumber?: string;
    currentCompany?: string;
    currentPosition?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      // 1. Validation for Student
      if (data.role === 'student') {
        if (data.iubId && !/^\d{7}$/.test(data.iubId.trim())) {
          setIsLoading(false);
          return { success: false, message: 'IUB ID must be a valid 7-digit number (e.g. 2220145).' };
        }
        if (data.iubEmail && !data.iubEmail.toLowerCase().trim().endsWith('@iub.edu.bd')) {
          setIsLoading(false);
          return { success: false, message: 'Student email must end with @iub.edu.bd domain.' };
        }
      }

      const newUserId = `usr-${data.role}-${Date.now()}`;
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const isAlumniPending = data.role === 'alumni';

      const newProfile: UserProfile = {
        id: `prof-${Date.now()}`,
        user_id: newUserId,
        role: data.role,
        full_name: fullName,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.mobile,
        country: data.country,
        location: data.location,
        iub_id: data.iubId,
        iub_email: data.iubEmail || (data.email.endsWith('@iub.edu.bd') ? data.email : undefined),
        school: data.school || 'SETS',
        department: data.department || 'CSE',
        batch_year: data.batch || data.graduationYear || '2026',
        convocation_number: data.convocationNumber,
        verification_status: isAlumniPending ? 'pending' : 'verified',
        account_status: 'active',
        bio: `IUB ${data.school || 'SETS'} ${data.role} profile created on AlumniConnect.`,
        alumni_preferences: {
          current_title: data.currentPosition || 'Software Engineer',
          current_company: data.currentCompany || 'Tech Enterprise',
          can_help_with: ['Career Guidance', 'Job Referrals'],
          looking_for: ['Networking', 'Job Opportunities']
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // If Alumni, add to mock alumni directory as pending/verified
      if (data.role === 'alumni') {
        const newAlum = {
          id: `alm-${Date.now()}`,
          user_id: newUserId,
          name: fullName,
          company: data.currentCompany || 'Pending Verification Company',
          position: data.currentPosition || 'Alumnus',
          graduation_year: parseInt(data.graduationYear || '2022', 10),
          experience: '3+ Years',
          country: data.country || 'Bangladesh',
          city: data.location || 'Dhaka',
          email: data.email,
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          mentor: false,
          verification_status: 'pending' as const
        };
        setAlumniProfiles(prev => [newAlum as any, ...prev]);
      }

      setCurrentRole(data.role);
      setCurrentUser({ id: newUserId, email: data.email });
      setProfile(newProfile);

      setIsLoading(false);
      return { 
        success: true, 
        message: isAlumniPending 
          ? 'Registration successful! Your alumni account is pending Admin Verification.' 
          : 'Registration successful!' 
      };
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return { success: false, message: 'An unexpected error occurred during signup.' };
    }
  };

  // Admin Verification Methods
  const approveAlumni = (userId: string) => {
    setAlumniProfiles(prev => prev.map(a => a.user_id === userId ? { ...a, verification_status: 'verified' as any } : a));
    if (profile && profile.user_id === userId) {
      setProfile(prev => prev ? { ...prev, verification_status: 'verified' } : null);
    }
  };

  const rejectAlumni = (userId: string) => {
    setAlumniProfiles(prev => prev.map(a => a.user_id === userId ? { ...a, verification_status: 'rejected' as any } : a));
    if (profile && profile.user_id === userId) {
      setProfile(prev => prev ? { ...prev, verification_status: 'rejected' } : null);
    }
  };

  // Update Profile Data & Persist to Database & Local Storage
  const updateUserProfile = (updatedData: Partial<UserProfile>) => {
    setProfile(prev => {
      const base = prev || (INITIAL_PROFILES[currentRole] as UserProfile);
      const merged: UserProfile = {
        ...base,
        ...updatedData,
        updated_at: new Date().toISOString()
      };

      // 1. Save to localStorage database for persistent offline access across reloads
      try {
        localStorage.setItem(`alumniconnect_profile_${merged.role || currentRole}`, JSON.stringify(merged));
        if (merged.user_id) {
          localStorage.setItem(`alumniconnect_profile_${merged.user_id}`, JSON.stringify(merged));
        }
      } catch (e) {
        console.error('LocalStorage profile save error:', e);
      }

      // 2. Save/Upsert directly to Supabase database table
      try {
        updateProfileInSupabase(merged.user_id || `usr-${currentRole}-1`, merged);
      } catch (e) {
        console.warn('Supabase sync warning:', e);
      }

      // 3. If Alumni, sync updated photo and info into directory lists
      if (merged.role === 'alumni') {
        setAlumniProfiles(prevAlm => prevAlm.map(a => {
          if (a.user_id === merged.user_id || a.email === merged.email) {
            return {
              ...a,
              name: merged.full_name || a.name,
              photo: merged.photo || a.photo,
              company: (merged as any).alumni_preferences?.current_company || (merged as any).company || a.company,
              position: (merged as any).alumni_preferences?.current_title || merged.headline || a.position
            };
          }
          return a;
        }));
      }

      return merged;
    });
  };

  const logout = () => {
    setCurrentUser(null);
    setProfile(null);
  };

  // Action Methods
  const applyForJob = (jobId: string, coverLetter: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob || !profile) return;

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      job_id: jobId,
      job_title: targetJob.title,
      student_id: profile.user_id,
      student_name: profile.full_name,
      resume: profile.portfolio || 'https://univ.edu/resumes/sample.pdf',
      cover_letter: coverLetter,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        user_id: profile.user_id,
        title: 'Application Submitted',
        message: `Your application for ${targetJob.title} at ${targetJob.company} was submitted.`,
        created_at: new Date().toISOString(),
        is_read: false
      },
      ...prev
    ]);
  };

  const postJob = (newJob: Partial<JobListing>) => {
    const job: JobListing = {
      id: `job-${Date.now()}`,
      title: newJob.title || 'Software Engineering Position',
      company: newJob.company || 'Tech Enterprise',
      location: newJob.location || 'Remote',
      type: newJob.type || 'Full-Time',
      salary: newJob.salary || '$120,000 / yr',
      description: newJob.description || 'Join our tech team working on distributed systems.',
      created_at: new Date().toISOString()
    };

    setJobs(prev => [job, ...prev]);
  };

  const requestMentorship = (mentorId: string, mentorName: string, mentorCompany: string, topic: string, message: string) => {
    if (!profile) return;
    const req: MentorshipRequestRecord = {
      id: `req-${Date.now()}`,
      student_id: profile.user_id,
      student_name: profile.full_name,
      mentor_id: mentorId,
      mentor_name: mentorName,
      mentor_company: mentorCompany,
      topic,
      message,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    setMentorshipRequests(prev => [req, ...prev]);
  };

  const updateMentorshipStatus = (requestId: string, status: 'Accepted' | 'Rejected') => {
    setMentorshipRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
  };

  const registerForEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const isRegistered = !e.is_registered;
        return {
          ...e,
          is_registered: isRegistered,
          registered_count: isRegistered ? (e.registered_count || 0) + 1 : Math.max(0, (e.registered_count || 0) - 1)
        };
      }
      return e;
    }));
  };

  const [homeMedia, setHomeMedia] = useState<HomeMediaItem[]>([
    {
      id: 'med-1',
      title: 'Global CSE Alumni Keynote & Tech Summit 2026',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_embed_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Annual keynote featuring alumni leaders from Google, Amazon, and Stripe on AI Cloud Systems.',
      is_published: true,
      created_at: new Date().toISOString()
    }
  ]);

  // Admin Event Management
  const createEvent = (data: Partial<EventRecord>) => {
    const newEvt: EventRecord = {
      id: `evt-${Date.now()}`,
      title: data.title || 'Untitled CSE Event',
      description: data.description || 'Departmental workshop and networking summit.',
      event_date: data.event_date || new Date().toISOString(),
      location: data.location || 'IUB Campus & Zoom Webcast',
      category: data.category || 'Workshop',
      image: data.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      is_registered: false,
      registered_count: 0,
      is_published: true
    };
    setEvents(prev => [newEvt, ...prev]);
  };

  const editEvent = (id: string, data: Partial<EventRecord>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const togglePublishEvent = (id: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, is_published: !e.is_published } : e));
  };

  // Admin Home Page Media Management
  const addHomeMedia = (data: Partial<HomeMediaItem>) => {
    let videoEmbed = data.video_embed_url;
    if (data.type === 'video' && data.url) {
      if (data.url.includes('youtube.com/watch?v=')) {
        videoEmbed = data.url.replace('watch?v=', 'embed/');
      } else if (data.url.includes('youtu.be/')) {
        videoEmbed = data.url.replace('youtu.be/', 'youtube.com/embed/');
      } else {
        videoEmbed = data.url;
      }
    }

    const newMedia: HomeMediaItem = {
      id: `med-${Date.now()}`,
      title: data.title || 'Featured Department Media',
      type: data.type || 'image',
      url: data.url || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      video_embed_url: videoEmbed,
      description: data.description || 'Admin featured media item.',
      is_published: true,
      created_at: new Date().toISOString()
    };
    setHomeMedia(prev => [newMedia, ...prev]);
  };

  const deleteHomeMedia = (id: string) => {
    setHomeMedia(prev => prev.filter(m => m.id !== id));
  };

  const togglePublishHomeMedia = (id: string) => {
    setHomeMedia(prev => prev.map(m => m.id === id ? { ...m, is_published: !m.is_published } : m));
  };

  const bookAppointment = (facultyId: string, facultyName: string, date: string, topic: string) => {
    if (!profile) return;
    const apt: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      student_id: profile.user_id,
      student_name: profile.full_name,
      faculty_id: facultyId,
      faculty_name: facultyName,
      appointment_date: date,
      topic,
      status: 'Requested'
    };

    setAppointments(prev => [apt, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const updateApplicationStatus = (appId: string, newStatus: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected') => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole,
      profile,
      studentProfile,
      alumniProfiles,
      jobs,
      internships,
      applications,
      mentorshipRequests,
      events,
      homeMedia,
      notifications,
      appointments,
      isLoading,
      switchRole,
      loginWithSupabase,
      signUpWithSupabase,
      approveAlumni,
      rejectAlumni,
      updateUserProfile,
      logout,
      applyForJob,
      postJob,
      requestMentorship,
      updateMentorshipStatus,
      registerForEvent,
      createEvent,
      editEvent,
      deleteEvent,
      togglePublishEvent,
      addHomeMedia,
      deleteHomeMedia,
      togglePublishHomeMedia,
      bookAppointment,
      markNotificationRead,
      updateApplicationStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
