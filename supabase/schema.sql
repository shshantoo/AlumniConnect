-- =========================================================
-- AlumniConnect Database Schema (PostgreSQL for Supabase)
-- Upgraded 18-Section Profiles, Username Auth & Storage Buckets
-- =========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Supports Login with Email or Username)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    iub_email VARCHAR(255) UNIQUE,
    iub_id VARCHAR(20) UNIQUE,
    username VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    mobile VARCHAR(50),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'alumni', 'employer', 'faculty', 'admin')),
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    account_status VARCHAR(50) DEFAULT 'active' CHECK (account_status IN ('active', 'pending', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROFILES TABLE (Full 18-Section CV & Alumni Data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    iub_id VARCHAR(20),
    iub_email VARCHAR(255),
    school VARCHAR(255) DEFAULT 'SETS',
    convocation_number VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'pending',
    account_status VARCHAR(50) DEFAULT 'active',
    username VARCHAR(100),
    preferred_name VARCHAR(100),
    headline VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    country VARCHAR(100) DEFAULT 'Bangladesh',
    location VARCHAR(100) DEFAULT 'Dhaka',
    dob DATE,
    gender VARCHAR(30),
    nationality VARCHAR(100),
    photo VARCHAR(1000),
    bio TEXT,
    linkedin VARCHAR(255),
    portfolio VARCHAR(255),
    github VARCHAR(255),
    social_links JSONB DEFAULT '{}'::jsonb,

    -- University & Alumni Info
    university VARCHAR(255) DEFAULT 'University of Engineering & Technology',
    student_id VARCHAR(50),
    department VARCHAR(100) DEFAULT 'Computer Science & Engineering',
    program_degree VARCHAR(255) DEFAULT 'B.Sc. in Computer Science & Engineering',
    major_minor VARCHAR(255),
    batch_year VARCHAR(20),
    enrollment_year VARCHAR(20),
    graduation_date DATE,
    cgpa NUMERIC(3,2),
    academic_achievements TEXT[],
    university_clubs TEXT[],
    club_positions TEXT[],
    thesis_project TEXT,
    thesis_supervisor VARCHAR(255),

    -- Professional Summary
    career_objective TEXT,
    professional_summary TEXT,
    areas_of_expertise TEXT[],
    career_interests TEXT[],

    -- Rich 18-Section Collections (Stored as JSONB)
    education_history JSONB DEFAULT '[]'::jsonb,
    work_experience JSONB DEFAULT '[]'::jsonb,
    skills_categorized JSONB DEFAULT '[]'::jsonb,
    projects_list JSONB DEFAULT '[]'::jsonb,
    certifications_list JSONB DEFAULT '[]'::jsonb,
    workshops_list JSONB DEFAULT '[]'::jsonb,
    awards_list JSONB DEFAULT '[]'::jsonb,
    publications_list JSONB DEFAULT '[]'::jsonb,
    extracurriculars_list JSONB DEFAULT '[]'::jsonb,
    volunteer_list JSONB DEFAULT '[]'::jsonb,
    leadership_list JSONB DEFAULT '[]'::jsonb,
    languages_list JSONB DEFAULT '[]'::jsonb,
    interests_tags TEXT[],
    references_list JSONB DEFAULT '[]'::jsonb,

    -- Alumni Networking Preferences
    alumni_preferences JSONB DEFAULT '{}'::jsonb,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    school VARCHAR(255) DEFAULT 'School of Computer Science & Engineering',
    department VARCHAR(100) DEFAULT 'CSE',
    batch VARCHAR(20) NOT NULL,
    cgpa NUMERIC(3,2),
    resume VARCHAR(500),
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ALUMNI TABLE
CREATE TABLE IF NOT EXISTS public.alumni (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    graduation_year INT NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    country VARCHAR(100) DEFAULT 'Bangladesh',
    city VARCHAR(100) DEFAULT 'Dhaka',
    experience VARCHAR(50),
    mentor BOOLEAN DEFAULT false,
    visibility VARCHAR(20) DEFAULT 'public',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. EMPLOYERS TABLE
CREATE TABLE IF NOT EXISTS public.employers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    logo VARCHAR(500),
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. FACULTY TABLE
CREATE TABLE IF NOT EXISTS public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) DEFAULT 'CSE',
    office_hours VARCHAR(255),
    research_areas TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. JOBS & INTERNSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Full-Time', 'Part-Time', 'Remote', 'Internship')),
    salary VARCHAR(100),
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    cover_letter TEXT,
    resume_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Shortlisted', 'Accepted', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. MENTORSHIP REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. EVENTS & WEBINARS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Reunion', 'Workshop', 'Hackathon', 'Webinar')),
    image VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. EVENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- 12. FACULTY APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    topic VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Requested' CHECK (status IN ('Requested', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access to Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users Can Update Own Profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Public Read Access to Jobs" ON public.jobs FOR SELECT USING (true);

-- Enable Supabase Storage Bucket for Profile Pictures & CV Files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Storage Read Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'profile-pictures');

