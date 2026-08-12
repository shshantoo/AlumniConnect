import { 
  User, Profile, StudentProfile, AlumniProfile, EmployerProfile, FacultyProfile, 
  Job, Internship, JobApplication, MentorshipRequest, EventItem, NotificationItem, 
  Appointment, Department, CountryStat, SystemReport 
} from '../types/database.types';

export const INITIAL_USERS: User[] = [];
export const INITIAL_PROFILES: Record<string, Profile> = {
  student: {
    id: 'prof-std-1',
    user_id: 'usr-student-1',
    role: 'student',
    full_name: 'Shanto Rahman',
    first_name: 'Shanto',
    last_name: 'Rahman',
    username: 'shshantoo',
    headline: 'Senior CSE Undergraduate & Full-Stack Developer',
    email: 'shanto.student@univ.edu',
    phone: '+880 1700-123456',
    country: 'Bangladesh',
    location: 'Dhaka',
    university: 'University of Engineering & Technology',
    student_id: 'CSE-2026-08',
    department: 'Computer Science & Engineering',
    program_degree: 'B.Sc. in Computer Science & Engineering',
    batch_year: '2026',
    cgpa: '3.88',
    professional_summary: 'Dedicated CSE senior specializing in React 19, TypeScript, Supabase cloud architecture, and MapLibre GL spatial analytics.',
    skills_categorized: [
      { id: 'skl-1', name: 'TypeScript / JavaScript', category: 'Technical', level: 'Expert' },
      { id: 'skl-2', name: 'React 19 & Vite', category: 'Technical', level: 'Advanced' },
      { id: 'skl-3', name: 'Supabase & PostgreSQL', category: 'Technical', level: 'Advanced' }
    ],
    alumni_preferences: {
      can_help_with: ['Technical Mentoring', 'Code Reviews'],
      looking_for: ['Job Opportunities', 'Alumni Mentors']
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  } as any
};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'std-1',
  user_id: 'usr-student-1',
  student_id: 'CSE-2026-08',
  school: 'School of Computer Science & Engineering',
  department: 'CSE',
  year_of_study: 4,
  expected_graduation: '2026-06-30',
  cgpa: 3.88,
  skills: ['React 19', 'TypeScript', 'Supabase', 'MapLibre GL'],
  batch: 2026
};

export const INITIAL_ALUMNI_PROFILES: (AlumniProfile & { name: string; email: string; photo: string })[] = [
  {
    id: 'alm-1',
    user_id: 'usr-alumni-1',
    name: 'Sarah Jenkins',
    company: 'Google',
    position: 'Staff Software Engineer',
    graduation_year: 2019,
    experience: '6+ Years in Distributed Systems',
    country: 'United States',
    city: 'San Francisco, CA',
    email: 'sarah.j@google.com',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    mentor: true
  },
  {
    id: 'alm-2',
    user_id: 'usr-alumni-2',
    name: 'Marcus Chen',
    company: 'Amazon AWS',
    position: 'Principal Cloud Architect',
    graduation_year: 2017,
    experience: '8+ Years Cloud Infra',
    country: 'United States',
    city: 'Seattle, WA',
    email: 'marcus.aws@amazon.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    mentor: true
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer (React + Cloud)',
    company: 'Stripe',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-Time',
    salary: '$140,000 - $180,000 / yr',
    description: 'Lead frontend engineering teams building scalable global financial tools using React 19 and cloud microservices.',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-2',
    title: 'AI Systems & Data Engineer',
    company: 'OpenAI Enterprise Partner',
    location: 'Remote',
    type: 'Remote',
    salary: '$130,000 - $160,000 / yr',
    description: 'Build high-throughput LLM streaming pipelines and vector database integrations.',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [];
export const INITIAL_APPLICATIONS: JobApplication[] = [];
export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [];
export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Global CSE Alumni Tech Summit 2026',
    description: 'Keynote speeches on AI agents, cloud native architectures, and tech career roadmaps.',
    event_date: '2026-09-15T18:00',
    location: 'Auditorium A & Zoom Webcast',
    category: 'Reunion',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    is_registered: false,
    registered_count: 142
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_APPOINTMENTS: Appointment[] = [];
export const INITIAL_SYSTEM_REPORTS: SystemReport[] = [];
