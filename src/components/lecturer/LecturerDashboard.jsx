import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  FileText, 
  HelpCircle, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  Send, 
  Sparkles, 
  BookOpen, 
  Users, 
  Bell, 
  User, 
  Activity, 
  ChevronRight, 
  Mail 
} from 'lucide-react';

export const LecturerDashboard = () => {
  const { 
    courses, 
    doubts, 
    announcements,
    answerDoubt, 
    publishLesson,
    addAnnouncement
  } = useApp();

  const safeCourses = Array.isArray(courses) ? courses : [];
  const safeDoubts = Array.isArray(doubts) ? doubts : [];
  const safeAnnouncements = Array.isArray(announcements) ? announcements : [];

  // EXACT REQUESTED TABS: Overview | My Classes | Upload | Announcements | Doubts | Students | Profile
  const [activeTab, setActiveTab] = useState('OVERVIEW'); // 'OVERVIEW' | 'CLASSES' | 'UPLOAD' | 'ANNOUNCEMENTS' | 'DOUBTS' | 'STUDENTS' | 'PROFILE'

  // Doubt answer inline state
  const [activeDoubtToAnswer, setActiveDoubtToAnswer] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Announcement Form State
  const [ancForm, setAncForm] = useState({
    courseId: safeCourses[0]?.id || 'course-101',
    title: '',
    content: ''
  });
  const [ancMsg, setAncMsg] = useState(false);

  // Publish / Upload Form State
  const [uploadForm, setUploadForm] = useState({
    courseId: safeCourses[0]?.id || 'course-101',
    moduleTitle: 'Module 1: Foundations & Architecture',
    title: '',
    duration: '22 min',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: '',
    pdfTitle: 'Lecture_Slide_Notes.pdf',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    extLinkTitle: 'System Architecture Specification',
    extLinkUrl: 'https://developer.mozilla.org'
  });
  const [uploadMsg, setUploadMsg] = useState(false);

  // Enrolled Students Roster
  const [studentsList] = useState([
    { id: 'std-1', name: 'Srihan', email: 'student@neexus.org', course: 'Full-Stack Modern AI Web Engineering', progress: 75, lastActive: 'Today, 20:15', doubtsCount: 1 },
    { id: 'std-2', name: 'Alex Rivera', email: 'alex.rivera@example.com', course: 'Full-Stack Modern AI Web Engineering', progress: 50, lastActive: 'Yesterday', doubtsCount: 1 },
    { id: 'std-3', name: 'Samantha Chen', email: 's.chen@example.com', course: 'Cloud Native DevOps & System Administration', progress: 100, lastActive: 'Sep 07', doubtsCount: 0 },
    { id: 'std-4', name: 'Marcus Vance', email: 'm.vance@example.com', course: 'Full-Stack Modern AI Web Engineering', progress: 25, lastActive: 'Sep 06', doubtsCount: 0 }
  ]);

  const pendingDoubts = safeDoubts.filter(d => d.status === 'Pending');
  const resolvedDoubts = safeDoubts.filter(d => d.status === 'Resolved');

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (!ancForm.title.trim() || !ancForm.content.trim()) return;

    const courseObj = courses.find(c => c.id === ancForm.courseId);
    addAnnouncement({
      courseId: ancForm.courseId,
      courseTitle: courseObj ? courseObj.title : 'General Course',
      title: ancForm.title,
      content: ancForm.content,
      author: 'Dr. Murali Mohan (Lecturer)'
    });

    setAncMsg(true);
    setTimeout(() => setAncMsg(false), 4000);
    setAncForm({ ...ancForm, title: '', content: '' });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim()) return;

    publishLesson(uploadForm.courseId, uploadForm.moduleTitle, {
      title: uploadForm.title,
      duration: uploadForm.duration,
      videoUrl: uploadForm.videoUrl,
      summary: uploadForm.summary,
      pdfTitle: uploadForm.pdfTitle,
      pdfUrl: uploadForm.pdfUrl,
      resourceLinks: uploadForm.extLinkUrl ? [{ title: uploadForm.extLinkTitle, url: uploadForm.extLinkUrl }] : []
    });

    setUploadMsg(true);
    setTimeout(() => setUploadMsg(false), 4000);
    setUploadForm({
      ...uploadForm,
      title: '',
      summary: ''
    });
  };

  return (
    <div>
      {/* LECTURER HEADER */}
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-cyan">👨‍🏫 LECTURER COCKPIT</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lead Instructor: Dr. Murali Mohan</span>
          </div>
          <h1 className="page-title">Faculty Coursework & Mentorship</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('UPLOAD')}>
            <PlusCircle size={16} /> Upload New Lesson
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('ANNOUNCEMENTS')}>
            <Bell size={16} /> New Announcement
          </button>
        </div>
      </div>

      {/* EXACT USER-REQUESTED NAVBAR TABS: Overview | My Classes | Upload | Announcements | Doubts | Students | Profile */}
      <div style={{ 
        display: 'flex', 
        gap: '0.4rem', 
        marginBottom: '1.75rem', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '0.65rem',
        overflowX: 'auto'
      }}>
        <button 
          className={`exp-tab ${activeTab === 'OVERVIEW' ? 'active' : ''}`}
          onClick={() => setActiveTab('OVERVIEW')}
        >
          <Activity size={15} /> Overview
        </button>

        <button 
          className={`exp-tab ${activeTab === 'CLASSES' ? 'active' : ''}`}
          onClick={() => setActiveTab('CLASSES')}
        >
          <BookOpen size={15} /> My Classes ({courses.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'UPLOAD' ? 'active' : ''}`}
          onClick={() => setActiveTab('UPLOAD')}
        >
          <Video size={15} /> Upload
        </button>

        <button 
          className={`exp-tab ${activeTab === 'ANNOUNCEMENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ANNOUNCEMENTS')}
        >
          <Bell size={15} /> Announcements ({safeAnnouncements.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'DOUBTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('DOUBTS')}
        >
          <HelpCircle size={15} /> Doubts ({pendingDoubts.length} Pending)
        </button>

        <button 
          className={`exp-tab ${activeTab === 'STUDENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('STUDENTS')}
        >
          <Users size={15} /> Students ({studentsList.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'PROFILE' ? 'active' : ''}`}
          onClick={() => setActiveTab('PROFILE')}
        >
          <User size={15} /> Profile
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div>
          {/* Top KPI Metrics */}
          <div className="stats-grid" style={{ marginBottom: '2rem' }}>
            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-label">Assigned Classes</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)' }}>
                <HelpCircle size={24} />
              </div>
              <div>
                <div className="stat-value">{pendingDoubts.length}</div>
                <div className="stat-label">Doubts Requiring Reply</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="stat-value">{resolvedDoubts.length}</div>
                <div className="stat-label">Resolved Doubts</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                <Users size={24} />
              </div>
              <div>
                <div className="stat-value">2,310+</div>
                <div className="stat-label">Enrolled Students</div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Doubts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Priority Doubts from Students</h3>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('DOUBTS')}>
                  View All ({doubts.length})
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {pendingDoubts.slice(0, 3).map(doubt => (
                  <div key={doubt.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{doubt.studentName}</span>
                      <span style={{ color: 'var(--text-subtle)' }}>Timecode: {doubt.timestamp}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.65rem' }}>"{doubt.question}"</p>
                    <button className="btn btn-primary btn-sm" onClick={() => { setActiveTab('DOUBTS'); setActiveDoubtToAnswer(doubt.id); }}>
                      Answer Doubt Now
                    </button>
                  </div>
                ))}
                {pendingDoubts.length === 0 && (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    All student doubts have been answered!
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Lecturer Shortcuts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div 
                  onClick={() => setActiveTab('UPLOAD')}
                  className="glass-panel-glow" 
                  style={{ padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Video size={18} color="var(--accent-primary)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Upload Class Lecture</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Embed video, attach PDF and links</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>

                <div 
                  onClick={() => setActiveTab('ANNOUNCEMENTS')}
                  className="glass-panel-glow" 
                  style={{ padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Bell size={18} color="var(--accent-cyan)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Broadcast Announcement</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Notify all enrolled cohort students</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>

                <div 
                  onClick={() => setActiveTab('STUDENTS')}
                  className="glass-panel-glow" 
                  style={{ padding: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={18} color="var(--accent-success)" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Student Cohort Progress</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Track completion logs and activity</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MY CLASSES TAB */}
      {activeTab === 'CLASSES' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Assigned Academic Courses</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('UPLOAD')}>
              <PlusCircle size={16} /> Upload Lesson to Class
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {safeCourses.map(c => (
              <div key={c.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{c.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Category: {c.category} • Enrolled Learners: {c.enrolledCount}
                    </div>
                  </div>
                  <span className="badge badge-emerald">{(c.modules || []).reduce((acc, m) => acc + (m?.lessons?.length || 0), 0)} Total Lessons</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(c.modules || []).map(mod => (
                    <div key={mod.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                        {mod.title}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {(mod.lessons || []).map(les => (
                          <div key={les.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Video size={14} color="var(--accent-primary)" /> {les.title}
                            </span>
                            <span style={{ color: 'var(--text-subtle)' }}>{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. UPLOAD TAB */}
      {activeTab === 'UPLOAD' && (
        <div style={{ maxWidth: '850px' }}>
          <div className="glass-panel-glow" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Video size={20} color="var(--accent-primary)" /> Upload Class Lesson & Content
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Publish video lectures, attach PDF resource slides, external documentation links, and lesson notes.
            </p>

            <form onSubmit={handleUploadSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Class / Course</label>
                  <select 
                    className="form-select"
                    value={uploadForm.courseId}
                    onChange={(e) => setUploadForm({ ...uploadForm, courseId: e.target.value })}
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Module Classification</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Module 1: Foundations"
                    value={uploadForm.moduleTitle}
                    onChange={(e) => setUploadForm({ ...uploadForm, moduleTitle: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Lesson Video Title *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 1.4 Agentic System Boundaries"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Est. Duration</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 25 min"
                    value={uploadForm.duration}
                    onChange={(e) => setUploadForm({ ...uploadForm, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Video Embed / Source URL</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="https://www.youtube.com/embed/..."
                  value={uploadForm.videoUrl}
                  onChange={(e) => setUploadForm({ ...uploadForm, videoUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lesson Summary & Technical Overview</label>
                <textarea 
                  className="form-textarea" 
                  rows="3" 
                  placeholder="Key concepts, architectural patterns, and prerequisites..."
                  value={uploadForm.summary}
                  onChange={(e) => setUploadForm({ ...uploadForm, summary: e.target.value })}
                ></textarea>
              </div>

              {/* PDF & Resource Attachments */}
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} color="var(--accent-primary)" /> Attached PDF Document & External Resources
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">PDF File Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Lecture_Slides_Module1.pdf"
                      value={uploadForm.pdfTitle}
                      onChange={(e) => setUploadForm({ ...uploadForm, pdfTitle: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">PDF URL Link</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="https://..."
                      value={uploadForm.pdfUrl}
                      onChange={(e) => setUploadForm({ ...uploadForm, pdfUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">External Resource Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Architectural Blueprint"
                      value={uploadForm.extLinkTitle}
                      onChange={(e) => setUploadForm({ ...uploadForm, extLinkTitle: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">External Resource URL</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="https://..."
                      value={uploadForm.extLinkUrl}
                      onChange={(e) => setUploadForm({ ...uploadForm, extLinkUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontWeight: 700 }}>
                <Sparkles size={18} /> Upload & Publish Lesson Live
              </button>

              {uploadMsg && (
                <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-success)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>
                  ✓ Published successfully! Open Student Portal to verify the new lesson.
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 4. ANNOUNCEMENTS TAB */}
      {activeTab === 'ANNOUNCEMENTS' && (
        <div style={{ maxWidth: '850px' }}>
          <div className="glass-panel-glow" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={20} color="var(--accent-primary)" /> Broadcast Class Announcement
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Send announcements directly to enrolled students. Notifications appear live in their Student Portal.
            </p>

            <form onSubmit={handleAnnouncementSubmit}>
              <div className="form-group">
                <label className="form-label">Target Class / Course</label>
                <select 
                  className="form-select"
                  value={ancForm.courseId}
                  onChange={(e) => setAncForm({ ...ancForm, courseId: e.target.value })}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Announcement Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Architecture Deep-Dive Live Workshop this Friday"
                  value={ancForm.title}
                  onChange={(e) => setAncForm({ ...ancForm, title: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message Details *</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Provide all essential details, zoom links, or preparation notes..."
                  value={ancForm.content}
                  onChange={(e) => setAncForm({ ...ancForm, content: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}>
                <Send size={16} /> Broadcast Announcement
              </button>

              {ancMsg && (
                <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-success)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontWeight: 600 }}>
                  ✓ Announcement published and broadcast to students!
                </div>
              )}
            </form>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Existing Announcements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {announcements && announcements.map(anc => (
              <div key={anc.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{anc.title}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{anc.date}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '0.5rem' }}>{anc.courseTitle}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{anc.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DOUBTS TAB */}
      {activeTab === 'DOUBTS' && (
        <div style={{ maxWidth: '950px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Student Doubt Resolution Queue
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {doubts.map((doubt) => (
              <div key={doubt.id} className="glass-panel-glow" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span className="badge badge-indigo" style={{ marginRight: '0.5rem' }}>
                      {doubt.lessonTitle}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Timestamp: <strong>{doubt.timestamp}</strong>
                    </span>
                  </div>

                  {doubt.status === 'Resolved' ? (
                    <span className="badge badge-emerald"><CheckCircle size={14} /> Answered & Resolved</span>
                  ) : (
                    <span className="badge badge-amber"><Clock size={14} /> Action Needed</span>
                  )}
                </div>

                {doubt.status === 'Pending' ? (
                  <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="badge badge-amber" style={{ fontWeight: 800, letterSpacing: '0.05em' }}>
                        PENDING DOUBT
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>Timecode: {doubt.timestamp}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.4rem 0.85rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>Student:</span>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{doubt.studentName || 'Rahul'}</span>

                      <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>Topic:</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{doubt.topic || 'Full Adder'}</span>

                      <span style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>Question:</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{doubt.question || 'How is Cout derived?'}</span>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const finalReply = (activeDoubtToAnswer === doubt.id && replyText.trim()) 
                        ? replyText.trim() 
                        : 'Cout is derived from the Full Adder truth table: Cout = A·B + Cin·(A ⊕ B), or simplified as A·B + B·Cin + A·Cin. When any two inputs are 1, a carry out is generated.';
                      answerDoubt(doubt.id, finalReply);
                      setActiveDoubtToAnswer(null);
                      setReplyText('');
                    }}>
                      <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <label className="form-label">Reply:</label>
                        <textarea 
                          className="form-textarea" 
                          rows="3" 
                          placeholder="Type explanation: Cout = A·B + Cin·(A ⊕ B)..."
                          value={activeDoubtToAnswer === doubt.id ? replyText : ''}
                          onChange={(e) => {
                            setActiveDoubtToAnswer(doubt.id);
                            setReplyText(e.target.value);
                          }}
                        ></textarea>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ fontWeight: 800, padding: '0.55rem 1.25rem' }}>
                          <Send size={14} /> [ SEND RESPONSE ]
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid var(--accent-success)', padding: '1rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', marginTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-success)', marginBottom: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>✓ Answered & Resolved by {doubt.repliedBy || 'Dr. Murali Mohan'}</span>
                      <span style={{ color: 'var(--text-subtle)' }}>{doubt.repliedAt}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      <strong>Question from {doubt.studentName}:</strong> "{doubt.question}"
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong>Faculty Response:</strong> {doubt.reply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. STUDENTS TAB */}
      {activeTab === 'STUDENTS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Enrolled Student Roster</h2>
            <span className="badge badge-emerald">{studentsList.length} Active Students</span>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem' }}>Student Name</th>
                  <th style={{ padding: '1rem' }}>Enrolled Class</th>
                  <th style={{ padding: '1rem' }}>Curriculum Progress</th>
                  <th style={{ padding: '1rem' }}>Last Active</th>
                  <th style={{ padding: '1rem' }}>Doubts Raised</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.map(std => (
                  <tr key={std.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{std.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{std.email}</div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{std.course}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="progress-bar-bg" style={{ width: '100px' }}>
                          <div className="progress-bar-fill" style={{ width: `${std.progress}%` }}></div>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{std.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{std.lastActive}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-indigo">{std.doubtsCount} doubts</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => alert(`Direct message dispatched to ${std.name}`)}>
                        <Mail size={13} /> Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. PROFILE TAB */}
      {activeTab === 'PROFILE' && (
        <div style={{ maxWidth: '850px' }}>
          <div className="glass-panel-glow" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'var(--grad-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem', 
                fontWeight: 800,
                color: 'white',
                boxShadow: 'var(--shadow-glow)'
              }}>
                MM
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dr. Murali Mohan</h2>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                  Senior AI & System Architect • Lead Faculty
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Department of Advanced Software Architecture • Neexus Academy
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Academic Specializations</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-indigo">Agentic AI Models</span>
                  <span className="badge badge-cyan">Full-Stack Reactive State</span>
                  <span className="badge badge-emerald">Microservices</span>
                  <span className="badge badge-amber">Cloud DevOps</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Office Hours & Live Mentorship</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div>Tuesdays & Thursdays: 4:00 PM – 6:00 PM IST</div>
                  <div>Live Architecture Clinic: Every Saturday 11:00 AM IST</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Faculty Bio</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                Dr. Murali Mohan has over 15 years of industry experience architecting distributed enterprise platforms and leading high-performance engineering teams. At Neexus Academy, Dr. Mohan directs curricula on full-stack AI engineering, real-time reactive architectures, and production cloud infrastructure.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
