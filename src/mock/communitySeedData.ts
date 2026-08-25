import { CommunityCategory, CommunityQuestion, CommunityReport } from '../features/community/types/community.types';
import { DEFAULT_STUDENT_PHOTO } from './seedData';

export const INITIAL_CATEGORIES: CommunityCategory[] = [
  { id: 'cat-1', name: 'Career Development', slug: 'career-development', description: 'Guidance on career paths, industry trends, and professional growth.' },
  { id: 'cat-2', name: 'Internship', slug: 'internship', description: 'Finding, applying, and acing university student internships.' },
  { id: 'cat-3', name: 'Job Preparation', slug: 'job-preparation', description: 'Technical & behavioral interview prep, resume screening, and referrals.' },
  { id: 'cat-4', name: 'Programming', slug: 'programming', description: 'Data structures, algorithms, system design, and coding practices.' },
  { id: 'cat-5', name: 'Web Development', slug: 'web-development', description: 'Frontend, backend, React 19, TypeScript, REST APIs, and full-stack stacks.' },
  { id: 'cat-6', name: 'Software Engineering', slug: 'software-engineering', description: 'Architectures, CI/CD, microservices, cloud deployments, and code reviews.' },
  { id: 'cat-7', name: 'Higher Education', slug: 'higher-education', description: 'M.Sc., Ph.D. applications, GRE, SOP writing, and global scholarship advice.' },
  { id: 'cat-8', name: 'Research', slug: 'research', description: 'Undergraduate thesis, IEEE paper publishing, Machine Learning & AI research.' },
  { id: 'cat-9', name: 'CV & Resume', slug: 'cv-resume', description: 'ATS-friendly resume templates, portfolio reviews, and GitHub formatting.' },
  { id: 'cat-10', name: 'Interview Preparation', slug: 'interview-prep', description: 'LeetCode practice, system design rounds, and HR interview strategies.' },
  { id: 'cat-11', name: 'University Life', slug: 'university-life', description: 'CSE course selection, CGPA management, and balancing academics.' },
  { id: 'cat-12', name: 'Projects', slug: 'projects', description: 'Showcasing capstone projects, open-source contributions, and side apps.' },
  { id: 'cat-13', name: 'Networking', slug: 'networking', description: 'Connecting with alumni, tech meetups, and developer communities.' },
  { id: 'cat-14', name: 'Other', slug: 'other', description: 'General discussions, announcements, and university tech events.' },
];

