import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as maplibregl from 'maplibre-gl';
import { 
  GraduationCap, Users, Briefcase, Calendar, Award, 
  Search, ArrowRight, Sparkles, CheckCircle2, Globe, 
  FileText, HeartHandshake, MapPin, Building2, UserCheck, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_ALUMNI_PROFILES, INITIAL_JOBS, INITIAL_EVENTS } from '../../mock/seedData';

const MAP_STOPS = [
  { name: 'Bangladesh', count: 265, lat: 23.8103, lng: 90.4125 },
  { name: 'USA', count: 420, lat: 37.7749, lng: -122.4194 },
  { name: 'Canada', count: 180, lat: 43.6532, lng: -79.3832 },
  { name: 'UK', count: 130, lat: 51.5074, lng: -0.1278 },
  { name: 'Australia', count: 140, lat: -33.8688, lng: 151.2093 },
  { name: 'Germany', count: 95, lat: 52.5200, lng: 13.4050 },
  { name: 'Singapore', count: 110, lat: 1.3521, lng: 103.8198 },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, currentRole, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const homeMapContainerRef = useRef<HTMLDivElement>(null);
  const homeMapRef = useRef<any>(null);

  // Initialize OpenFreeMap with MapLibre GL
  useEffect(() => {
    if (!homeMapContainerRef.current) return;
    const mapLibreInstance = (window as any).maplibregl || maplibregl;
    if (!mapLibreInstance || !mapLibreInstance.Map) return;

    const map = new mapLibreInstance.Map({
      container: homeMapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [20, 20],
      zoom: 1.8,
    });

    homeMapRef.current = map;
    map.addControl(new mapLibreInstance.NavigationControl(), 'top-right');

    MAP_STOPS.forEach(cnt => {
      const el = document.createElement('div');
      el.className = 'w-7 h-7 rounded-full bg-[#ff5500] border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-extrabold cursor-pointer hover:scale-125 transition-transform';
      el.innerText = String(cnt.count);

      const popup = new mapLibreInstance.Popup({ offset: 15 }).setHTML(`
        <div class="p-1 font-sans text-xs">
          <strong class="text-[#ff5500] text-sm font-bold">${cnt.name}</strong><br/>
          <span class="text-zinc-800 font-semibold">${cnt.count} Active Alumni</span>
        </div>
      `);

      new mapLibreInstance.Marker({ element: el })
        .setLngLat([cnt.lng, cnt.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  const flyToCountry = (lat: number, lng: number) => {
    if (homeMapRef.current) {
      homeMapRef.current.flyTo({ center: [lng, lat], zoom: 4, speed: 1.2 });
    }
  };

  // Sample data for directory search preview
  const featuredAlumni = INITIAL_ALUMNI_PROFILES.slice(0, 3);
  const featuredJobs = INITIAL_JOBS.slice(0, 3);
  const featuredEvents = INITIAL_EVENTS.slice(0, 3);

  const handleActionClick = (targetPath: string) => {
    if (currentUser) {
      navigate(targetPath);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-zinc-900 font-sans selection:bg-[#ff5500] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION HEADER                                                  */}
      {/* ========================================================================= */}
      <header className="bg-white/80 border-b border-[#e5e0d5] backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-[#0a0a0a] tracking-tight flex items-center gap-1">
                Alumni<span className="text-[#ff5500]">Connect</span>
                <span className="text-[10px] font-medium bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] px-2 py-0.5 rounded-full ml-1">CSE</span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-zinc-700">
            <a href="#hero" className="hover:text-[#ff5500] transition">Home</a>
            <a href="#directory" className="hover:text-[#ff5500] transition">Alumni</a>
            <a href="#careers" className="hover:text-[#ff5500] transition">Careers</a>
            <a href="#mentorship" className="hover:text-[#ff5500] transition">Mentorship</a>
            <a href="#events" className="hover:text-[#ff5500] transition">Events</a>
          </nav>

          {/* Auth Actions Matching Attachment */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 bg-[#f8f6f0] border border-[#e5e0d5] px-3 py-1.5 rounded-xl">
                  <img
                    src={profile?.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt="User Avatar"
                    className="w-7 h-7 rounded-lg object-cover ring-2 ring-[#ff5500]/30"
                  />
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-bold text-[#0a0a0a] leading-tight truncate max-w-[120px]">
                      {profile?.full_name || 'User Account'}
                    </p>
                    <span className="text-[10px] text-[#ff5500] capitalize font-semibold">{currentRole}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/dashboard/${currentRole}`)}
                  className="btn-black px-4 py-2 text-xs font-extrabold flex items-center gap-1.5 shadow-md"
                >
                  Dashboard <ArrowRight className="w-3.5 h-3.5 text-[#ff5500]" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login?mode=login"
                  className="text-zinc-700 hover:text-zinc-950 font-semibold text-sm px-3 py-2 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/login?mode=register"
                  className="px-6 py-2.5 rounded-full bg-[#1b64f2] hover:bg-[#1552cc] text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-105"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (CONNECT. NETWORK. GROW.)                                 */}
      {/* ========================================================================= */}
      <section id="hero" className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-white via-[#f8f6f0] to-[#f8f6f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Animated Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fce8d5] border border-[#f8cbb0] text-zinc-950 text-xs font-extrabold shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
            <span>Your University Community Beyond Graduation</span>
          </motion.div>

          {/* Hero Main Animated Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl font-black text-[#0a0a0a] tracking-tight leading-none uppercase">
              CONNECT. <span className="text-[#ff5500]">NETWORK.</span> GROW.
            </h1>
            <p className="text-base sm:text-xl font-bold text-zinc-700 tracking-wide">
              Find alumni • Build your career • Get hired
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium pt-2">
              The official institutional alumni portal linking Computer Science & Engineering students, global tech leaders, corporate recruiters, and departmental faculty.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => handleActionClick('/directory')}
              className="btn-black px-6 py-3.5 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              Explore Alumni Network <ArrowRight className="w-4 h-4 text-[#ff5500]" />
            </button>

            <button
              onClick={() => handleActionClick('/profile')}
              className="btn-white px-6 py-3.5 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
            >
              <FileText className="w-4 h-4 text-[#ff5500]" /> Build Your ATS CV
            </button>
          </motion.div>

          {/* Hero Visual Mockup Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-6 max-w-5xl mx-auto"
          >
            <div className="taste-card p-4 sm:p-6 bg-white border border-[#e5e0d5] shadow-2xl relative overflow-hidden group">
              <div className="bg-[#0a0a0a] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#ff5500]" /> Interactive Platform Preview
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">Global Alumni Directory & Career Center</h3>
                  <p className="text-xs text-zinc-300 max-w-lg">
                    Real-time spatial mapping, 18-section ATS CV generator, alumni mentorship matching, and verified corporate placement boards.
                  </p>
                </div>
                <button
                  onClick={() => handleActionClick('/directory')}
                  className="btn-black bg-[#ff5500] hover:bg-orange-600 text-white px-5 py-3 text-xs font-bold whitespace-nowrap shadow-md"
                >
                  Launch Directory Map →
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STATS IMPACT METER                                                     */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-y border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Alumni Network', value: '10K+', desc: 'Graduates worldwide' },
            { label: 'Verified Jobs', value: '500+', desc: 'Full-Time & Internships' },
            { label: 'Hosted Events', value: '100+', desc: 'Summits & Workshops' },
            { label: 'Placement Rate', value: '98%', desc: 'Career Success' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1 p-4 rounded-2xl bg-[#f8f6f0] border border-[#e5e0d5]"
            >
              <p className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-[#ff5500] uppercase tracking-wider">{stat.label}</p>
              <p className="text-[11px] text-zinc-500 font-medium">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHAT WE OFFER (6 ECOSYSTEM CARDS)                                      */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Platform Ecosystem</span>
          <h2 className="text-3xl font-extrabold text-[#0a0a0a] tracking-tight">WHAT WE OFFER</h2>
          <p className="text-xs text-zinc-600 font-medium">Explore six integrated pillars designed to support your academic and professional lifecycle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Alumni Network', icon: Users, desc: 'Connect with senior engineering leaders across Google, Amazon, Stripe, and global tech firms.', path: '/directory' },
            { title: 'Career Center', icon: GraduationCap, desc: 'Departmental placement tracking, institutional verification, and faculty advisement.', path: '/dashboard/student' },
            { title: 'Mentoring Program', icon: HeartHandshake, desc: '1-on-1 mentorship matching for mock interviews, code reviews, and career guidance.', path: '/mentorship' },
            { title: 'ATS CV Builder', icon: FileText, desc: '18-section professional CV builder with AI summary generator & 4 printable A4 templates.', path: '/profile' },
            { title: 'Jobs & Internships', icon: Briefcase, desc: 'Verified corporate job openings and alumni talent referral boards.', path: '/jobs' },
            { title: 'Events & Reunions', icon: Calendar, desc: 'Departmental reunions, technical workshops, hackathons, and global webinars.', path: '/events' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleActionClick(item.path)}
                className="taste-card p-6 space-y-3 cursor-pointer group hover:border-[#ff5500] transition-all bg-white"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0a0a0a] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#ff5500]" />
                </div>
                <h3 className="font-extrabold text-base text-[#0a0a0a] group-hover:text-[#ff5500] transition">{item.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">{item.desc}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-[#ff5500] pt-2">
                  <span>Explore Feature</span> <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FIND YOUR ALUMNI DIRECTORY SHOWCASE                                   */}
      {/* ========================================================================= */}
      <section id="directory" className="py-16 bg-white border-y border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Global Directory</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">FIND YOUR ALUMNI</h2>
            </div>
            <p className="text-xs text-zinc-500 max-w-md">Search graduates by name, company, graduation batch, or country location.</p>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, company, batch, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#f8f6f0] border border-[#e5e0d5] rounded-2xl pl-11 pr-32 py-3.5 text-xs text-zinc-900 focus:outline-none focus:border-[#ff5500] shadow-xs"
            />
            <button
              onClick={() => handleActionClick(`/directory?search=${encodeURIComponent(searchTerm)}`)}
              className="btn-black absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-xs font-bold flex items-center gap-1"
            >
              Search Alumni
            </button>
          </div>

          {/* Alumni Profile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredAlumni.map((alum) => (
              <div key={alum.id} className="taste-card p-5 space-y-4 bg-[#f8f6f0] border border-[#e5e0d5]">
                <div className="flex items-center gap-3">
                  <img
                    src={alum.photo}
                    alt={alum.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#ff5500]/30 shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0a0a0a]">{alum.name}</h4>
                    <p className="text-xs font-bold text-[#ff5500]">{alum.position} @ {alum.company}</p>
                    <p className="text-[10px] text-zinc-500">Batch of {alum.graduation_year} • {alum.city}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleActionClick('/directory')}
                  className="btn-white w-full py-2 text-xs font-bold shadow-xs flex items-center justify-center gap-1"
                >
                  View Profile →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CAREER OPPORTUNITIES SHOWCASE                                          */}
      {/* ========================================================================= */}
      <section id="careers" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Talent Referral Board</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">CAREER OPPORTUNITIES</h2>
          </div>
          <button
            onClick={() => handleActionClick('/jobs')}
            className="btn-black px-4 py-2 text-xs font-bold flex items-center gap-1.5"
          >
            View All Jobs <ArrowRight className="w-3.5 h-3.5 text-[#ff5500]" />
          </button>
        </div>

        <div className="space-y-3">
          {featuredJobs.map((job) => (
            <div key={job.id} className="taste-card p-5 bg-white border border-[#e5e0d5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5 text-[#ff5500]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0a0a0a]">{job.title}</h4>
                  <p className="text-xs text-zinc-600 font-medium">{job.company} • {job.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-[#fce8d5] text-zinc-950 border border-[#f8cbb0] font-bold text-xs">
                  {job.salary}
                </span>
                <button
                  onClick={() => handleActionClick('/jobs')}
                  className="btn-black px-4 py-2 text-xs font-bold shadow-xs"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FIND A MENTOR SPOTLIGHT                                                */}
      {/* ========================================================================= */}
      <section id="mentorship" className="py-16 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 text-[#ff5500] text-xs font-bold">
              1-on-1 Mentorship
            </span>
            <h2 className="text-3xl font-extrabold text-white">FIND A MENTOR</h2>
            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
              Connect with experienced alumni software engineering leads for mock interviews, code reviews, and direct career guidance.
            </p>
          </div>

          <button
            onClick={() => handleActionClick('/mentorship')}
            className="btn-black bg-[#ff5500] hover:bg-orange-600 text-white px-6 py-3.5 text-xs font-bold flex items-center gap-2 shadow-lg whitespace-nowrap"
          >
            Find a Mentor Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BUILD YOUR CAREER ATS CV BUILDER SPOTLIGHT                            */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="taste-card p-8 bg-white border border-[#e5e0d5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">CV Builder Engine</span>
            <h2 className="text-3xl font-extrabold text-[#0a0a0a]">BUILD YOUR CAREER</h2>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Create an ATS-friendly professional CV with 4 design templates (*Classic*, *Modern*, *Academic*, *Creative*) and 1-click A4 PDF download.
            </p>
          </div>

          <button
            onClick={() => handleActionClick('/profile')}
            className="btn-black px-6 py-3.5 text-xs font-bold flex items-center gap-2 shadow-md whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-[#ff5500]" /> Create My CV Now
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. UPCOMING EVENTS                                                        */}
      {/* ========================================================================= */}
      <section id="events" className="py-16 bg-white border-y border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Departmental Calendar</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a0a0a]">UPCOMING EVENTS</h2>
            </div>
            <button
              onClick={() => handleActionClick('/events')}
              className="btn-white px-4 py-2 text-xs font-bold flex items-center gap-1.5"
            >
              View All Events →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredEvents.map((evt) => (
              <div key={evt.id} className="taste-card p-5 space-y-3 bg-[#f8f6f0] border border-[#e5e0d5]">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-36 rounded-xl object-cover"
                />
                <span className="px-2.5 py-0.5 rounded bg-[#fce8d5] text-zinc-950 font-bold text-[10px]">
                  {evt.category}
                </span>
                <h4 className="font-extrabold text-sm text-[#0a0a0a]">{evt.title}</h4>
                <p className="text-xs text-zinc-600 line-clamp-2">{evt.description}</p>
                <button
                  onClick={() => handleActionClick('/events')}
                  className="btn-black w-full py-2 text-xs font-bold shadow-xs"
                >
                  Register for Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ALUMNI AROUND THE WORLD SPATIAL MAP                                  */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Global Reach</span>
          <h2 className="text-3xl font-extrabold text-[#0a0a0a]">ALUMNI AROUND THE WORLD</h2>
          <p className="text-xs text-zinc-600 font-medium">Explore where CSE graduates live and work across the globe.</p>
        </div>

        {/* Global OpenFreeMap Spatial Map Container */}
        <div className="taste-card p-4 sm:p-6 bg-white border border-[#e5e0d5] shadow-lg space-y-4">
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#e5e0d5] shadow-inner">
            <div ref={homeMapContainerRef} className="w-full h-full" />
            
            {/* Overlay Map Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-900 shadow-md flex items-center gap-2 pointer-events-none">
              <Globe className="w-4 h-4 text-[#ff5500] animate-spin" style={{ animationDuration: '20s' }} />
              <span>Live OpenFreeMap Vector Tile Server</span>
            </div>
          </div>

          {/* Interactive Country Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-zinc-800 pt-2">
            {[
              { name: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
              { name: 'USA', lat: 37.7749, lng: -122.4194 },
              { name: 'Canada', lat: 43.6532, lng: -79.3832 },
              { name: 'UK', lat: 51.5074, lng: -0.1278 },
              { name: 'Australia', lat: -33.8688, lng: 151.2093 },
              { name: 'Germany', lat: 52.5200, lng: 13.4050 },
              { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
            ].map(country => (
              <button
                key={country.name}
                onClick={() => flyToCountry(country.lat, country.lng)}
                className="px-3.5 py-1.5 rounded-full bg-[#f8f6f0] border border-[#e5e0d5] hover:bg-[#0a0a0a] hover:text-white transition-all text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                📍 {country.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. SUCCESS STORIES & TESTIMONIALS                                        */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-y border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#ff5500] uppercase tracking-widest">Graduate Testimonials</span>
            <h2 className="text-3xl font-extrabold text-[#0a0a0a]">SUCCESS STORIES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="taste-card p-6 bg-[#f8f6f0] border border-[#e5e0d5] space-y-3">
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                "How I got my first job through AlumniConnect: An alumni engineering lead at Google reviewed my ATS CV and submitted an internal referral. Within two weeks, I cleared the technical interviews!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Sarah J."
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff5500]"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-[#0a0a0a]">Sarah Jenkins</h4>
                  <p className="text-[10px] text-zinc-500 font-bold">Staff Software Engineer @ Google</p>
                </div>
              </div>
            </div>

            <div className="taste-card p-6 bg-[#f8f6f0] border border-[#e5e0d5] space-y-3">
              <p className="text-xs text-zinc-700 italic leading-relaxed">
                "The 1-on-1 mentorship program allowed me to do mock technical interviews with senior AWS architects. It gave me the exact confidence needed to secure my dream cloud role."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                  alt="Marcus C."
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ff5500]"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-[#0a0a0a]">Marcus Chen</h4>
                  <p className="text-[10px] text-zinc-500 font-bold">Principal Cloud Architect @ AWS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. READY TO RECONNECT? FINAL CTA                                         */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#0a0a0a] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="px-3 py-1 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 text-[#ff5500] text-xs font-bold">
            Get Started Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            READY TO RECONNECT?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Join your university community today to access global alumni networks, ATS CV builders, and career referrals.
          </p>

          <button
            onClick={() => handleActionClick('/login')}
            className="btn-black bg-[#ff5500] hover:bg-orange-600 text-white px-8 py-4 text-xs sm:text-sm font-black tracking-wider uppercase shadow-xl hover:scale-105 transition-transform"
          >
            JOIN COMMUNITY NOW →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5e0d5] py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-zinc-800">AlumniConnect — University Alumni, Career & Placement Management Platform</p>
          <p>© 2026 Department of Computer Science & Engineering. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};
