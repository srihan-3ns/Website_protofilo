import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { PublicExperience } from './components/public/PublicExperience';
import { ApplicationExperience } from './components/application/ApplicationExperience';
import { LoginExperience } from './components/auth/LoginExperience';
import { StudentDashboard } from './components/student/StudentDashboard';
import { LecturerDashboard } from './components/lecturer/LecturerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ApplicationModal } from './components/public/ApplicationModal';
import './styles/app.css';

const MainBody = ({ isApplyModalOpen, setIsApplyModalOpen, isContactModalOpen, setIsContactModalOpen }) => {
  const { currentExperience, currentRole } = useApp();

  return (
    <main className="main-content">
      {currentExperience === 'PUBLIC' && (
        <PublicExperience 
          isApplyModalOpen={isApplyModalOpen} 
          setIsApplyModalOpen={setIsApplyModalOpen}
          isContactModalOpen={isContactModalOpen}
          setIsContactModalOpen={setIsContactModalOpen}
        />
      )}
      {currentExperience === 'APPLICATION' && <ApplicationExperience />}
      {currentExperience === 'LOGIN' && <LoginExperience />}
      {currentExperience === 'LEARNING' && (
        <>
          {currentRole === 'STUDENT' && <StudentDashboard />}
          {currentRole === 'LECTURER' && <LecturerDashboard />}
          {currentRole === 'ADMIN' && <AdminDashboard />}
        </>
      )}
    </main>
  );
};

export function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <AppProvider>
      <div className="app-container">
        <Header 
          onOpenApplyModal={() => setIsApplyModalOpen(true)}
          onOpenContactModal={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <MainBody 
          isApplyModalOpen={isApplyModalOpen} 
          setIsApplyModalOpen={setIsApplyModalOpen}
          isContactModalOpen={isContactModalOpen}
          setIsContactModalOpen={setIsContactModalOpen}
        />
        
        <footer style={{
          borderTop: '1px solid var(--border-color)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          background: 'rgba(11, 15, 25, 0.85)',
          marginTop: 'auto'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>NEEXUS ACADEMY</strong> • ONE PLATFORM • THREE EXPERIENCES
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.78rem' }}>
              <span>PUBLIC WEBSITE</span>
              <span>•</span>
              <span>APPLICATION TRACKING</span>
              <span>•</span>
              <span>LOGIN & ROLE CHECK</span>
              <span>•</span>
              <span>LEARNING PORTAL</span>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', color: 'var(--text-subtle)', fontSize: '0.75rem' }}>
            Roles: Student (learn, mark Read, progress, doubts) • Lecturer (Overview, My Classes, Upload, Announcements, Doubts, Students, Profile) • Admin (applications, users, courses, permissions, reports)
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
