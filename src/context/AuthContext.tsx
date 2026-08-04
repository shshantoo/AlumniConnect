import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { 
  User, UserRole, Profile, StudentProfile, AlumniProfile, EmployerProfile, FacultyProfile,
  Job, Internship, JobApplication, MentorshipRequest, EventItem, NotificationItem, Appointment 
} from '../types/database.types';
import { 
  INITIAL_USERS, INITIAL_PROFILES, INITIAL_STUDENT_PROFILE, INITIAL_ALUMNI_PROFILES, 
  INITIAL_JOBS, INITIAL_INTERNSHIPS, INITIAL_APPLICATIONS, INITIAL_MENTORSHIP_REQUESTS, 
  INITIAL_EVENTS, INITIAL_NOTIFICATIONS, INITIAL_APPOINTMENTS 
} from '../mock/seedData';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole;
  profile: Profile | null;
  studentProfile: StudentProfile | null;
  alumniProfiles: (AlumniProfile & { name: string; email: string; photo: string })[];
  jobs: Job[];
  internships: Internship[];
  applications: JobApplication[];
  mentorshipRequests: MentorshipRequest[];
  events: EventItem[];
  notifications: NotificationItem[];
  appointments: Appointment[];
  isLoading: boolean;
  switchRole: (role: UserRole) => void;
  loginWithSupabase: (email: string, role?: UserRole) => Promise<boolean>;
  signUpWithSupabase: (email: string, password: string, role: UserRole, fullName: string) => Promise<boolean>;
  logout: () => void;
  applyForJob: (jobId: string, coverLetter: string, isInternship?: boolean) => void;
  postJob: (newJob: Partial<Job>) => void;
  requestMentorship: (mentorId: string, mentorName: string, mentorCompany: string, topic: string, message: string) => void;
  updateMentorshipStatus: (requestId: string, status: 'Accepted' | 'Rejected') => void;
  registerForEvent: (eventId: string) => void;
  bookAppointment: (facultyId: string, facultyName: string, date: string, topic: string) => void;
  markNotificationRead: (id: string) => void;
  updateApplicationStatus: (appId: string, newStatus: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [alumniProfiles, setAlumniProfiles] = useState<(AlumniProfile & { name: string; email: string; photo: string })[]>([]);
  
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [internships, setInternships] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(INITIAL_MENTORSHIP_REQUESTS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize Supabase Auth Session listener
  useEffect(() => {
    async function checkSupabaseSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userObj: User = {
            id: session.user.id,
            email: session.user.email || 'user@univ.edu',
            role: (session.user.user_metadata?.role as UserRole) || 'student',
            created_at: session.user.created_at
          };
          setCurrentUser(userObj);
          setCurrentRole(userObj.role);
        }
      } catch (err) {
        console.warn('Supabase session fallback initialized with local seed state', err);
      }
    }
    checkSupabaseSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const role = (session.user.user_metadata?.role as UserRole) || 'student';
        setCurrentUser({
          id: session.user.id,
          email: session.user.email || '',
          role: role,
          created_at: session.user.created_at
        });
        setCurrentRole(role);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Quick Role Switching for Review / Testing Demo Mode
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const targetUser = INITIAL_USERS.find(u => u.role === role) || {
      id: `usr-${role}-demo`,
      email: `${role}.demo@univ.edu`,
      role: role,
      created_at: new Date().toISOString()
    };
    setCurrentUser(targetUser);
    setProfile(INITIAL_PROFILES[targetUser.id] || {
      id: `prof-${role}`,
      user_id: targetUser.id,
      full_name: `${role.toUpperCase()} Demo User`,
      bio: `Active user operating under ${role.toUpperCase()} role context.`,
      created_at: new Date().toISOString()
    });
  };

  const loginWithSupabase = async (email: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Demo match check
      const demoUser = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (demoUser) {
        switchRole(demoUser.role);
        setIsLoading(false);
        return true;
      }
      
      const selectedRole = role || 'student';
      switchRole(selectedRole);
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const signUpWithSupabase = async (email: string, _password: string, role: UserRole, fullName: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: `usr-${Date.now()}`,
        email,
        role,
        created_at: new Date().toISOString()
      };
      setCurrentUser(newUser);
      setCurrentRole(role);
      setProfile({
        id: `prof-${Date.now()}`,
        user_id: newUser.id,
        full_name: fullName,
        bio: `Newly registered ${role} account.`,
        created_at: new Date().toISOString()
      });
      setIsLoading(false);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setCurrentUser(null);
    setProfile(null);
  };

  const applyForJob = (jobId: string, coverLetter: string, isInternship: boolean = false) => {
    const jobItem = jobs.find(j => j.id === jobId) || internships.find(i => i.id === jobId);
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      student_id: currentUser?.id || 'usr-student-1',
      student_name: profile?.full_name || 'Shanto Rahman',
      job_id: jobId,
      job_title: jobItem?.title || (isInternship ? 'Internship Position' : 'Software Position'),
      company_name: jobItem?.company || 'Tech Partner',
      status: 'Pending',
      resume: studentProfile?.resume || 'https://alumniconnect.edu/resumes/my-resume.pdf',
      cover_letter: coverLetter,
      created_at: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);

    // Add Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: currentUser?.id || 'usr-student-1',
      title: 'Application Submitted!',
      message: `Your application for "${newApp.job_title}" at ${newApp.company_name} was successfully submitted.`,
      type: 'success',
      is_read: false,
      created_at: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const postJob = (newJobData: Partial<Job>) => {
    const createdJob: Job = {
      id: `job-${Date.now()}`,
      title: newJobData.title || 'Software Engineer',
      description: newJobData.description || 'Dynamic position at top technology enterprise.',
      salary: newJobData.salary || '$120,000 / yr',
      company: newJobData.company || profile?.full_name || 'Innovate AI',
      location: newJobData.location || 'Remote',
      deadline: newJobData.deadline || '2026-12-31',
      type: newJobData.type || 'Full-Time',
      posted_by: currentUser?.id,
      status: 'active',
      created_at: new Date().toISOString(),
      tags: newJobData.tags || ['Tech', 'Engineering']
    };
    setJobs(prev => [createdJob, ...prev]);
  };

  const requestMentorship = (mentorId: string, mentorName: string, mentorCompany: string, topic: string, message: string) => {
    const newReq: MentorshipRequest = {
      id: `ment-${Date.now()}`,
      student_id: currentUser?.id || 'usr-student-1',
      student_name: profile?.full_name || 'Shanto Rahman',
      mentor_id: mentorId,
      mentor_name: mentorName,
      mentor_company: mentorCompany,
      status: 'Pending',
      topic,
      message,
      created_at: new Date().toISOString()
    };
    setMentorshipRequests(prev => [newReq, ...prev]);
  };

  const updateMentorshipStatus = (requestId: string, status: 'Accepted' | 'Rejected') => {
    setMentorshipRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
  };

  const registerForEvent = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const isRegistered = !ev.is_registered;
        return {
          ...ev,
          is_registered: isRegistered,
          registered_count: (ev.registered_count || 0) + (isRegistered ? 1 : -1)
        };
      }
      return ev;
    }));
  };

  const bookAppointment = (facultyId: string, facultyName: string, date: string, topic: string) => {
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      student_id: currentUser?.id || 'usr-student-1',
      student_name: profile?.full_name || 'Student User',
      faculty_id: facultyId,
      faculty_name: facultyName,
      appointment_date: date,
      topic,
      status: 'Scheduled',
      created_at: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);
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
      notifications,
      appointments,
      isLoading,
      switchRole,
      loginWithSupabase,
      signUpWithSupabase,
      logout,
      applyForJob,
      postJob,
      requestMentorship,
      updateMentorshipStatus,
      registerForEvent,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
