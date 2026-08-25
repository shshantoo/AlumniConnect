import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/common/PageTransition';

import { HomePage } from '../features/home/HomePage';
import { AuthPage } from '../features/auth/AuthPage';
import { StudentDashboard } from '../features/dashboard/StudentDashboard';
import { AlumniDashboard } from '../features/dashboard/AlumniDashboard';
import { EmployerDashboard } from '../features/dashboard/EmployerDashboard';
import { AdminDashboard } from '../features/dashboard/AdminDashboard';

import { AlumniDirectoryPage } from '../features/directory/AlumniDirectoryPage';
import { JobsPage } from '../features/jobs/JobsPage';
import { MentorshipPage } from '../features/mentorship/MentorshipPage';
import { EventsPage } from '../features/events/EventsPage';
import { ProfilePage } from '../features/profile/ProfilePage';

// Career Intelligence & Smart Mentorship Imports
import { CareerAssessment } from '../features/career/pages/CareerAssessment';
import { CareerAnalysis } from '../features/career/pages/CareerAnalysis';
import { CareerRoadmap } from '../features/career/pages/CareerRoadmap';
import { MentorPreferences } from '../features/mentorship/pages/MentorPreferences';
import { MentorMatches } from '../features/mentorship/pages/MentorMatches';
import { AiCvReviewPage } from '../features/ai-cv/pages/AiCvReviewPage';

// AlumniConnect Community Imports
import { CommunityPage } from '../features/community/pages/CommunityPage';
import { AskQuestionPage } from '../features/community/pages/AskQuestionPage';
import { QuestionDetailPage } from '../features/community/pages/QuestionDetailPage';
import { MyQuestionsPage } from '../features/community/pages/MyQuestionsPage';
import { SavedQuestionsPage } from '../features/community/pages/SavedQuestionsPage';
import { AdminCommunityPage } from '../features/community/pages/AdminCommunityPage';
import { AdminReportsPage } from '../features/community/pages/AdminReportsPage';

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

  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Main Navbar (Shown when logged in and not on Landing HomePage) */}
      {currentUser && !isHomePage && <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}

      {/* Main Layout Area */}
      <div className={isHomePage ? 'w-full' : 'flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6'}>
        {currentUser && !isHomePage && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Landing Home Page */}
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />

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
              <Route path="/dashboard/admin" element={<ProtectedRoute><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
              
              {/* Career Intelligence Engine Routes */}
              <Route path="/career-intelligence" element={<ProtectedRoute><PageTransition><CareerAnalysis /></PageTransition></ProtectedRoute>} />
              <Route path="/career/assessment" element={<ProtectedRoute><PageTransition><CareerAssessment /></PageTransition></ProtectedRoute>} />
              <Route path="/career/analysis" element={<ProtectedRoute><PageTransition><CareerAnalysis /></PageTransition></ProtectedRoute>} />
              <Route path="/career-roadmap" element={<ProtectedRoute><PageTransition><CareerRoadmap /></PageTransition></ProtectedRoute>} />
              <Route path="/career/roadmap" element={<ProtectedRoute><PageTransition><CareerRoadmap /></PageTransition></ProtectedRoute>} />

              {/* Smart Alumni Mentor Matching Routes */}
              <Route path="/mentors/recommended" element={<ProtectedRoute><PageTransition><MentorMatches /></PageTransition></ProtectedRoute>} />
              <Route path="/mentorship/matches" element={<ProtectedRoute><PageTransition><MentorMatches /></PageTransition></ProtectedRoute>} />
              <Route path="/mentorship/preferences" element={<ProtectedRoute><PageTransition><MentorPreferences /></PageTransition></ProtectedRoute>} />

              {/* AI CV Review Assistant Routes */}
              <Route path="/cv/ai-review" element={<ProtectedRoute><PageTransition><AiCvReviewPage /></PageTransition></ProtectedRoute>} />
              <Route path="/cv/ai-review/:cvId" element={<ProtectedRoute><PageTransition><AiCvReviewPage /></PageTransition></ProtectedRoute>} />
              <Route path="/ai" element={<ProtectedRoute><PageTransition><CareerAnalysis /></PageTransition></ProtectedRoute>} />

              {/* AlumniConnect Community Routes */}
              <Route path="/community" element={<ProtectedRoute><PageTransition><CommunityPage /></PageTransition></ProtectedRoute>} />
              <Route path="/community/ask" element={<ProtectedRoute><PageTransition><AskQuestionPage /></PageTransition></ProtectedRoute>} />
              <Route path="/community/questions/:questionId" element={<ProtectedRoute><PageTransition><QuestionDetailPage /></PageTransition></ProtectedRoute>} />
              <Route path="/community/my-questions" element={<ProtectedRoute><PageTransition><MyQuestionsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/community/saved" element={<ProtectedRoute><PageTransition><SavedQuestionsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/admin/community" element={<ProtectedRoute><PageTransition><AdminCommunityPage /></PageTransition></ProtectedRoute>} />
              <Route path="/admin/community/reports" element={<ProtectedRoute><PageTransition><AdminReportsPage /></PageTransition></ProtectedRoute>} />

              {/* Core Ecosystem Pages */}
              <Route path="/directory" element={<ProtectedRoute><PageTransition><AlumniDirectoryPage /></PageTransition></ProtectedRoute>} />
              <Route path="/jobs" element={<ProtectedRoute><PageTransition><JobsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/mentorship" element={<ProtectedRoute><PageTransition><MentorshipPage /></PageTransition></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><PageTransition><EventsPage /></PageTransition></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      {!isHomePage && <Footer />}
    </div>
  );
};