CREATE POLICY "Authenticated User Storage Insert" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'profile-pictures');

-- =========================================================
-- CAREER INTELLIGENCE & SMART MENTOR MATCHING TABLES
-- =========================================================

-- 14. SKILLS LIBRARY
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. CAREER PATHS
CREATE TABLE IF NOT EXISTS public.career_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Engineering',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. CAREER SKILL WEIGHTS & REQUIREMENTS
CREATE TABLE IF NOT EXISTS public.career_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    importance_weight INTEGER DEFAULT 8 CHECK (importance_weight BETWEEN 1 AND 10),
    required_level VARCHAR(50) DEFAULT 'Intermediate',
    UNIQUE(career_path_id, skill_id)
);

-- 17. USER SKILL PROFICIENCY
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    proficiency_level VARCHAR(50) NOT NULL CHECK (proficiency_level IN ('Not Learned', 'Beginner', 'Intermediate', 'Advanced', 'Expert')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, skill_id)
);

-- 18. CAREER GOALS
CREATE TABLE IF NOT EXISTS public.career_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE,
    target_date DATE,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 19. CAREER ASSESSMENTS & READINESS SCORES
CREATE TABLE IF NOT EXISTS public.career_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE,
    readiness_score NUMERIC(5,2) NOT NULL,
    assessment_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. ROADMAP STEPS & TEMPLATES
CREATE TABLE IF NOT EXISTS public.roadmap_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    phase_number INTEGER DEFAULT 1,
    step_order INTEGER DEFAULT 1,
    skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL
);

-- 21. STUDENT ROADMAP PROGRESS
CREATE TABLE IF NOT EXISTS public.student_roadmap_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    roadmap_step_id UUID REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, roadmap_step_id)
);

-- 22. MENTOR PREFERENCES (ALUMNI)
CREATE TABLE IF NOT EXISTS public.mentor_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alumni_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    career_path_id UUID REFERENCES public.career_paths(id),
    industry VARCHAR(100),
    max_mentees INTEGER DEFAULT 3,
    availability TEXT[],
    meeting_type VARCHAR(50) DEFAULT 'Online',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 23. MENTOR MATCHES
CREATE TABLE IF NOT EXISTS public.mentor_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    alumni_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_score NUMERIC(5,2),
    career_score NUMERIC(5,2),
    industry_score NUMERIC(5,2),
    availability_score NUMERIC(5,2),
    location_score NUMERIC(5,2),
    final_score NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, alumni_id)
);

-- 24. CVS TABLE
CREATE TABLE IF NOT EXISTS public.cvs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'Software Engineer CV',
    template VARCHAR(100) DEFAULT 'modern',
    target_career VARCHAR(150) DEFAULT 'Frontend Developer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 25. CV AI REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.cv_ai_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL,
    analysis_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 26. CV AI SUGGESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.cv_ai_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES public.cv_ai_reviews(id) ON DELETE CASCADE,
    section VARCHAR(100) NOT NULL,
    issue TEXT NOT NULL,
    reason TEXT NOT NULL,
    original_text TEXT,
    suggested_text TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 27. COMMUNITY CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.community_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 28. COMMUNITY QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.community_questions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    author_name VARCHAR(255),
    author_role VARCHAR(50),
    author_photo TEXT,
    author_department VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    category_id UUID REFERENCES public.community_categories(id) ON DELETE SET NULL,
    target_audience VARCHAR(50) DEFAULT 'Everyone',
    status VARCHAR(50) DEFAULT 'active',
    view_count INTEGER DEFAULT 0,
    upvote_count INTEGER DEFAULT 0,
    answer_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 29. COMMUNITY ANSWERS TABLE
CREATE TABLE IF NOT EXISTS public.community_answers (
    id VARCHAR(255) PRIMARY KEY,
    question_id VARCHAR(255) REFERENCES public.community_questions(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    author_name VARCHAR(255),
    author_role VARCHAR(50),
    author_photo TEXT,
    author_department VARCHAR(255),
    content TEXT NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active',
    upvote_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 30. HOME MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.home_media (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'image',
    url TEXT NOT NULL,
    video_embed_url TEXT,
    description TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



