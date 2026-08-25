import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Target, Map, Sparkles, GraduationCap, Users, 
  MapPin, User, FileText, Briefcase, Calendar, ShieldCheck, Award 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole } = useAuth();

  const studentNavGroups = [
    {
      groupTitle: 'MY CAREER',
      items: [
        { label: 'Dashboard', path: `/dashboard/${currentRole}`, icon: LayoutDashboard },
        { label: 'Career Assessment', path: '/career/assessment', icon: Target },
        { label: 'Career Readiness', path: '/career/analysis', icon: Sparkles },
        { label: 'My Roadmap', path: '/career/roadmap', icon: Map },
      ],
    },
    {
      groupTitle: 'NETWORK',
      items: [
        { label: 'Mentor Matches', path: '/mentorship/matches', icon: GraduationCap },
        { label: 'Mentor Preferences', path: '/mentorship/preferences', icon: Target },
        { label: 'Alumni Directory', path: '/directory', icon: Users },
      ],
    },
    {
      groupTitle: 'CAREER TOOLKIT',
      items: [
        { label: 'My Profile & CV', path: '/profile', icon: User },
        { label: '✨ AI CV Review', path: '/cv/ai-review', icon: Sparkles },
      ],
    },
    {
      groupTitle: 'OPPORTUNITIES',
      items: [
        { label: 'Jobs & Internships', path: '/jobs', icon: Briefcase },
        { label: 'Events & Reunions', path: '/events', icon: Calendar },
      ],
    },
  ];

  const genericNavItems = [
    { label: 'Dashboard', path: `/dashboard/${currentRole}`, icon: LayoutDashboard },
    { label: 'Career Analysis', path: '/career/analysis', icon: Target },
    { label: 'Alumni Directory', path: '/directory', icon: Users },
    { label: 'Mentorship Program', path: '/mentorship', icon: GraduationCap },
    { label: 'Jobs & Internships', path: '/jobs', icon: Briefcase },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5.5rem)] w-64 bg-[#f8f6f0] border-r border-[#e5e0d5] z-30 transition-transform duration-300 flex flex-col justify-between p-4 overflow-y-auto scrollbar-thin ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="px-3 py-1.5 flex items-center justify-between">
            <span className="inline-block bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full">
              {currentRole} Menu
            </span>
          </div>

          {currentRole === 'student' ? (
            <div className="space-y-5">
              {studentNavGroups.map((group) => (
                <div key={group.groupTitle} className="space-y-1.5">
                  <span className="text-[10px] font-black text-zinc-400 px-3 uppercase tracking-wider">
                    {group.groupTitle}
                  </span>
                  <nav className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                              isActive
                                ? 'bg-[#0a0a0a] text-white shadow-sm'
                                : 'text-zinc-700 hover:text-zinc-950 hover:bg-[#f0ede6]'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>
          ) : (
            <nav className="space-y-1.5">
              {genericNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        isActive
                          ? 'bg-[#0a0a0a] text-white shadow-sm'
                          : 'text-zinc-700 hover:text-zinc-950 hover:bg-[#f0ede6]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          )}

          {currentRole === 'admin' && (
            <NavLink
              to="/dashboard/admin"
              onClick={onClose}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100 transition-all mt-4"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
                <span>Admin Control Center</span>
              </div>
            </NavLink>
          )}
        </div>

        {/* Bottom Card */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-3.5 text-xs space-y-2 shadow-2xs mt-6">
          <div className="flex items-center gap-2 text-[#ff5500] font-bold">
            <Award className="w-4 h-4" />
            <span>CSE Career Engine</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
            AlumniConnect • Intelligent Career Development Platform
          </p>
        </div>
      </aside>
    </>
  );
};
