import React from 'react';
import { GraduationCap, Github, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f0ede6] border-t border-[#e5e0d5] text-zinc-600 py-12 px-4 sm:px-6 lg:px-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0a0a0a] flex items-center justify-center shadow-xs">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-zinc-950 text-sm">Alumni<span className="text-[#ff5500]">Connect</span></span>
          </div>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Official Alumni & Student Career Portal for the Department of Computer Science & Engineering. Built with high-taste design architecture & Supabase cloud backend.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-zinc-950 mb-3">Quick Navigation</h5>
          <ul className="space-y-2 text-zinc-600 text-[11px] font-medium">
            <li><a href="/directory" className="hover:text-[#ff5500] transition">Alumni Directory</a></li>
            <li><a href="/jobs" className="hover:text-[#ff5500] transition">Jobs & Internships</a></li>
            <li><a href="/mentorship" className="hover:text-[#ff5500] transition">Mentorship Program</a></li>
            <li><a href="/events" className="hover:text-[#ff5500] transition">Events & Webinars</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-zinc-950 mb-3">Roles & Portals</h5>
          <ul className="space-y-2 text-zinc-600 text-[11px] font-medium">
            <li><a href="/dashboard/student" className="hover:text-[#ff5500] transition">Student Dashboard</a></li>
            <li><a href="/dashboard/alumni" className="hover:text-[#ff5500] transition">Alumni Portal</a></li>
            <li><a href="/dashboard/employer" className="hover:text-[#ff5500] transition">Employer Portal</a></li>
            <li><a href="/dashboard/faculty" className="hover:text-[#ff5500] transition">Faculty Dashboard</a></li>
            <li><a href="/dashboard/admin" className="hover:text-[#ff5500] transition">System Admin</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-zinc-950 mb-3">Contact & Support</h5>
          <p className="text-[11px] text-zinc-500 mb-2 font-medium">Department of Computer Science & Engineering</p>
          <p className="text-[11px] text-zinc-700 flex items-center gap-1.5 mb-3 font-semibold">
            <Mail className="w-3.5 h-3.5 text-[#ff5500]" /> alumni-cse@univ.edu
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="p-2 rounded-lg bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-800 transition shadow-2xs">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white border border-[#e5e0d5] hover:bg-zinc-100 text-zinc-800 transition shadow-2xs">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#e5e0d5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <p>© 2026 AlumniConnect CSE Project. Built with React 19, Vite, Tailwind & Supabase.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-[#ff5500] fill-[#ff5500]" /> in Taste Skill Aesthetic (Paper, Black & Orange)
        </p>
      </div>
    </footer>
  );
};
