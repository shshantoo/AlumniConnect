import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, Briefcase, GraduationCap, Calendar, 
  BookOpen, ShieldCheck, Award 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentRole } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      path: `/dashboard/${currentRole}`,
      icon: LayoutDashboard,
    },
    {
      label: 'Alumni Directory',
      path: '/directory',
      icon: Users,
    },
    {
      label: 'Jobs & Internships',
      path: '/jobs',
      icon: Briefcase,
    },
    {
      label: 'Mentorship Program',
      path: '/mentorship',
      icon: GraduationCap,
    },
    {
      label: 'Events & Reunions',
      path: '/events',
      icon: Calendar,
    },
    {
      label: 'Faculty Appointments',
      path: '/appointments',
      icon: BookOpen,
    },
    {
      label: 'Admin Control Center',
      path: '/dashboard/admin',
      icon: ShieldCheck,
      badge: 'Admin',
      hide: currentRole !== 'admin'
    }
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
        className={`fixed lg:sticky top-[65px] left-0 h-[calc(100vh-65px)] w-64 bg-[#f8f6f0] border-r border-[#e5e0d5] z-40 transition-transform duration-300 flex flex-col justify-between p-4 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div className="px-3 py-1.5">
            <span className="inline-block bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
              {currentRole} Menu
            </span>
          </div>

          <nav className="space-y-1.5">
            {navItems.filter(item => !item.hide).map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                      isActive
                        ? 'bg-[#0a0a0a] text-white shadow-sm'
                        : 'text-zinc-700 hover:text-zinc-950 hover:bg-[#f0ede6]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-[#fce8d5] text-zinc-900 border border-[#f8cbb0] px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Card */}
        <div className="bg-white border border-[#e5e0d5] rounded-2xl p-3.5 text-xs space-y-2 shadow-2xs">
          <div className="flex items-center gap-2 text-[#ff5500] font-bold">
            <Award className="w-4 h-4" />
            <span>CSE Department</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
            School of Computer Science & Engineering • Global Alumni Network
          </p>
        </div>
      </aside>
    </>
  );
};
