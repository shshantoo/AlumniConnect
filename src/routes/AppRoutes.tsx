import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
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

// Strict Authentication Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const { currentUser, currentRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Main Navbar */}
      {currentUser && <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {currentUser && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Root Navigation Fallback */}
              <Route 
                path="/" 
                element={
                  currentUser 
                    ? <Navigate to={`/dashboard/${currentRole}`} replace /> 
                    : <Navigate to="/login" replace />
                } 
              />

              {/* Login Page */}
              <Route 
                path="/login" 
                element={
                  currentUser 
                    ? <Navigate to={`/dashboard/${currentRole}`} replace /> 
                    : <PageTransition><AuthPage /></PageTransition>
                } 
              />
              
              {/* Protected Role Dashboards */}
              <Route path="/dashboard/student" element={<ProtectedRoute><PageTransition><StudentDashboard /></PageTransition></ProtectedRoute>} />
              <Route path="/dashboard/alumni" element={<ProtectedRoute><PageTransition><AlumniDashboard /></PageTransition></ProtectedRoute>} />
              <Route path="/dashboard/employer" element={<ProtectedRoute><PageTransition><EmployerDashboard /></PageTransition></ProtectedRoute>} />
              <Route path="/dashboard/faculty" element={<ProtectedRoute><PageTransition><FacultyDashboard /></PageTransition></ProtectedRoute>} />
              <Route path="/dashboard/admin" element={<ProtectedRoute><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
              
              {/* Protected Core Modules */}
              <Route path="/directory" element={<ProtectedRoute><PageTransition><AlumniDirectoryPage /></PageTransition></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><PageTransition><JobsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/mentorship" element={<ProtectedRoute><PageTransition><MentorshipPage /></PageTransition></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><PageTransition><EventsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><PageTransition><AppointmentsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />

              {/* Fallback */}
              <Route 
                path="*" 
                element={
                  currentUser 
                    ? <Navigate to={`/dashboard/${currentRole}`} replace /> 
                    : <Navigate to="/login" replace />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
};
