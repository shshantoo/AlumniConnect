import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, Calendar, Clock, 
  FileText, Download 
} from 'lucide-react';
import { INITIAL_SYSTEM_REPORTS } from '../../mock/seedData';

export const FacultyDashboard: React.FC = () => {
  const { profile, appointments } = useAuth();
  const [reports] = useState(INITIAL_SYSTEM_REPORTS);

  return (
    <div className="space-y-8">
      
      {/* Faculty Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 p-6 sm:p-8 overflow-hidden shadow-md text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5" /> Department Academic Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {profile?.full_name || 'Faculty Head'}
            </h1>
            <p className="text-orange-100 text-xs sm:text-sm font-medium">
              Department of Computer Science & Engineering • Academic Advisory Lead
            </p>
          </div>

          <div className="bg-white/20 border border-white/30 px-4 py-2 rounded-2xl text-xs text-white space-y-1 backdrop-blur-md">
            <p className="font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white" /> Office Hours:
            </p>
            <p className="text-orange-100 font-medium">Mon, Wed, Fri (2:00 PM - 4:30 PM)</p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Student Appointments</span>
          <p className="text-2xl font-extrabold text-zinc-900 mt-1">{appointments.length}</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Supervised Thesis Teams</span>
          <p className="text-2xl font-extrabold text-orange-600 mt-1">14 Senior CSE Teams</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500">Department Reports</span>
          <p className="text-2xl font-extrabold text-zinc-900 mt-1">{reports.length}</p>
        </div>
      </div>

      {/* Main Grid: Student Appointments & Academic Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Student Counseling Appointments */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" /> Counseling & Thesis Appointments
          </h3>

          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">No appointments scheduled.</p>
            ) : (
              appointments.map((apt) => (
                <div key={apt.id} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900">{apt.student_name}</span>
                    <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 border border-orange-200 text-[10px] font-bold">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-orange-700 font-semibold">{apt.topic}</p>
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" /> {new Date(apt.appointment_date).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Department Reports & Publications */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" /> Department Academic Reports
          </h3>

          <div className="space-y-3">
            {reports.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">No reports generated yet.</p>
            ) : (
              reports.map((rep) => (
                <div key={rep.id} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-orange-600">{rep.category}</span>
                    <h5 className="font-bold text-zinc-900 text-xs">{rep.title}</h5>
                    <p className="text-[10px] text-zinc-400">Generated: {rep.created_at}</p>
                  </div>

                  <a
                    href={rep.file_url}
                    className="p-2 rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white transition"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
