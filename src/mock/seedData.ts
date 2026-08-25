import { 
  User, Profile, StudentProfile, AlumniProfile, EmployerProfile, 
  Job, Internship, JobApplication, MentorshipRequest, EventItem, NotificationItem, 
  Appointment, Department, CountryStat, SystemReport, HomeMediaItem 
} from '../types/database.types';

export const INITIAL_USERS: User[] = [];

export const INITIAL_PROFILES: Record<string, any> = {
  student: {
    id: 'prof-std-1',
    user_id: 'usr-student-1',
    role: 'student',
    full_name: 'Shanto Rahman',
    first_name: 'Shanto',
    last_name: 'Rahman',
    username: 'shshantoo',
    headline: 'Senior CSE Undergraduate & Full-Stack Engineer',
    email: 'shanto.student@iub.edu.bd',
    phone: '+880 1700-123456',
    country: 'Bangladesh',
    location: 'Dhaka',
    university: 'Independent University, Bangladesh (IUB)',
    student_id: '1910123',
    school: 'SETS',
    department: 'CSE',
    program_degree: 'B.Sc. in Computer Science & Engineering',
    batch_year: '2026',
    cgpa: '3.88',
    verification_status: 'verified',
    account_status: 'active',
    professional_summary: 'Ambitious B.Sc. in CSE senior specializing in React 19, TypeScript, Supabase cloud architecture, and MapLibre GL spatial analytics. Seeking high-impact software engineering roles.',
    skills_categorized: [
      { id: 'skl-1', name: 'TypeScript / JavaScript', category: 'Technical', level: 'Expert' },
      { id: 'skl-2', name: 'React 19 & Vite', category: 'Technical', level: 'Advanced' },
      { id: 'skl-3', name: 'Supabase & PostgreSQL', category: 'Technical', level: 'Advanced' },
      { id: 'skl-4', name: 'Node.js & Express', category: 'Technical', level: 'Intermediate' }
    ],
    experiences: [
      {
        id: 'exp-1',
        title: 'Full-Stack Engineering Intern',
        company: 'Brain Station 23',
        location: 'Dhaka, Bangladesh',
        start_date: '2025-06',
        end_date: '2025-12',
        is_current: false,
        description: 'Developed scalable microservices using Node.js and built responsive web client interfaces.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.Sc. in Computer Science & Engineering',
        institution: 'Independent University, Bangladesh (IUB)',
        field_of_study: 'CSE',
        start_year: '2022',
        end_year: '2026',
        grade_cgpa: '3.88 / 4.00'
      }
    ],
    projects: [
      {
        id: 'prj-1',
        title: 'AlumniConnect Management Platform',
        description: 'University alumni networking, ATS CV builder, spatial alumni tracking map, and employer portal.',
        technologies: ['React 19', 'TypeScript', 'Supabase', 'MapLibre GL', 'TailwindCSS'],
        project_url: 'https://github.com/shshantoo/AlumniConnect'
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  alumni: {
    id: 'prof-alm-1',
    user_id: 'usr-alumni-1',
    role: 'alumni',
    full_name: 'Sarah Jenkins',
    first_name: 'Sarah',
    last_name: 'Jenkins',
    username: 'sarah.j',
    headline: 'Staff Software Engineer @ Google Cloud',
    email: 'sarah.jenkins@google.com',
    phone: '+1 415-555-0199',
    country: 'United States',
    location: 'San Francisco, CA',
    school: 'SETS',
    department: 'CSE',
    graduation_year: '2019',
    convocation_number: '21st Convocation',
    current_company: 'Google',
    current_position: 'Staff Software Engineer',
    verification_status: 'verified',
    account_status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  employer: {
    id: 'prof-emp-1',
    user_id: 'usr-employer-1',
    role: 'employer',
    full_name: 'Stripe University Recruiting',
    first_name: 'Stripe',
    last_name: 'Recruiting',
    username: 'stripe_careers',
    headline: 'Global Talent Acquisition Lead @ Stripe',
    email: 'recruiting@stripe.com',
    country: 'United States',
    location: 'San Francisco, CA',
    company_name: 'Stripe',
    verification_status: 'verified',
    account_status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  admin: {
    id: 'prof-adm-1',
    user_id: 'usr-admin-1',
    role: 'admin',
    full_name: 'Department Administrator',
    first_name: 'CSE',
    last_name: 'Admin',
    username: 'admin',
    headline: 'Institutional Governance & Alumni Portal Administrator',
    email: 'admin.cse@iub.edu.bd',
    country: 'Bangladesh',
    location: 'Dhaka',
    school: 'SETS',
    department: 'CSE',
    verification_status: 'verified',
    account_status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'std-1',
  user_id: 'usr-student-1',
  student_id: '1910123',
  school: 'SETS',
  department: 'CSE',
  year_of_study: 4,
  expected_graduation: '2026-06-30',
  cgpa: 3.88,
  skills: ['React 19', 'TypeScript', 'Supabase', 'MapLibre GL', 'TailwindCSS'],
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
    experience: '6+ Years Distributed Systems',
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
  },
  {
    id: 'alm-3',
    user_id: 'usr-alumni-3',
    name: 'Tariq Hasan',
    company: 'Stripe',
    position: 'Senior Full-Stack Engineer',
    graduation_year: 2021,
    experience: '4+ Years Web & Fintech',
    country: 'Bangladesh',
    city: 'Dhaka',
    email: 'tariq.hasan@stripe.com',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    mentor: true
  },
  {
    id: 'alm-4',
    user_id: 'usr-alumni-4',
    name: 'Elena Rostova',
    company: 'OpenAI Partner',
    position: 'Lead AI Systems Engineer',
    graduation_year: 2018,
    experience: '7+ Years Machine Learning',
    country: 'Germany',
    city: 'Berlin',
    email: 'elena@openai.com',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    mentor: true
  },
  {
    id: 'alm-5',
    user_id: 'usr-alumni-5',
    name: 'Tanvir Ahmed',
    company: 'Meta',
    position: 'Engineering Manager',
    graduation_year: 2016,
    experience: '9+ Years Tech Leadership',
    country: 'United Kingdom',
    city: 'London',
    email: 'tanvir@meta.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    mentor: true
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer (React 19 + TypeScript)',
    company: 'Stripe',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-Time',
    salary: '$140,000 - $180,000 / yr',
    description: 'Lead frontend engineering teams building scalable global financial tools using React 19 and cloud microservices.',
    created_at: new Date().toISOString(),
    is_published: true
  },
  {
    id: 'job-2',
    title: 'AI Systems & Data Engineer',
    company: 'OpenAI Enterprise Partner',
    location: 'Remote',
    type: 'Remote',
    salary: '$130,000 - $160,000 / yr',
    description: 'Build high-throughput LLM streaming pipelines and vector database integrations.',
    created_at: new Date().toISOString(),
    is_published: true
  },
  {
    id: 'job-3',
    title: 'Cloud DevSecOps Specialist',
    company: 'Brain Station 23',
    location: 'Dhaka, Bangladesh',
    type: 'Full-Time',
    salary: '৳120,000 - ৳150,000 / mo',
    description: 'Manage AWS cloud Kubernetes clusters, CI/CD pipelines, and secure production deployments.',
    created_at: new Date().toISOString(),
    is_published: true
  },
  {
    id: 'job-4',
    title: 'Frontend Web Engineering Intern',
    company: 'Pathao Tech',
    location: 'Dhaka, Bangladesh',
    type: 'Internship',
    salary: '৳35,000 / mo',
    description: 'Collaborate with senior software engineers building high-performance customer mobile web apps.',
    created_at: new Date().toISOString(),
    is_published: true
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [];
export const INITIAL_APPLICATIONS: JobApplication[] = [];
export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Global CSE Alumni Tech Summit 2026',
    description: 'Keynote speeches on AI agents, cloud native architectures, and global software engineering career roadmaps.',
    event_date: '2026-09-15T18:00',
    location: 'Auditorium A & Zoom Webcast',
    category: 'Reunion',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    is_registered: false,
    registered_count: 142,
    is_published: true
  },
  {
    id: 'evt-2',
    title: 'Full-Stack React 19 & System Design Workshop',
    description: 'Hands-on live coding workshop building modern web applications with Vite, Supabase, and TypeScript.',
    event_date: '2026-09-22T15:00',
    location: 'CSE Computer Lab 3 & Online Stream',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    is_registered: true,
    registered_count: 88,
    is_published: true
  },
  {
    id: 'evt-3',
    title: 'Annual CSE Hackathon & AI Agent Innovation Challenge',
    description: '24-hour hackathon competing for ৳200,000 in prizes with direct mentorship from alumni leads.',
    event_date: '2026-10-05T09:00',
    location: 'IUB Central Plaza & SETS Building',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    is_registered: false,
    registered_count: 210,
    is_published: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
export const INITIAL_APPOINTMENTS: Appointment[] = [];
export const INITIAL_SYSTEM_REPORTS: SystemReport[] = [];
