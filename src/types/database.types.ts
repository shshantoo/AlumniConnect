export type UserRole = 'student' | 'alumni' | 'employer' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  user_id: string;
  role: UserRole;
  full_name: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  preferred_name?: string;
  headline?: string;
  email: string;
  phone?: string;
  country?: string;
  location?: string;
  dob?: string;
  gender?: string;
  nationality?: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  social_links?: {
    twitter?: string;
    medium?: string;
    youtube?: string;
    other?: string;
  };
  
  // University & Institutional Identity (IUB Validated)
  iub_id?: string; // 7-Digit Numerical IUB ID
  iub_email?: string; // @iub.edu.bd Email
  school?: string; // e.g. SETS, SBE, SLASS, SPHS
  convocation_number?: string; // e.g. 23rd Convocation
  verification_status?: 'pending' | 'verified' | 'rejected';
  account_status?: 'active' | 'pending' | 'suspended';

  // University & Alumni Info
  university?: string;
  student_id?: string;
  department?: string;
  program_degree?: string;
  major_minor?: string;
  batch_year?: string;
  enrollment_year?: string;
  graduation_date?: string;
  cgpa?: string;
  academic_achievements?: string[];
  university_clubs?: string[];
  club_positions?: string[];
  thesis_project?: string;
  thesis_supervisor?: string;

  // Professional Summary
  career_objective?: string;
  professional_summary?: string;
  areas_of_expertise?: string[];
  career_interests?: string[];

  // Complex Sub-arrays
  education_history?: EducationItem[];
  work_experience?: WorkExperienceItem[];
  skills_categorized?: CategorizedSkillItem[];
  projects_list?: ProjectItem[];
  certifications_list?: CertificationItem[];
  workshops_list?: WorkshopItem[];
  awards_list?: AwardItem[];
  publications_list?: PublicationItem[];
  extracurriculars_list?: ActivityItem[];
  volunteer_list?: ActivityItem[];
  leadership_list?: ActivityItem[];
  languages_list?: LanguageItem[];
  interests_tags?: string[];
  references_list?: ReferenceItem[];

  // Alumni Specific Networking
  alumni_preferences?: AlumniPreferences;

  created_at: string;
  updated_at: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  department?: string;
  major?: string;
  start_year: string;
  end_year: string;
  cgpa?: string;
  coursework?: string;
  thesis?: string;
  level?: 'University' | 'College' | 'School';
}

export interface WorkExperienceItem {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance' | 'Contract' | 'Volunteer';
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  responsibilities: string;
  achievements?: string;
  technologies?: string;
}

export interface CategorizedSkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Professional' | 'Industry';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  role?: string;
  start_date?: string;
  end_date?: string;
  technologies?: string;
  team_size?: string;
  project_url?: string;
  github_url?: string;
  demo_url?: string;
  tag: 'University Project' | 'Personal Project' | 'Professional Project';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuing_org: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface WorkshopItem {
  id: string;
  name: string;
  organization: string;
  duration?: string;
  date?: string;
  topics?: string;
  certificate_received?: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description?: string;
  rank_position?: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  type: 'Journal' | 'Conference' | 'Preprint' | 'Book Chapter';
  publisher: string;
  authors: string;
  date: string;
  doi?: string;
  url?: string;
  abstract?: string;
}

export interface ActivityItem {
  id: string;
  organization: string;
  position: string;
  duration: string;
  responsibilities?: string;
  achievements?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Beginner';
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  organization: string;
  relationship: string;
  email: string;
  phone?: string;
}

export interface AlumniPreferences {
  current_title?: string;
  current_company?: string;
  industry?: string;
  years_of_experience?: string;
  open_to_opportunities?: boolean;
  open_to_networking?: boolean;
  available_for_mentorship?: boolean;
  can_help_with?: string[];
  looking_for?: string[];
}

// Student Specific Table Profile
export interface StudentProfile {
  id: string;
  user_id: string;
  student_id: string;
  school: string;
  department: string;
  year_of_study: number;
  expected_graduation: string;
  cgpa: number;
  skills: string[];
  resume_url?: string;
  batch?: number;
}

