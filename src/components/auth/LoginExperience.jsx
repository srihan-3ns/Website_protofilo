import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Zap,
  UserPlus,
  ShieldAlert,
  Flame,
  User,
  Key
} from 'lucide-react';

export const LoginExperience = () => {
  const { 
    loginWithCredentials, 
    registerWithCredentials,
    setCurrentExperience, 
    registeredUsers,
    demoUsers 
  } = useApp();

  // Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState('signin');

  // Sign In fields
  const [email, setEmail] = useState('student@neexus.org');
  const [password, setPassword] = useState('password123');

  // Registration fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('STUDENT');

  // Role check simulation state
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const [roleCheckStep, setRoleCheckStep] = useState(0); 
  const [verifiedRole, setVerifiedRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const accountsList = registeredUsers && registeredUsers.length > 0 ? registeredUsers : demoUsers;

  const handleDemoSelect = (user) => {
    setAuthMode('signin');
    setEmail(user.email);
    setPassword(user.password || 'password123');
    setErrorMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsCheckingRole(true);
    setRoleCheckStep(1); // Verifying credentials

    try {
      const result = await loginWithCredentials(email, password);

      if (!result.success) {
        setIsCheckingRole(false);
        setRoleCheckStep(0);
        setErrorMessage(result.error || 'Invalid credentials. Please verify email and password.');
        return;
      }

      setRoleCheckStep(2); // Role Check
      setVerifiedRole(result.role);

      setTimeout(() => {
        setRoleCheckStep(3); // Role Confirmed
        setTimeout(() => {
          setRoleCheckStep(4); // Redirecting to Dashboard
          setTimeout(() => {
            setCurrentExperience('LEARNING');
            setIsCheckingRole(false);
          }, 700);
        }, 700);
      }, 700);
    } catch (err) {
      setIsCheckingRole(false);
      setRoleCheckStep(0);
      setErrorMessage(err.message || 'Authentication error occurred.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!regEmail || !regPassword) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsCheckingRole(true);
    setRoleCheckStep(1); // Provisioning account

    try {
      const result = await registerWithCredentials({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole
      });

      if (!result.success) {
        setIsCheckingRole(false);
        setRoleCheckStep(0);
        setErrorMessage(result.error || 'Failed to create account.');
        return;
      }

      setRoleCheckStep(2); // RBAC Provisioning
      setVerifiedRole(result.role);

      setTimeout(() => {
        setRoleCheckStep(3); // Role Confirmed
        setTimeout(() => {
          setRoleCheckStep(4); // Redirecting
          setTimeout(() => {
            setCurrentExperience('LEARNING');
            setIsCheckingRole(false);
          }, 700);
        }, 700);
      }, 700);
    } catch (err) {
      setIsCheckingRole(false);
      setRoleCheckStep(0);
      setErrorMessage(err.message || 'Failed to register account.');
    }
  };

  return (
    <div style={{ maxWidth: '980px', margin: '2rem auto', padding: '1rem' }}>
      {/* Visual Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }} className="badge badge-indigo">
          <Flame size={14} color="#f97316" /> FIREBASE AUTHENTICATED GATEWAY
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Unified Platform Sign In
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
          Log in with your credentials to access your personalized Student, Lecturer, or Admin dashboard.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(280px, 1fr)', gap: '2rem', alignItems: 'start' }}>
        {/* Left: Login / Register Form & Role Check Stepper */}
        <div className="glass-panel-glow" style={{ padding: '2.25rem' }}>
          {/* Mode Switcher Tab */}
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', padding: '0.25rem', marginBottom: '1.75rem' }}>
            <button
              onClick={() => { setAuthMode('signin'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '0.55rem',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: authMode === 'signin' ? 'var(--accent-primary)' : 'transparent',
                color: authMode === 'signin' ? 'white' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
              style={{
                flex: 1,
                padding: '0.55rem',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: authMode === 'register' ? 'var(--accent-primary)' : 'transparent',
                color: authMode === 'register' ? 'white' : 'var(--text-muted)',
                transition: 'all 0.15s ease'
              }}
            >
              Create Account
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={18} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {authMode === 'signin' ? 'Account Credentials' : 'Register New Account'}
              </h2>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              Firebase Online
            </span>
          </div>

          {errorMessage && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              <ShieldAlert size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

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
                  AUTHENTICATION [credentials verified]
                </div>
                <div style={{ color: 'var(--text-subtle)' }}>↓</div>
                <div style={{ color: roleCheckStep >= 2 ? 'var(--accent-warning)' : 'var(--text-muted)', fontWeight: 700 }}>
                  ROLE MATRIX {roleCheckStep === 2 && '⏳ [inspecting permissions matrix...]'}
                </div>
                <div style={{ color: 'var(--text-subtle)' }}>│</div>
                <div style={{ 
                  color: verifiedRole === 'STUDENT' ? 'var(--accent-success)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'STUDENT' ? 800 : 400 
                }}>
                  ├── STUDENT → Student Learning Dashboard {verifiedRole === 'STUDENT' && '✓'}
                </div>
                <div style={{ 
                  color: verifiedRole === 'LECTURER' ? 'var(--accent-cyan)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'LECTURER' ? 800 : 400 
                }}>
                  ├── LECTURER → Lecturer Management Portal {verifiedRole === 'LECTURER' && '✓'}
                </div>
                <div style={{ 
                  color: verifiedRole === 'ADMIN' ? 'var(--accent-warning)' : 'var(--text-subtle)', 
                  fontWeight: verifiedRole === 'ADMIN' ? 800 : 400 
                }}>
                  └── ADMIN → Host & Governance Dashboard {verifiedRole === 'ADMIN' && '✓'}
                </div>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {roleCheckStep === 1 && '1. Authenticating secure credentials with Firebase...'}
                {roleCheckStep === 2 && '2. Running Role Check & RBAC Access Matrix...'}
                {roleCheckStep === 3 && `3. Role Verified: ${verifiedRole}!`}
                {roleCheckStep === 4 && `4. Unlocking app & opening ${verifiedRole} Dashboard...`}
              </div>
            </div>
          ) : authMode === 'signin' ? (
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
                    placeholder="Enter email address"
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
                    placeholder="Enter password"
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontWeight: 800, marginTop: '0.5rem' }}
              >
                Sign In & Open App <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ paddingLeft: '2.25rem' }}
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Your Full Name"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="email" 
                    className="form-input" 
                    style={{ paddingLeft: '2.25rem' }}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Create Password (min 6 chars)</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="password" 
                    className="form-input" 
                    style={{ paddingLeft: '2.25rem' }}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Enter secure password"
                    minLength={6}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Account Role</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {[
                    { id: 'STUDENT', label: '🎓 Student' },
                    { id: 'LECTURER', label: '👨‍🏫 Lecturer' },
                    { id: 'ADMIN', label: '👑 Admin' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegRole(r.id)}
                      style={{
                        padding: '0.55rem 0.25rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        border: regRole === r.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-xs)',
                        background: regRole === r.id ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)',
                        color: regRole === r.id ? 'white' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontWeight: 800, marginTop: '0.75rem' }}
              >
                Create Account & Sign In <UserPlus size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Right: Available Credentials & Demo Personas */}
        <div>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Key size={18} color="var(--accent-primary)" /> Ready Login Credentials
              </h3>
              <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>1-Click Login</span>
            </div>
            
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Click any account below to auto-fill credentials and evaluate the Role Check & portal access:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {accountsList.map((user) => (
                <div 
                  key={user.id || user.email}
                  onClick={() => handleDemoSelect(user)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: email === user.email ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-tertiary)',
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
                      {user.avatar || 'U'}
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

            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.25rem', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              <div style={{ marginBottom: '0.35rem' }}>
                🔑 Standard Password: <code style={{ color: 'var(--accent-primary)' }}>password123</code>
              </div>
              <div>
                🔥 Connected Firebase: <code>myhostalapp-b6a0d</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
