import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/common/PageTransition';

import { AuthPage } from '../features/auth/AuthPage';
import { StudentDashboard } from '../features/dashboard/StudentDashboard';
import { AlumniDashboard } from '../features/dashboard/AlumniDashboard';
import { EmployerDashboard } from '../features/dashboard/EmployerDashboard';
import { FacultyDashboard } from '../features/dashboard/FacultyDashboard';
import { AdminDashboard } from '../features/dashboard/AdminDashboard';

import { AlumniDirectoryPage } from '../features/directory/AlumniDirectoryPage';
import { JobsPage } from '../features/jobs/JobsPage';
import { MentorshipPage } from '../features/mentorship/MentorshipPage';
import { EventsPage } from '../features/events/EventsPage';
import { AppointmentsPage } from '../features/appointments/AppointmentsPage';
import { ProfilePage } from '../features/profile/ProfilePage';

export const AppRoutes: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Main Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard/student" replace />} />
              <Route path="/login" element={<PageTransition><AuthPage /></PageTransition>} />
              
              {/* Role Dashboards */}
              <Route path="/dashboard/student" element={<PageTransition><StudentDashboard /></PageTransition>} />
              <Route path="/dashboard/alumni" element={<PageTransition><AlumniDashboard /></PageTransition>} />
              <Route path="/dashboard/employer" element={<PageTransition><EmployerDashboard /></PageTransition>} />
              <Route path="/dashboard/faculty" element={<PageTransition><FacultyDashboard /></PageTransition>} />
              <Route path="/dashboard/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
              
              {/* Core Modules */}
              <Route path="/directory" element={<PageTransition><AlumniDirectoryPage /></PageTransition>} />
              <Route path="/jobs" element={<PageTransition><JobsPage /></PageTransition>} />
              <Route path="/mentorship" element={<PageTransition><MentorshipPage /></PageTransition>} />
              <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
              <Route path="/appointments" element={<PageTransition><AppointmentsPage /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard/student" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
};