// Alumni Specific Table Profile
export interface AlumniProfile {
  id: string;
  user_id: string;
  name: string;
  company: string;
  position: string;
  graduation_year: number;
  experience: string;
  country: string;
  city: string;
  photo?: string;
  mentor: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Remote' | 'Internship';
  salary: string;
  description: string;
  created_at: string;
  employer_id?: string;
  is_published?: boolean;
}

export interface ApplicationRecord {
  id: string;
  job_id: string;
  job_title: string;
  student_id: string;
  student_name: string;
  resume: string;
  cover_letter?: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected';
  created_at: string;
}

export interface MentorshipRequestRecord {
  id: string;
  student_id: string;
  student_name: string;
  mentor_id: string;
  mentor_name: string;
  mentor_company: string;
  topic: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  created_at: string;
}

export interface EventRecord {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  category: 'Reunion' | 'Workshop' | 'Hackathon' | 'Webinar';
  image?: string;
  is_registered?: boolean;
  registered_count?: number;
  is_published?: boolean;
}

export interface HomeMediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string; // Image URL or Video URL (e.g. YouTube, Vimeo, mp4)
  video_embed_url?: string;
  description?: string;
  is_published?: boolean;
  created_at: string;
}

export interface AppointmentRecord {
  id: string;
  student_id: string;
  student_name: string;
  faculty_id: string;
  faculty_name: string;
  appointment_date: string;
  topic: string;
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface NotificationRecord {
  id: string;
  user_id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

// Backward Compatibility Aliases
export type User = { id: string; email: string };
export type Profile = UserProfile;
export type Job = JobListing;
export type Internship = JobListing;
export type JobApplication = ApplicationRecord;
export type MentorshipRequest = MentorshipRequestRecord;
export type EventItem = EventRecord;
export type NotificationItem = NotificationRecord;
export type Appointment = AppointmentRecord;
export type Department = any;
export type CountryStat = any;
export type SystemReport = any;
export type EmployerProfile = any;
export type FacultyProfile = any;

// Helper to compute Profile Completion Percentage
export function computeProfileCompletion(profile: Partial<UserProfile> | null): {
  percentage: number;
  completedSections: string[];
  missingSections: { name: string; weight: number; key: string }[];
} {
  if (!profile) return { percentage: 0, completedSections: [], missingSections: [] };

  const sections = [
    { name: 'Personal & Contact Info', key: 'personal', weight: 15, isComplete: !!(profile.full_name && profile.email && (profile.phone || profile.location)) },
    { name: 'University Details', key: 'university', weight: 15, isComplete: !!(profile.student_id || profile.department || profile.batch_year || profile.university) },
    { name: 'Professional Summary', key: 'summary', weight: 10, isComplete: !!(profile.professional_summary || profile.career_objective) },
    { name: 'Work Experience', key: 'work', weight: 15, isComplete: !!(profile.work_experience && profile.work_experience.length > 0) },
    { name: 'Education History', key: 'education', weight: 10, isComplete: !!(profile.education_history && profile.education_history.length > 0) },
    { name: 'Skills & Expertise', key: 'skills', weight: 15, isComplete: !!(profile.skills_categorized && profile.skills_categorized.length > 0) },
    { name: 'Projects', key: 'projects', weight: 10, isComplete: !!(profile.projects_list && profile.projects_list.length > 0) },
    { name: 'Networking Preferences', key: 'alumni', weight: 10, isComplete: !!(profile.alumni_preferences?.can_help_with?.length || profile.alumni_preferences?.looking_for?.length) },
  ];

  let percentage = 0;
  const completedSections: string[] = [];
  const missingSections: { name: string; weight: number; key: string }[] = [];

  sections.forEach((sec) => {
    if (sec.isComplete) {
      percentage += sec.weight;
      completedSections.push(sec.name);
    } else {
      missingSections.push({ name: sec.name, weight: sec.weight, key: sec.key });
    }
  });

  return { percentage, completedSections, missingSections };
}
