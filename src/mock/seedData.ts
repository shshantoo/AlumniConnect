import { 
  User, Profile, StudentProfile, AlumniProfile, EmployerProfile, FacultyProfile, 
  Job, Internship, JobApplication, MentorshipRequest, EventItem, NotificationItem, 
  Appointment, Department, CountryStat, SystemReport 
} from '../types/database.types';

export const INITIAL_USERS: User[] = [];
export const INITIAL_PROFILES: Record<string, Profile> = {};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: '',
  user_id: '',
  student_id: '',
  school: 'School of Computer Science & Engineering',
  department: 'CSE',
  batch: '',
  cgpa: 0,
  resume: '',
  skills: [],
  created_at: new Date().toISOString()
};

export const INITIAL_ALUMNI_PROFILES: (AlumniProfile & { name: string; email: string; photo: string })[] = [];
export const INITIAL_JOBS: Job[] = [];
export const INITIAL_INTERNSHIPS: Internship[] = [];
export const INITIAL_APPLICATIONS: JobApplication[] = [];
export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [];
export const INITIAL_EVENTS: EventItem[] = [];
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_APPOINTMENTS: Appointment[] = [];
export const INITIAL_COUNTRY_STATS: CountryStat[] = [];
export const INITIAL_SYSTEM_REPORTS: SystemReport[] = [];
