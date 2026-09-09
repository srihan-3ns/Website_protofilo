import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck, 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';

export const ApplicationExperience = () => {
  const { 
    applications, 
    userAppTrackingCode, 
    setUserAppTrackingCode, 
    setCurrentExperience, 
    setCurrentRole 
  } = useApp();

  const safeApps = Array.isArray(applications) ? applications : [];
  const [searchInput, setSearchInput] = useState(userAppTrackingCode || 'APP-9081');
  const [selectedAppCode, setSelectedAppCode] = useState(userAppTrackingCode || 'APP-9081');

  const safeCode = String(selectedAppCode || 'APP-9081').toLowerCase();
  const activeApp = safeApps.find(a => a?.id && a.id.toLowerCase() === safeCode) || safeApps[0] || null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    const searchTarget = searchInput.trim().toLowerCase();
    const found = safeApps.find(a => a?.id && a.id.toLowerCase() === searchTarget);
    if (found) {
      setSelectedAppCode(found.id);
      setUserAppTrackingCode(found.id);
    } else {
      alert(`Application with code "${searchInput}" not found. Try APP-9081 or APP-9082.`);
    }
  };

  const handleLaunchLearningPortal = () => {
    setCurrentRole('STUDENT');
    setCurrentExperience('LEARNING');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="badge badge-emerald"><CheckCircle2 size={14} /> Approved & Admitted</span>;
      case 'Rejected':
        return <span className="badge badge-rose"><XCircle size={14} /> Application Declined</span>;
      case 'Action Required':
        return <span className="badge badge-amber"><AlertTriangle size={14} /> Action Required</span>;
      default:
        return <span className="badge badge-indigo"><Clock size={14} /> Under Admin Review</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileCheck className="text-indigo" size={28} color="var(--accent-primary)" /> Prospective Student Application Portal
          </h1>
          <p className="page-subtitle">Track admission status, view reviewer notes, and access portal credentials.</p>
        </div>

        {/* SEARCH / TRACKING CODE INPUT */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '380px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Enter Code (e.g. APP-9081)" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>
          <button type="submit" className="btn btn-secondary">Track</button>
        </form>
      </div>

      {/* QUICK PRESET SELECTOR FOR DEMO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Demo Samples:</span>
        {safeApps.map(app => (
          <button 
            key={app.id} 
            className={`btn btn-sm ${app.id === activeApp?.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setSelectedAppCode(app.id);
              setUserAppTrackingCode(app.id);
              setSearchInput(app.id);
            }}
          >
            {app.id} ({app.applicantName} - {app.status})
          </button>
        ))}
      </div>

      {activeApp ? (
        <div>
          {/* STEPPER PROGRESS TIMELINE */}
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tracking Code:</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{activeApp.id}</h2>
              </div>
              <div>{getStatusBadge(activeApp.status)}</div>
            </div>

            {/* Stepper visuals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative', margin: '1rem 0' }}>
              {/* Step 1 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto', fontWeight: 700 }}>
                  <CheckCircle2 size={20} />
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>1. Application Received</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{activeApp.submittedAt}</div>
              </div>

              {/* Step 2 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: activeApp.status !== 'Pending' ? 'var(--accent-success)' : 'var(--accent-primary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.5rem auto', 
                  fontWeight: 700 
                }}>
                  {activeApp.status !== 'Pending' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>2. Admin Evaluation</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Host / Admin Panel</div>
              </div>

              {/* Step 3 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: activeApp.status === 'Approved' ? 'var(--accent-success)' : (activeApp.status === 'Rejected' ? 'var(--accent-danger)' : 'var(--bg-tertiary)'), 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.5rem auto', 
                  fontWeight: 700 
                }}>
                  {activeApp.status === 'Approved' ? <CheckCircle2 size={20} /> : (activeApp.status === 'Rejected' ? <XCircle size={20} /> : <ShieldCheck size={20} />)}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>3. Admission Decision</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{activeApp.status}</div>
              </div>

              {/* Step 4 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  background: activeApp.status === 'Approved' ? 'var(--grad-primary)' : 'var(--bg-tertiary)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 0.5rem auto', 
                  fontWeight: 700 
                }}>
                  <Sparkles size={20} />
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>4. LMS Portal Access</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{activeApp.status === 'Approved' ? 'Ready to Learn' : 'Locked'}</div>
              </div>
            </div>
          </div>

          {/* APPLICATION DETAILS & HOST NOTES */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Applicant Summary */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--accent-primary)" /> Application Breakdown
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Full Applicant Name</div>
                  <div style={{ fontWeight: 600 }}>{activeApp.applicantName}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email Contact</div>
                  <div style={{ fontWeight: 600 }}>{activeApp.email}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Applied Program Track</div>
                  <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{activeApp.targetCourse}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Technical Background Level</div>
                  <div style={{ fontWeight: 600 }}>{activeApp.experienceLevel}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Statement of Purpose</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-tertiary)', padding: '0.65rem', borderRadius: 'var(--radius-sm)', marginTop: '0.2rem' }}>
                    "{activeApp.statement}"
                  </div>
                </div>
              </div>
            </div>

            {/* Host / Admin Notes & Portal Launch Action */}
            <div className="glass-panel-glow" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="var(--accent-success)" /> Host & Admissions Review
                </h3>

                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.3rem' }}>Reviewer Notes:</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {activeApp.adminNotes || 'No notes left by admissions officer yet.'}
                  </p>
                </div>
              </div>

              <div>
                {activeApp.status === 'Approved' ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-success)', marginBottom: '0.4rem' }}>
                      Congratulations! You are Admitted.
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Your enrollment into {activeApp.targetCourse} is fully confirmed.
                    </p>
                    <button className="btn btn-primary" style={{ width: '100%', background: 'var(--grad-success)' }} onClick={handleLaunchLearningPortal}>
                      Launch Learning Portal Now <ArrowRight size={18} />
                    </button>
                  </div>
                ) : activeApp.status === 'Pending' ? (
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
                    <Clock size={32} color="var(--accent-primary)" style={{ margin: '0 auto 0.5rem auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Under Active Admissions Review</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Tip: You can switch to the <strong>Host / Admin Role</strong> in the top header bar to approve this application right now!
                    </p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)' }}>
                    <XCircle size={32} color="var(--accent-danger)" style={{ margin: '0 auto 0.5rem auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Application Decision Recorded</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Please contact admissions or submit a new application.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No active application found.</p>
        </div>
      )}
    </div>
  );
};
