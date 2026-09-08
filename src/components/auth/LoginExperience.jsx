import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  BookOpen, 
  Users,
  Zap,
  Clock
} from 'lucide-react';

export const LoginExperience = () => {
  const { 
    loginWithCredentials, 
    setCurrentExperience, 
    demoUsers 
  } = useApp();

  const [email, setEmail] = useState('student@neexus.org');
  const [password, setPassword] = useState('password123');

  // Role check simulation state
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const [roleCheckStep, setRoleCheckStep] = useState(0); // 0: Idle, 1: Verifying credentials, 2: Checking Role Matrix, 3: Role Confirmed, 4: Redirecting
  const [verifiedRole, setVerifiedRole] = useState(null);

  const handleDemoSelect = (user) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Trigger visual ROLE CHECK pipeline
    setIsCheckingRole(true);
    setRoleCheckStep(1);

    setTimeout(() => {
      setRoleCheckStep(2); // Role Check
      const result = loginWithCredentials(email, password);
      setVerifiedRole(result.role);

      setTimeout(() => {
        setRoleCheckStep(3); // Role Confirmed

        setTimeout(() => {
          setRoleCheckStep(4); // Redirecting to Dashboard
          setTimeout(() => {
            setCurrentExperience('LEARNING');
            setIsCheckingRole(false);
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      {/* Visual Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>
          <Sparkles size={14} /> SECURE PORTAL GATEWAY
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Unified Platform Sign In
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          Role-governed authentication dynamically routing to Student, Lecturer, or Admin Dashboards.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.2fr) minmax(280px, 1fr)', gap: '2rem', alignItems: 'start' }}>
        {/* Left: Login Form & Role Check Stepper */}
        <div className="glass-panel-glow" style={{ padding: '2.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Lock size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Account Credentials</h2>
          </div>

          {isCheckingRole ? (
            /* ANIMATED ROLE CHECK SCREEN */
            <div style={{ padding: '1.5rem 0', textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: roleCheckStep >= 3 ? 'var(--grad-success)' : 'var(--grad-primary)', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem auto',
                boxShadow: 'var(--shadow-glow)'
              }}>
                {roleCheckStep >= 3 ? <CheckCircle2 size={32} /> : <Zap size={30} />}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                ROLE VERIFICATION ENGINE
              </div>

              {/* Stepper Tree Visual (LOGIN -> ROLE CHECK -> DASHBOARD) */}
              <div style={{ 
                background: 'var(--bg-tertiary)', 
                borderRadius: 'var(--radius-md)', 
                padding: '1.25rem', 
                margin: '1.5rem 0', 
                textAlign: 'left',
                fontFamily: 'monospace',
                fontSize: '0.88rem'
              }}>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                  LOGIN [credentials verified]
                </div>
                <div style={{ color: 'var(--text-subtle)' }}>↓</div>
                <div style={{ color: roleCheckStep >= 2 ? 'var(--accent-warning)' : 'var(--text-muted)', fontWeight: 700 }}>
                  ROLE CHECK {roleCheckStep === 2 && '⏳ [inspecting permissions matrix...]'}
                </div>
                <div style={{ color: 'var(--text-subtle)' }}>│</div>
                <div style={{ 
                  color: verifiedRole === 'STUDENT' ? 'var(--accent-success)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'STUDENT' ? 800 : 400 
                }}>
                  ├── STUDENT → Student Dashboard {verifiedRole === 'STUDENT' && '✓'}
                </div>
                <div style={{ 
                  color: verifiedRole === 'LECTURER' ? 'var(--accent-cyan)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'LECTURER' ? 800 : 400 
                }}>
                  ├── LECTURER → Lecturer Dashboard {verifiedRole === 'LECTURER' && '✓'}
                </div>
                <div style={{ 
                  color: verifiedRole === 'ADMIN' ? 'var(--accent-warning)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'ADMIN' ? 800 : 400 
                }}>
                  └── ADMIN → Admin Dashboard {verifiedRole === 'ADMIN' && '✓'}
                </div>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {roleCheckStep === 1 && '1. Authenticating secure credentials...'}
                {roleCheckStep === 2 && '2. Running Role Check & RBAC Access Matrix...'}
                {roleCheckStep === 3 && `3. Role Verified: ${verifiedRole}!`}
                {roleCheckStep === 4 && `4. Routing to ${verifiedRole} Dashboard...`}
              </div>
            </div>
          ) : (
            /* STANDARD LOGIN FORM */
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ paddingLeft: '2.25rem' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="password" 
                    className="form-input" 
                    style={{ paddingLeft: '2.25rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}
              >
                Sign In & Execute Role Check <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Right: 1-Click Persona Selectors */}
        <div>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} color="var(--accent-primary)" /> Demo Test Personas
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Click any demo account below to auto-fill credentials and evaluate the Role Check flow:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {demoUsers.map((user) => (
                <div 
                  key={user.id}
                  onClick={() => handleDemoSelect(user)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: email === user.email ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                    border: email === user.email ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: user.role === 'ADMIN' ? 'var(--grad-warning)' : (user.role === 'LECTURER' ? 'var(--grad-primary)' : 'var(--grad-success)'),
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      color: 'white'
                    }}>
                      {user.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                  </div>

                  <span className={`badge ${user.role === 'ADMIN' ? 'badge-amber' : (user.role === 'LECTURER' ? 'badge-cyan' : 'badge-indigo')}`}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.5rem', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              Password for all accounts: <code style={{ color: 'var(--accent-primary)' }}>password123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
