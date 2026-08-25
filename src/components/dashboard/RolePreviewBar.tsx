import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';
import { ShieldCheck, GraduationCap, Briefcase, Building2, UserCheck } from 'lucide-react';

export const RolePreviewBar: React.FC = () => {
  const { currentRole, switchRole } = useAuth();
  const navigate = useNavigate();

  const roles: { role: UserRole; label: string; icon: React.ReactNode }[] = [
    { role: 'student', label: 'Student Portal', icon: <GraduationCap className="w-4 h-4 text-[#ff5500]" /> },
    { role: 'alumni', label: 'Alumni Network', icon: <Briefcase className="w-4 h-4 text-orange-600" /> },
    { role: 'employer', label: 'Employer Portal', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
    { role: 'admin', label: 'Admin Governance', icon: <ShieldCheck className="w-4 h-4 text-purple-600" /> },
  ];

  return (
    <div className="bg-[#f8f6f0] border border-[#e5e0d5] rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs mb-6">
      <div className="flex items-center gap-2 px-2">
        <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
        <span className="text-xs font-bold text-[#0a0a0a]">Dashboard Feature Role Switcher:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto">
        {roles.map((r) => (
          <button
            key={r.role}
            onClick={() => {
              switchRole(r.role);
              navigate(`/dashboard/${r.role}`);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === r.role
                ? 'bg-[#0a0a0a] text-white shadow-sm'
                : 'bg-white text-zinc-700 hover:text-zinc-950 border border-[#e5e0d5]'
            }`}
          >
            {r.icon}
            <span>{r.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
