import { 
  User, Profile, StudentProfile, AlumniProfile, EmployerProfile, FacultyProfile, 
  Job, Internship, JobApplication, MentorshipRequest, EventItem, NotificationItem, 
  Appointment, Department, CountryStat, SystemReport 
} from '../types/database.types';

// Clean initial state without pre-populated dummy profile data
export const INITIAL_USERS: User[] = [];
export const INITIAL_PROFILES: Record<string, Profile> = {};
export const INITIAL_STUDENT_PROFILE: StudentProfile | null = null;
export const INITIAL_ALUMNI_PROFILES: (AlumniProfile & { name: string; email: string; photo: string })[] = [];
export const INITIAL_JOBS: Job[] = [];
export const INITIAL_INTERNSHIPS: Internship[] = [];
export const INITIAL_APPLICATIONS: JobApplication[] = [];
export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [];
export const INITIAL_EVENTS: EventItem[] = [];
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_APPOINTMENTS: Appointment[] = [];
export const INITIAL_SYSTEM_REPORTS: SystemReport[] = [];
