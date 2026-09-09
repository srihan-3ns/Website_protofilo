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
import { Sparkles, Lock, ShieldCheck, Flame } from 'lucide-react';
import './styles/app.css';

const MainBody = ({ isApplyModalOpen, setIsApplyModalOpen, isContactModalOpen, setIsContactModalOpen }) => {
  const { currentExperience, currentRole } = useApp();

  return (
    <main className="main-content">
      {currentExperience === 'APPLICATION' ? (
        <ApplicationExperience />
      ) : currentExperience === 'LOGIN' ? (
        <LoginExperience />
      ) : currentExperience === 'LEARNING' ? (
        <>
          {currentRole === 'LECTURER' ? (
            <LecturerDashboard />
          ) : currentRole === 'ADMIN' ? (
            <AdminDashboard />
          ) : (
            <StudentDashboard />
          )}
        </>
      ) : (
        /* Default fallback: render PublicExperience */
        <PublicExperience 
          isApplyModalOpen={isApplyModalOpen} 
          setIsApplyModalOpen={setIsApplyModalOpen}
          isContactModalOpen={isContactModalOpen}
          setIsContactModalOpen={setIsContactModalOpen}
        />
      )}

      {/* Global Application Modal mounted inside MainBody for non-public views */}
      {currentExperience !== 'PUBLIC' && (
        <ApplicationModal 
          isOpen={isApplyModalOpen} 
          onClose={() => setIsApplyModalOpen(false)} 
        />
      )}
    </main>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // When unauthenticated: App is protected and gated behind the login portal
  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Gatekeeper Top Bar */}
        <header style={{
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--grad-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                NEEXUS ACADEMY
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', fontWeight: 600 }}>
                SECURE AUTHENTICATION GATEWAY
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              color: '#10b981',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontWeight: 700
            }}>
              <Flame size={14} color="#f97316" />
              <span>Firebase Auth Connected</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem',
              color: 'var(--text-subtle)',
              fontWeight: 600
            }}>
              <Lock size={14} color="var(--accent-primary)" />
              <span>Sign in required to open app</span>
            </div>
          </div>
        </header>

        {/* Login & Credential Portal */}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
          <LoginExperience />
        </main>

        <footer style={{
          borderTop: '1px solid var(--border-color)',
          padding: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          background: 'rgba(11, 15, 25, 0.9)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} color="var(--accent-primary)" />
              <span>NEEXUS ACADEMY • Protected Educational Platform</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              Integrated with Firebase (Project: <code>myhostalapp-b6a0d</code>)
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Once authenticated: User accesses the full application!
  return (
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
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
