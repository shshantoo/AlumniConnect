export type UserRole = 'student' | 'alumni' | 'employer' | 'faculty' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone?: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  portfolio?: string;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  student_id: string;
  school: string;
  department: string;
  batch: string;
  cgpa?: number;
  resume?: string;
  skills: string[];
  created_at: string;
}

export interface AlumniProfile {
  id: string;
  user_id: string;
  graduation_year: number;
  company: string;
  position: string;
  country: string;
  city: string;
  experience: string;
  mentor: boolean;
  visibility: 'public' | 'private';
  created_at: string;
}

export interface EmployerProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry: string;
  website: string;
  logo?: string;
  verified: boolean;
  created_at: string;
}

export interface FacultyProfile {
  id: string;
  user_id: string;
  department: string;
  title: string;
  office_hours?: string;
  research_area?: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  salary: string;
  company: string;
  location: string;
  deadline: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Remote';
  posted_by?: string;
  status: 'active' | 'closed';
  created_at: string;
  company_logo?: string;
  tags?: string[];
}

export interface Internship {
  id: string;
  title: string;
  description: string;
  stipend: string;
  duration: string;
  deadline: string;
  company: string;
  location: string;
  posted_by?: string;
  status: 'active' | 'closed';
  created_at: string;
  tags?: string[];
}

export interface JobApplication {
  id: string;
  student_id: string;
  student_name?: string;
  job_id: string;
  job_title?: string;
  company_name?: string;
  status: 'Pending' | 'Reviewing' | 'Shortlisted' | 'Accepted' | 'Rejected';
  resume: string;
  cover_letter?: string;
  created_at: string;
}

export interface MentorshipRequest {
  id: string;
  student_id: string;
  student_name?: string;
  mentor_id: string;
  mentor_name?: string;
  mentor_company?: string;
  mentor_position?: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  topic: string;
  message: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image: string;
  organizer: string;
  category: 'Webinar' | 'Reunion' | 'Workshop' | 'Career Fair' | 'Hackathon';
  created_by?: string;
  registered_count?: number;
  is_registered?: boolean;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  is_read: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  student_id: string;
  student_name?: string;
  faculty_id: string;
  faculty_name?: string;
  appointment_date: string;
  topic: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  head: string;
  total_students: number;
  total_alumni: number;
}

export interface CountryStat {
  id: string;
  name: string;
  code: string;
  alumni_count: number;
  lat: number;
  lng: number;
}

export interface SystemReport {
  id: string;
  title: string;
  category: string;
  file_url: string;
  created_at: string;
}
