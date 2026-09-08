import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export const ApplicationModal = ({ isOpen, onClose, preselectedCourse }) => {
  const { submitApplication, courses, setCurrentExperience } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetCourse: preselectedCourse || courses[0]?.title || 'Full-Stack Modern AI Web Engineering',
    experience: 'Intermediate (1-3 Yrs)',
    statement: ''
  });

  const [submittedCode, setSubmittedCode] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const trackingCode = submitApplication(formData);
    setSubmittedCode(trackingCode);
  };

  const handleGoToTracker = () => {
    onClose();
    setCurrentExperience('APPLICATION');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles className="text-indigo" size={20} color="var(--accent-primary)" />
            <h3 className="modal-title">Student Admission Application</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        {submittedCode ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={56} color="var(--accent-success)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Application Submitted!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Your application tracking code is <strong style={{ color: 'var(--accent-primary)' }}>{submittedCode}</strong>.
            </p>
            <div className="glass-panel" style={{ padding: '1rem', margin: '1.5rem 0', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Applicant: {formData.name} ({formData.email})</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>Target Stream: {formData.targetCourse}</div>
              <div className="badge badge-amber" style={{ marginTop: '0.75rem' }}>Status: Pending Admin Review</div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={handleGoToTracker}>
                Track Application Status Now
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Apply for cohort admission to our premium learning programs. Once approved by our Host/Admin team, you get full LMS access.
            </p>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Alex Rivera" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="alex.rivera@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Desired Learning Program / Course</label>
              <select 
                className="form-select"
                value={formData.targetCourse}
                onChange={(e) => setFormData({ ...formData, targetCourse: e.target.value })}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Prior Technical Experience</label>
              <select 
                className="form-select"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              >
                <option value="Beginner (0-1 Yrs)">Beginner (0-1 Yrs)</option>
                <option value="Intermediate (1-3 Yrs)">Intermediate (1-3 Yrs)</option>
                <option value="Advanced (3+ Yrs)">Advanced (3+ Yrs)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Statement of Purpose / Goals</label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                placeholder="Briefly describe your career goals and what you hope to achieve..."
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                <Send size={16} /> Submit Admission Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