export const INITIAL_QUESTIONS: CommunityQuestion[] = [
  {
    id: 'q-1',
    user_id: 'usr-student-1',
    author_name: 'Shanto Rahman',
    author_role: 'student',
    author_photo: DEFAULT_STUDENT_PHOTO,
    author_department: 'B.Sc. in CSE',
    title: 'How should I structure my preparation for a Software Engineering Internship at a Tier-1 tech company?',
    content: `I am currently in my 6th semester of B.Sc. in CSE at IUB. I have solid foundations in Data Structures & Algorithms, React 19, and Supabase backend architecture. 

I am targeting summer 2026 software engineering internships. What specific milestones, LeetCode topics, and project highlights do senior alumni recommend focusing on during application season?`,
    category_id: 'cat-2',
    category_name: 'Internship',
    tags: ['internship', 'career', 'leetcode', 'react', 'cse'],
    target_audience: 'Everyone',
    status: 'active',
    view_count: 142,
    upvote_count: 18,
    answer_count: 2,
    accepted_answer_id: 'ans-101',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    answers: [
      {
        id: 'ans-101',
        question_id: 'q-1',
        user_id: 'usr-alumni-1',
        author_name: 'Ahmed Hasan',
        author_role: 'alumni',
        author_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        author_department: 'Staff Engineer at Google (CSE Class of 2019)',
        content: `Great goal Shanto! Here is the exact 3-part formula we evaluate candidates on:

1. **Algorithmic Mastery**: Focus on Two Pointers, Sliding Window, Graphs (BFS/DFS), and Dynamic Programming. Aim for ~150 solved problems with clean code.
2. **Production-Grade Project**: Your full-stack React 19 + Supabase project is already a great showcase. Make sure you highlight real-time subscriptions, optimistic UI updates, and clean database schema indexing.
3. **Behavioral STAR Format**: Prepare 3 stories demonstrating leadership, debugging under pressure, and cross-functional team collaboration.

Feel free to request a 1-on-1 mentorship session with me on AlumniConnect if you'd like a live mock interview!`,
        is_accepted: true,
        status: 'active',
        upvote_count: 14,
        reply_count: 1,
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        replies: [
          {
            id: 'rep-201',
            answer_id: 'ans-101',
            user_id: 'usr-student-1',
            author_name: 'Shanto Rahman',
            author_role: 'student',
            author_photo: DEFAULT_STUDENT_PHOTO,
            content: 'Thank you so much Ahmed bhai! This roadmap is incredibly helpful. I will book a mentorship session for mock code review next week.',
            status: 'active',
            created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
            updated_at: new Date(Date.now() - 3600000 * 3).toISOString()
          }
        ]
      },
      {
        id: 'ans-102',
        question_id: 'q-1',
        user_id: 'usr-alumni-2',
        author_name: 'Nusrat Jahan',
        author_role: 'alumni',
        author_photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        author_department: 'Lead Architect at Microsoft (CSE Class of 2018)',
        content: 'I also recommend keeping your GitHub clean and adding detailed README documentation with architecture diagrams. Recruiters inspect pinned repositories!',
        is_accepted: false,
        status: 'active',
        upvote_count: 8,
        reply_count: 0,
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        replies: []
      }
    ]
  },
  {
    id: 'q-2',
    user_id: 'usr-student-2',
    author_name: 'Tariq Islam',
    author_role: 'student',
    author_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    author_department: 'B.Sc. in CSE (2027)',
    title: 'What are the best practices for setting up Supabase Row Level Security (RLS) in multi-role applications?',
    content: `We are building a web application with Student, Alumni, and Admin roles. We want to ensure students can only modify their own profile data, while admins have full moderation power across all tables.

How should we structure RLS policies in PostgreSQL efficiently without breaking performance?`,
    category_id: 'cat-5',
    category_name: 'Web Development',
    tags: ['supabase', 'postgresql', 'rls', 'security', 'database'],
    target_audience: 'Everyone',
    status: 'active',
    view_count: 88,
    upvote_count: 11,
    answer_count: 1,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    answers: [
      {
        id: 'ans-103',
        question_id: 'q-2',
        user_id: 'usr-alumni-3',
        author_name: 'Tanvir Rahman',
        author_role: 'alumni',
        author_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        author_department: 'Backend Tech Lead at Databricks (CSE Class of 2017)',
        content: `Always check \`auth.uid() = user_id\` for row-level owner edits. For Admin checks, define a helper function like \`is_admin()\`, or pass app metadata in custom JWT claims to prevent subquery overhead on every select query!`,
        is_accepted: false,
        status: 'active',
        upvote_count: 6,
        reply_count: 0,
        created_at: new Date(Date.now() - 3600000 * 10).toISOString(),
        updated_at: new Date(Date.now() - 3600000 * 10).toISOString(),
        replies: []
      }
    ]
  },
  {
    id: 'q-3',
    user_id: 'usr-student-1',
    author_name: 'Shanto Rahman',
    author_role: 'student',
    author_photo: DEFAULT_STUDENT_PHOTO,
    author_department: 'B.Sc. in CSE',
    title: 'Which AI and Cloud certifications carry the most weight for graduating CSE students?',
    content: `Looking ahead to graduation in 2026. Is AWS Certified Solutions Architect or Google Cloud Associate Engineer more valuable for junior software development roles?`,
    category_id: 'cat-1',
    category_name: 'Career Development',
    tags: ['aws', 'cloud', 'certifications', 'career', 'gcp'],
    target_audience: 'Everyone',
    status: 'active',
    view_count: 65,
    upvote_count: 7,
    answer_count: 0,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    answers: []
  }
];

export const INITIAL_REPORTS: CommunityReport[] = [];
