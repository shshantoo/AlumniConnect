import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';
import { GraduationCap, Briefcase, Building2, BookOpen, ShieldCheck } from 'lucide-react';

const ROLES: { id: UserRole; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'student', label: 'Student View', icon: GraduationCap },
  { id: 'alumni', label: 'Alumni View', icon: Briefcase },
  { id: 'employer', label: 'Employer View', icon: Building2 },
  { id: 'faculty', label: 'Faculty View', icon: BookOpen },
  { id: 'admin', label: 'Admin Portal', icon: ShieldCheck },
];

export const DemoRoleBar: React.FC = () => {
  const { currentRole, switchRole } = useAuth();

  return (
    <div className="bg-[#f0ede6] border-b border-[#e5e0d5] px-4 py-2 text-xs sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Reference Image Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce8d5] border border-[#f8cbb0] text-zinc-900 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span>Interactive Role Tester</span>
          <span className="text-[#ff5500] font-semibold hidden sm:inline">→ Switch Persona</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-semibold transition-all text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0a0a0a] text-white shadow-sm'
                    : 'bg-white text-zinc-800 hover:bg-zinc-100 border border-[#e5e0d5]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
