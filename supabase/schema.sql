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
    username VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    mobile VARCHAR(50),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'alumni', 'employer', 'faculty', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROFILES TABLE (Full 18-Section CV & Alumni Data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
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
