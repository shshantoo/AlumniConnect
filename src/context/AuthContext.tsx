import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { 
  UserRole, UserProfile, StudentProfile, AlumniProfile,
  JobListing, ApplicationRecord, MentorshipRequestRecord, 
  EventRecord, NotificationRecord, AppointmentRecord 
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
  }) => Promise<boolean>;
  updateUserProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
  applyForJob: (jobId: string, coverLetter: string, isInternship?: boolean) => void;
  postJob: (newJob: Partial<JobListing>) => void;
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
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string } | null>({
    id: 'usr-student-1',
    email: 'shanto.student@univ.edu'
  });
  const [profile, setProfile] = useState<UserProfile | null>(INITIAL_PROFILES['student'] as UserProfile);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(INITIAL_STUDENT_PROFILE);
  const [alumniProfiles, setAlumniProfiles] = useState<(AlumniProfile & { name: string; email: string; photo: string })[]>(INITIAL_ALUMNI_PROFILES);
  
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [internships, setInternships] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>(INITIAL_APPLICATIONS);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequestRecord[]>(INITIAL_MENTORSHIP_REQUESTS);
  const [events, setEvents] = useState<EventRecord[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<NotificationRecord[]>(INITIAL_NOTIFICATIONS);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(INITIAL_APPOINTMENTS);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Persona Role Switcher
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    const mockProf = INITIAL_PROFILES[role] as UserProfile;
    setProfile(mockProf);
    setCurrentUser({
      id: `usr-${role}-1`,
      email: mockProf?.email || `${role}@univ.edu`
    });
  };

  // Login by Username or Email
  const loginWithSupabase = async (identifier: string, role: UserRole = 'student'): Promise<boolean> => {
    setIsLoading(true);
    try {
      setCurrentRole(role);
      const mockProf = INITIAL_PROFILES[role] as UserProfile;
      const effectiveEmail = identifier.includes('@') ? identifier : `${identifier}@univ.edu`;
      const updatedProf = {
        ...mockProf,
        email: effectiveEmail,
        username: identifier.includes('@') ? identifier.split('@')[0] : identifier
      };
      setProfile(updatedProf);
      setCurrentUser({
        id: `usr-${role}-${Date.now()}`,
        email: effectiveEmail
      });
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
  }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUserId = `usr-${data.role}-${Date.now()}`;
      const fullName = `${data.firstName} ${data.lastName}`.trim();

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
        bio: `CSE ${data.role} profile created on AlumniConnect.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setCurrentRole(data.role);
      setCurrentUser({ id: newUserId, email: data.email });
      setProfile(newProfile);

      setIsLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return false;
    }
  };

  // Update Profile Data
  const updateUserProfile = (updatedData: Partial<UserProfile>) => {
    setProfile(prev => (prev ? { ...prev, ...updatedData } : (updatedData as UserProfile)));
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
      notifications,
      appointments,
      isLoading,
      switchRole,
      loginWithSupabase,
      signUpWithSupabase,
      updateUserProfile,
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
