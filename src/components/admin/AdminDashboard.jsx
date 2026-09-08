import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard,
  FileCheck, 
  Users, 
  GraduationCap,
  BookOpen, 
  Layers, 
  Video, 
  HelpCircle, 
  Bell, 
  FileSpreadsheet,
  Search,
  PlusCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Download, 
  Lock, 
  MessageSquare,
  Sparkles,
  UserPlus,
  Send,
  Eye,
  Check,
  AlertCircle,
  TrendingUp,
  Cpu,
  Mail,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    applications, 
    updateApplicationStatus, 
    courses, 
    doubts, 
    answerDoubt,
    announcements,
    addAnnouncement,
    activityLogs,
    completedLessons,
    contactInquiries
  } = useApp();

  // EXACT 10 REQUESTED TABS:
  // Dashboard | Applications | Students | Lecturers | Courses | Enrollments | Content | Doubts | Announcements | Reports
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  // Application table filters & search
  const [appFilter, setAppFilter] = useState('ALL'); // 'ALL' | 'Pending' | 'Approved' | 'Rejected'
  const [appSearch, setAppSearch] = useState('');

  // Selected App for Admin Notes Modal
  const [editingApp, setEditingApp] = useState(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Doubt filter & state
  const [doubtFilter, setDoubtFilter] = useState('ALL'); // 'ALL' | 'Pending' | 'Resolved'
  const [adminReplyDoubtId, setAdminReplyDoubtId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Content tab course selector
  const [contentCourseId, setContentCourseId] = useState(courses[0]?.id || 'course-vlsi');
  const selectedContentCourse = courses.find(c => c.id === contentCourseId) || courses[0];

  // Announcement composer state
  const [ancTargetCourse, setAncTargetCourse] = useState('ALL');
  const [ancTitle, setAncTitle] = useState('');
  const [ancContent, setAncContent] = useState('');
  const [ancSuccessMsg, setAncSuccessMsg] = useState(false);

  // Student Directory State
  const [studentSearch, setStudentSearch] = useState('');
  const [studentsList, setStudentsList] = useState([
    { id: 'std-1', name: 'Rahul', email: 'student@neexus.org', course: 'VLSI ENGINEERING', progress: 75, completedItems: 15, totalItems: 20, doubtsCount: 1, status: 'Active', enrolledAt: '2026-08-15' },
    { id: 'std-2', name: 'Srihan', email: 'srihan@example.com', course: 'VLSI ENGINEERING', progress: 85, completedItems: 17, totalItems: 20, doubtsCount: 1, status: 'Active', enrolledAt: '2026-08-10' },
    { id: 'std-3', name: 'Alex Rivera', email: 'alex.rivera@example.com', course: 'Full-Stack Modern AI Web Engineering', progress: 40, completedItems: 2, totalItems: 5, doubtsCount: 0, status: 'Active', enrolledAt: '2026-09-01' },
    { id: 'std-4', name: 'Samantha Chen', email: 's.chen@example.com', course: 'Cloud Native DevOps & System Administration', progress: 100, completedItems: 5, totalItems: 5, doubtsCount: 0, status: 'Active', enrolledAt: '2026-07-20' },
    { id: 'std-5', name: 'Marcus Vance', email: 'm.vance@example.com', course: 'VLSI ENGINEERING', progress: 20, completedItems: 4, totalItems: 20, doubtsCount: 0, status: 'Active', enrolledAt: '2026-09-05' }
  ]);

  // Lecturer Directory State
  const [lecturersList, setLecturersList] = useState([
    { id: 'lec-1', name: 'Dr. Murali Mohan', email: 'murali.mohan@neexus.org', title: 'Senior Silicon Architect & VLSI Lead', assignedCourse: 'VLSI ENGINEERING', modulesTaught: 4, doubtsResolved: 1, rating: 4.95, status: 'Active' },
    { id: 'lec-2', name: 'Prof. Sarah Jenkins', email: 'lecturer@neexus.org', title: 'Senior Full-Stack Architect', assignedCourse: 'Full-Stack Modern AI Web Engineering', modulesTaught: 2, doubtsResolved: 3, rating: 4.90, status: 'Active' },
    { id: 'lec-3', name: 'Dr. Elena Rostova', email: 'e.rostova@neexus.org', title: 'Cloud Infrastructure Specialist', assignedCourse: 'Cloud Native DevOps & System Administration', modulesTaught: 3, doubtsResolved: 2, rating: 4.88, status: 'Active' }
  ]);

  // Enrollments State
  const [enrollmentsList, setEnrollmentsList] = useState([
    { id: 'ENR-801', studentName: 'Rahul', studentEmail: 'student@neexus.org', courseTitle: 'VLSI ENGINEERING', progress: 75, status: 'In Progress', date: '2026-08-15' },
    { id: 'ENR-802', studentName: 'Srihan', studentEmail: 'srihan@example.com', courseTitle: 'VLSI ENGINEERING', progress: 85, status: 'In Progress', date: '2026-08-10' },
    { id: 'ENR-803', studentName: 'Alex Rivera', studentEmail: 'alex.rivera@example.com', courseTitle: 'Full-Stack Modern AI Web Engineering', progress: 40, status: 'In Progress', date: '2026-09-01' },
    { id: 'ENR-804', studentName: 'Samantha Chen', studentEmail: 's.chen@example.com', courseTitle: 'Cloud Native DevOps & System Administration', progress: 100, status: 'Completed', date: '2026-07-20' },
    { id: 'ENR-805', studentName: 'Marcus Vance', studentEmail: 'm.vance@example.com', courseTitle: 'VLSI ENGINEERING', progress: 20, status: 'In Progress', date: '2026-09-05' }
  ]);

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({ name: '', email: '', course: 'VLSI ENGINEERING' });

  const [showAddLecturerModal, setShowAddLecturerModal] = useState(false);
  const [newLecturerForm, setNewLecturerForm] = useState({ name: '', email: '', title: '', assignedCourse: 'VLSI ENGINEERING' });

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourseForm, setNewCourseForm] = useState({ title: '', category: 'Engineering', instructor: 'Dr. Murali Mohan' });

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [newEnrollForm, setNewEnrollForm] = useState({ studentName: 'Rahul', studentEmail: 'student@neexus.org', courseTitle: 'VLSI ENGINEERING' });

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    const matchesFilter = appFilter === 'ALL' || app.status === appFilter;
    const matchesSearch = app.applicantName.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.id.toLowerCase().includes(appSearch.toLowerCase()) ||
                          app.email.toLowerCase().includes(appSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Doubts
  const filteredDoubts = doubts.filter(d => {
    if (doubtFilter === 'Pending') return d.status === 'Pending';
    if (doubtFilter === 'Resolved') return d.status === 'Resolved';
    return true;
  });

  const pendingAppsCount = applications.filter(a => a.status === 'Pending').length;
  const approvedAppsCount = applications.filter(a => a.status === 'Approved').length;
  const pendingDoubtsCount = doubts.filter(d => d.status === 'Pending').length;

  const handleStatusChange = (appId, newStatus) => {
    updateApplicationStatus(appId, newStatus, `Status updated to ${newStatus} by Host / Admin.`);
    if (newStatus === 'Approved') {
      const app = applications.find(a => a.id === appId);
      if (app) {
        // Auto add to students and enrollments
        setStudentsList(prev => {
          if (prev.find(s => s.email.toLowerCase() === app.email.toLowerCase())) return prev;
          return [...prev, {
            id: `std-${Date.now()}`,
            name: app.applicantName,
            email: app.email,
            course: app.targetCourse,
            progress: 0,
            completedItems: 0,
            totalItems: 20,
            doubtsCount: 0,
            status: 'Active',
            enrolledAt: new Date().toISOString().substring(0, 10)
          }];
        });
        setEnrollmentsList(prev => [
          ...prev,
          {
            id: `ENR-${Math.floor(800 + Math.random() * 200)}`,
            studentName: app.applicantName,
            studentEmail: app.email,
            courseTitle: app.targetCourse,
            progress: 0,
            status: 'In Progress',
            date: new Date().toISOString().substring(0, 10)
          }
        ]);
      }
    }
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!editingApp) return;
    updateApplicationStatus(editingApp.id, editingApp.status, adminNoteInput);
    setEditingApp(null);
  };

  const handleAdminDoubtReply = (e, doubtId) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;
    answerDoubt(doubtId, `[Admin Override / Faculty Validated] ${adminReplyText}`);
    setAdminReplyDoubtId(null);
    setAdminReplyText('');
  };

  const handleBroadcastAnnouncement = (e) => {
    e.preventDefault();
    if (!ancTitle.trim() || !ancContent.trim()) return;

    addAnnouncement({
      courseId: ancTargetCourse === 'ALL' ? 'course-vlsi' : ancTargetCourse,
      courseTitle: ancTargetCourse === 'ALL' ? 'Platform-Wide Broadcast' : (courses.find(c => c.id === ancTargetCourse)?.title || 'Course Bulletin'),
      title: ancTitle,
      content: ancContent,
      author: '👑 Host / Platform Administrator'
    });

    setAncSuccessMsg(true);
    setTimeout(() => setAncSuccessMsg(false), 4000);
    setAncTitle('');
    setAncContent('');
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.email) return;
    const newStd = {
      id: `std-${Date.now()}`,
      name: newStudentForm.name,
      email: newStudentForm.email,
      course: newStudentForm.course,
      progress: 0,
      completedItems: 0,
      totalItems: 20,
      doubtsCount: 0,
      status: 'Active',
      enrolledAt: new Date().toISOString().substring(0, 10)
    };
    setStudentsList(prev => [...prev, newStd]);
    setEnrollmentsList(prev => [
      ...prev,
      {
        id: `ENR-${Math.floor(800 + Math.random() * 200)}`,
        studentName: newStudentForm.name,
        studentEmail: newStudentForm.email,
        courseTitle: newStudentForm.course,
        progress: 0,
        status: 'In Progress',
        date: new Date().toISOString().substring(0, 10)
      }
    ]);
    setShowAddStudentModal(false);
    setNewStudentForm({ name: '', email: '', course: 'VLSI ENGINEERING' });
  };

  const handleAddLecturerSubmit = (e) => {
    e.preventDefault();
    if (!newLecturerForm.name || !newLecturerForm.email) return;
    const newLec = {
      id: `lec-${Date.now()}`,
      name: newLecturerForm.name,
      email: newLecturerForm.email,
      title: newLecturerForm.title || 'Assistant Professor & Lab Director',
      assignedCourse: newLecturerForm.assignedCourse,
      modulesTaught: 1,
      doubtsResolved: 0,
      rating: 5.0,
      status: 'Active'
    };
    setLecturersList(prev => [...prev, newLec]);
    setShowAddLecturerModal(false);
    setNewLecturerForm({ name: '', email: '', title: '', assignedCourse: 'VLSI ENGINEERING' });
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setEnrollmentsList(prev => [
      ...prev,
      {
        id: `ENR-${Math.floor(800 + Math.random() * 200)}`,
        studentName: newEnrollForm.studentName,
        studentEmail: newEnrollForm.studentEmail,
        courseTitle: newEnrollForm.courseTitle,
        progress: 0,
        status: 'In Progress',
        date: new Date().toISOString().substring(0, 10)
      }
    ]);
    setShowEnrollModal(false);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Status\n"
      + `Total Applications,${applications.length},Audited\n`
      + `Approved Admissions,${approvedAppsCount},Active\n`
      + `Pending Admissions,${pendingAppsCount},Action Required\n`
      + `Enrolled Students,${studentsList.length},Enrolled\n`
      + `Active Faculty,${lecturersList.length},Verified\n`
      + `Courses Published,${courses.length},Active\n`
      + `Doubts Resolved,${doubts.filter(d => d.status === 'Resolved').length},Resolved\n`
      + `Pending Doubts,${pendingDoubtsCount},Pending\n`
      + `Lessons Completed By Learners,${completedLessons.length},Completed\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `platform_telemetry_audit_report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* ADMIN HEADER */}
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-amber">👑 HOST / ADMIN CONTROL COCKPIT</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Platform Administrator & Host Governance</span>
          </div>
          <h1 className="page-title">Platform Operations & Learning Management</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
            <Download size={14} /> Export Audit CSV
          </button>
        </div>
      </div>

      {/* EXACT REQUESTED NAVIGATION TABS (10 ITEMS):
          Dashboard | Applications | Students | Lecturers | Courses | Enrollments | Content | Doubts | Announcements | Reports */}
      <div style={{ 
        display: 'flex', 
        gap: '0.4rem', 
        marginBottom: '1.5rem', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '0.5rem',
        overflowX: 'auto',
        flexWrap: 'wrap'
      }}>
        <button 
          className={`exp-tab ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
          onClick={() => setActiveTab('DASHBOARD')}
        >
          <LayoutDashboard size={15} /> Dashboard
        </button>

        <button 
          className={`exp-tab ${activeTab === 'APPLICATIONS' ? 'active' : ''}`}
          onClick={() => setActiveTab('APPLICATIONS')}
        >
          <FileCheck size={15} /> Applications {pendingAppsCount > 0 && <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', marginLeft: '0.25rem' }}>{pendingAppsCount}</span>}
        </button>

        <button 
          className={`exp-tab ${activeTab === 'STUDENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('STUDENTS')}
        >
          <GraduationCap size={15} /> Students ({studentsList.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'LECTURERS' ? 'active' : ''}`}
          onClick={() => setActiveTab('LECTURERS')}
        >
          <Users size={15} /> Lecturers ({lecturersList.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'COURSES' ? 'active' : ''}`}
          onClick={() => setActiveTab('COURSES')}
        >
          <BookOpen size={15} /> Courses ({courses.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'ENROLLMENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ENROLLMENTS')}
        >
          <Layers size={15} /> Enrollments ({enrollmentsList.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'CONTENT' ? 'active' : ''}`}
          onClick={() => setActiveTab('CONTENT')}
        >
          <Video size={15} /> Content
        </button>

        <button 
          className={`exp-tab ${activeTab === 'DOUBTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('DOUBTS')}
        >
          <HelpCircle size={15} /> Doubts {pendingDoubtsCount > 0 && <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', marginLeft: '0.25rem' }}>{pendingDoubtsCount}</span>}
        </button>

        <button 
          className={`exp-tab ${activeTab === 'ANNOUNCEMENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ANNOUNCEMENTS')}
        >
          <Bell size={15} /> Announcements ({announcements.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'REPORTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('REPORTS')}
        >
          <FileSpreadsheet size={15} /> Reports
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. DASHBOARD TAB */}
      {/* ========================================================================= */}
      {activeTab === 'DASHBOARD' && (
        <div>
          {/* Top Telemetry Row */}
          <div className="stats-grid" style={{ marginBottom: '1.75rem' }}>
            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)' }}>
                <FileCheck size={24} />
              </div>
              <div>
                <div className="stat-value">{applications.length}</div>
                <div className="stat-label">Applications ({pendingAppsCount} Pending)</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div className="stat-value">{studentsList.length}</div>
                <div className="stat-label">Active Enrolled Students</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
                <Users size={24} />
              </div>
              <div>
                <div className="stat-value">{lecturersList.length}</div>
                <div className="stat-label">Verified Faculty / Lecturers</div>
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <div className="stat-value">{courses.length}</div>
                <div className="stat-label">Published Courses</div>
              </div>
            </div>
          </div>

          {/* 2-Column Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Live Audit Logs */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} color="var(--accent-primary)" /> Live Platform Activity Logs
                </h2>
                <span className="badge badge-emerald">Real-time Stream</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
                {activityLogs.map(log => (
                  <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Activity size={14} color="var(--accent-primary)" />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{log.message}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Actor: {log.actor}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{log.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Public Messages & Quick Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Host Contact Inquiries */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={18} color="var(--accent-warning)" /> "Message Host" Inquiries ({contactInquiries.length})
                  </h2>
                  <span className="badge badge-amber">Public Inquiries</span>
                </div>

                {contactInquiries.length === 0 ? (
                  <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    No pending inquiries. Messages sent via the public website Contact section appear here.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '240px', overflowY: 'auto' }}>
                    {contactInquiries.map(inq => (
                      <div key={inq.id} style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{inq.name}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>{inq.date}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>{inq.email} • {inq.subject}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>"{inq.message}"</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Administrative Shortcuts */}
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
                  ⚡ Quick Administrative Actions
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('APPLICATIONS')} style={{ justifyContent: 'flex-start' }}>
                    <FileCheck size={14} color="var(--accent-warning)" /> Review Admissions ({pendingAppsCount})
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('DOUBTS')} style={{ justifyContent: 'flex-start' }}>
                    <HelpCircle size={14} color="var(--accent-cyan)" /> Monitor Doubts ({pendingDoubtsCount})
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('ANNOUNCEMENTS')} style={{ justifyContent: 'flex-start' }}>
                    <Bell size={14} color="var(--accent-primary)" /> Broadcast Bulletin
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('ENROLLMENTS')} style={{ justifyContent: 'flex-start' }}>
                    <Layers size={14} color="var(--accent-success)" /> Manage Enrollments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. APPLICATIONS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'APPLICATIONS' && (
        <div>
          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ALL', 'Pending', 'Approved', 'Rejected'].map((status) => (
                <button 
                  key={status}
                  className={`btn btn-sm ${appFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setAppFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search applicant or code..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                style={{ paddingLeft: '2.25rem' }}
              />
            </div>
          </div>

          {/* Applications Table */}
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem' }}>Code</th>
                  <th style={{ padding: '1rem' }}>Applicant</th>
                  <th style={{ padding: '1rem' }}>Target Program</th>
                  <th style={{ padding: '1rem' }}>Submitted At</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {app.id}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{app.applicantName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{app.email}</div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                      {app.targetCourse}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {app.submittedAt}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {app.status === 'Approved' ? (
                        <span className="badge badge-emerald"><CheckCircle2 size={12} /> Approved</span>
                      ) : app.status === 'Rejected' ? (
                        <span className="badge badge-rose"><XCircle size={12} /> Rejected</span>
                      ) : (
                        <span className="badge badge-amber"><Clock size={12} /> Pending</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        {app.status !== 'Approved' && (
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(app.id, 'Approved')}
                            title="Approve student and grant LMS access"
                          >
                            Approve
                          </button>
                        )}
                        {app.status !== 'Rejected' && (
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleStatusChange(app.id, 'Rejected')}
                            style={{ color: 'var(--accent-danger)' }}
                            title="Reject application"
                          >
                            Reject
                          </button>
                        )}
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => { setEditingApp(app); setAdminNoteInput(app.adminNotes || ''); }}
                        >
                          Notes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STUDENTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'STUDENTS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Student Directory & Progress Tracking</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track coursework completion, lecture progress, and active student status.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ position: 'relative', width: '220px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Search students..." 
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  style={{ paddingLeft: '2.2rem', paddingY: '0.4rem', fontSize: '0.85rem' }}
                />
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddStudentModal(true)}>
                <UserPlus size={15} /> Add Student
              </button>
            </div>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem' }}>Student</th>
                  <th style={{ padding: '1rem' }}>Primary Course</th>
                  <th style={{ padding: '1rem' }}>Course Progress (Read / Total)</th>
                  <th style={{ padding: '1rem' }}>Doubts</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsList
                  .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase()))
                  .map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{s.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{s.email}</div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                        <span className="badge badge-indigo">{s.course}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: '100px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ width: `${s.progress}%`, height: '100%', background: 'var(--accent-primary)', borderRadius: 'var(--radius-full)' }} />
                          </div>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.progress}%</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>({s.completedItems}/{s.totalItems})</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                        {s.doubtsCount} Question{s.doubtsCount !== 1 ? 's' : ''}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-emerald">Active</span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => alert(`Student: ${s.name}\nEmail: ${s.email}\nProgress: ${s.progress}%\nEnrolled: ${s.enrolledAt}`)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LECTURERS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'LECTURERS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Faculty & Lecturer Roster</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage professors, syllabus contributors, and instructors.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddLecturerModal(true)}>
              <UserPlus size={15} /> Add Faculty Member
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {lecturersList.map((lec) => (
              <div key={lec.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{lec.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{lec.title}</div>
                    </div>
                    <span className="badge badge-cyan">{lec.status}</span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1rem' }}>
                    <div>📧 Email: <strong style={{ color: 'var(--text-main)' }}>{lec.email}</strong></div>
                    <div>🎓 Assigned Track: <strong style={{ color: 'var(--text-main)' }}>{lec.assignedCourse}</strong></div>
                    <div>📚 Modules Taught: <strong style={{ color: 'var(--text-main)' }}>{lec.modulesTaught} Modules</strong></div>
                    <div>⭐ Instructor Rating: <strong style={{ color: 'var(--accent-warning)' }}>{lec.rating} ★</strong></div>
                    <div>💬 Doubts Answered: <strong style={{ color: 'var(--accent-success)' }}>{lec.doubtsResolved} Resolved</strong></div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert(`Viewing assignments for ${lec.name}`)}>
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. COURSES TAB */}
      {/* ========================================================================= */}
      {activeTab === 'COURSES' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Course Catalog Administration</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure published curriculum, modules, and enrollment capacities.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddCourseModal(true)}>
              <PlusCircle size={15} /> Add New Course
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {courses.map(c => {
              const totalCourseLessons = c.modules.flatMap(m => m.lessons).length;
              return (
                <div key={c.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{c.title}</h3>
                      <span className="badge badge-emerald">Published</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{c.description}</p>
                    
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <div>Instructor: <strong style={{ color: 'var(--text-main)' }}>{c.instructor}</strong></div>
                      <div>Modules: <strong style={{ color: 'var(--text-main)' }}>{c.modules.length} Modules</strong> ({totalCourseLessons} Published Learning Items)</div>
                      <div>Rating: <strong style={{ color: 'var(--accent-warning)' }}>{c.rating} ★</strong> ({c.enrolledCount} Students Enrolled)</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => { setContentCourseId(c.id); setActiveTab('CONTENT'); }}
                    >
                      Inspect Content
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ENROLLMENTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'ENROLLMENTS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Student-to-Course Enrollment Matrix</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage student seats, access permissions, and track completion.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setShowEnrollModal(true)}>
              <Layers size={15} /> Enroll Student
            </button>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem' }}>Enrollment ID</th>
                  <th style={{ padding: '1rem' }}>Student</th>
                  <th style={{ padding: '1rem' }}>Course Program</th>
                  <th style={{ padding: '1rem' }}>Progress</th>
                  <th style={{ padding: '1rem' }}>Enrolled Date</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentsList.map(enr => (
                  <tr key={enr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{enr.id}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{enr.studentName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{enr.studentEmail}</div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{enr.courseTitle}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '80px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                          <div style={{ width: `${enr.progress}%`, height: '100%', background: enr.progress === 100 ? 'var(--accent-success)' : 'var(--accent-primary)' }} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{enr.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{enr.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${enr.status === 'Completed' ? 'badge-emerald' : 'badge-indigo'}`}>
                        {enr.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => alert(`Manage seat for ${enr.studentName} in ${enr.courseTitle}`)}
                      >
                        Access Control
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. CONTENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'CONTENT' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Course Content & Learning Items Repository</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review modules, video lessons, and published PDF slides.</p>
            </div>
            
            {/* Course Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Select Course:</span>
              <select 
                className="form-select"
                value={contentCourseId}
                onChange={(e) => setContentCourseId(e.target.value)}
                style={{ width: '280px' }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Modules & Lessons Hierarchy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {selectedContentCourse?.modules.map((mod, modIdx) => (
              <div key={mod.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
                    {mod.title}
                  </h3>
                  <span className="badge badge-indigo">{mod.lessons.length} Learning Items</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {mod.lessons.map((les, lesIdx) => (
                    <div key={les.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{les.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'flex', gap: '1rem', marginTop: '0.2rem' }}>
                          <span>⏱ {les.duration}</span>
                          {les.pdfTitle && <span>📄 {les.pdfTitle}</span>}
                          <span>🎥 Video Stream Ready</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span className="badge badge-emerald">Published</span>
                        <a 
                          href={les.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          <Download size={12} /> PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DOUBTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'DOUBTS' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Global Doubt Resolution Center</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Monitor student doubts, lecturer response times, and provide admin interventions.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ALL', 'Pending', 'Resolved'].map(filter => (
                <button 
                  key={filter}
                  className={`btn btn-sm ${doubtFilter === filter ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setDoubtFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredDoubts.map(d => (
              <div key={d.id} className="glass-panel" style={{ padding: '1.25rem', borderLeft: d.status === 'Pending' ? '4px solid var(--accent-warning)' : '4px solid var(--accent-success)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-indigo">Topic: {d.topic}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Student: {d.studentName}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                      Lesson: {d.lessonTitle} • Course: {courses.find(c => c.id === d.courseId)?.title || 'VLSI ENGINEERING'}
                    </div>
                  </div>

                  <div>
                    {d.status === 'Pending' ? (
                      <span className="badge badge-amber"><Clock size={12} /> Waiting for lecturer</span>
                    ) : (
                      <span className="badge badge-emerald"><CheckCircle2 size={12} /> ✓ Answered</span>
                    )}
                  </div>
                </div>

                {/* Question Box */}
                <div style={{ padding: '0.85rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--accent-primary)' }}>Question: </strong> {d.question}
                </div>

                {/* Reply display or Admin override form */}
                {d.status === 'Resolved' ? (
                  <div style={{ padding: '0.85rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', fontSize: '0.78rem', color: 'var(--accent-success)', fontWeight: 700 }}>
                      <span>✓ Faculty Answer ({d.repliedBy})</span>
                      <span>{d.repliedAt}</span>
                    </div>
                    <div>{d.reply}</div>
                  </div>
                ) : (
                  <div>
                    {adminReplyDoubtId === d.id ? (
                      <form onSubmit={(e) => handleAdminDoubtReply(e, d.id)} style={{ marginTop: '0.75rem' }}>
                        <textarea 
                          className="form-textarea"
                          rows="3"
                          placeholder="Type authoritative reply or answer on behalf of faculty..."
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          required
                          style={{ marginBottom: '0.5rem' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setAdminReplyDoubtId(null)}>Cancel</button>
                          <button type="submit" className="btn btn-primary btn-sm">Submit Admin Response</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => { setAdminReplyDoubtId(d.id); setAdminReplyText(''); }}>
                          Provide Direct Reply
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. ANNOUNCEMENTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'ANNOUNCEMENTS' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Compose Broadcast */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="var(--accent-primary)" /> Broadcast Announcement
              </h2>

              {ancSuccessMsg && (
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-success)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-success)', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} /> Announcement broadcasted live across all student & lecturer dashboards!
                </div>
              )}

              <form onSubmit={handleBroadcastAnnouncement}>
                <div className="form-group">
                  <label className="form-label">Broadcast Target</label>
                  <select 
                    className="form-select"
                    value={ancTargetCourse}
                    onChange={(e) => setAncTargetCourse(e.target.value)}
                  >
                    <option value="ALL">📢 Platform-Wide (All Enrolled Students)</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>Course: {c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Announcement Title *</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="e.g., Campus Silicon Lab Schedule & Midterm Notice"
                    value={ancTitle}
                    onChange={(e) => setAncTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Broadcast Content *</label>
                  <textarea 
                    className="form-textarea"
                    rows="4"
                    placeholder="Detailed notice, schedule details, or urgent updates..."
                    value={ancContent}
                    onChange={(e) => setAncContent(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={15} /> Send Broadcast Now
                </button>
              </form>
            </div>

            {/* Right: Existing Announcements Feed */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
                Active Platform Announcements ({announcements.length})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '520px', overflowY: 'auto' }}>
                {announcements.map(anc => (
                  <div key={anc.id} style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="badge badge-indigo">{anc.courseTitle}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{anc.date}</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', margin: '0.35rem 0' }}>{anc.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{anc.content}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.5rem' }}>Author: {anc.author}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. REPORTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'REPORTS' && (
        <div>
          {/* Section 1: Role Permissions Matrix */}
          <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock size={20} color="var(--accent-primary)" /> Platform Access & Role Permissions Matrix
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Defines fine-grained access policies across the 3 core portal experiences.
                </p>
              </div>
              <span className="badge badge-indigo">Enforced by RBAC Kernel</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.85rem' }}>Feature / Capability</th>
                    <th style={{ padding: '0.85rem' }}>🎓 Student</th>
                    <th style={{ padding: '0.85rem' }}>👨‍🏫 Lecturer</th>
                    <th style={{ padding: '0.85rem' }}>👑 Host / Admin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Browse Courses & Apply Publicly</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Watch Videos, Download PDFs & Mark Read</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /> (Preview)</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Post Lesson Doubts & Questions</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Publish Lessons, PDFs & Class Content</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Answer Student Doubts & Resolve Tickets</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Approve / Reject Student Admissions</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.85rem', fontWeight: 600 }}>Manage Users, Roles & View Audit Reports</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem', color: 'var(--text-subtle)' }}>—</td>
                    <td style={{ padding: '0.85rem' }}><CheckCircle2 size={16} color="var(--accent-success)" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Executive Reports & Analytics */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileSpreadsheet size={20} color="var(--accent-success)" /> Executive Platform Reports & KPIs
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Aggregated telemetry on student enrollment conversion, completion rates, and instructor response times.
                </p>
              </div>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleExportCSV}
              >
                <Download size={14} /> Export Report CSV
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Admission Conversion Rate</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)', margin: '0.35rem 0' }}>
                  {applications.length > 0 ? Math.round((applications.filter(a => a.status === 'Approved').length / applications.length) * 100) : 0}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {applications.filter(a => a.status === 'Approved').length} of {applications.length} applications accepted
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Doubt Resolution Speed</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-success)', margin: '0.35rem 0' }}>
                  {doubts.length > 0 ? Math.round((doubts.filter(d => d.status === 'Resolved').length / doubts.length) * 100) : 100}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {doubts.filter(d => d.status === 'Resolved').length} doubts answered across all tracks
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Completed Coursework</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-warning)', margin: '0.35rem 0' }}>
                  {completedLessons.length} Lessons
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Marked as Read by active learners
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* EDIT ADMIN NOTES MODAL */}
      {editingApp && (
        <div className="modal-overlay" onClick={() => setEditingApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Admin Review Notes ({editingApp.id})</h3>
              <button className="modal-close" onClick={() => setEditingApp(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveNotes}>
              <div className="form-group">
                <label className="form-label">Reviewer Notes for Applicant</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingApp(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Notes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {showAddStudentModal && (
        <div className="modal-overlay" onClick={() => setShowAddStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Student Account</h3>
              <button className="modal-close" onClick={() => setShowAddStudentModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddStudentSubmit}>
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={newStudentForm.email}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Enrolled Course</label>
                <select 
                  className="form-select"
                  value={newStudentForm.course}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, course: e.target.value })}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddStudentModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LECTURER MODAL */}
      {showAddLecturerModal && (
        <div className="modal-overlay" onClick={() => setShowAddLecturerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Faculty / Lecturer</h3>
              <button className="modal-close" onClick={() => setShowAddLecturerModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddLecturerSubmit}>
              <div className="form-group">
                <label className="form-label">Lecturer Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newLecturerForm.name}
                  onChange={(e) => setNewLecturerForm({ ...newLecturerForm, name: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={newLecturerForm.email}
                  onChange={(e) => setNewLecturerForm({ ...newLecturerForm, email: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Faculty Title & Specialization</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Lead Silicon Design Architect"
                  value={newLecturerForm.title}
                  onChange={(e) => setNewLecturerForm({ ...newLecturerForm, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Course</label>
                <select 
                  className="form-select"
                  value={newLecturerForm.assignedCourse}
                  onChange={(e) => setNewLecturerForm({ ...newLecturerForm, assignedCourse: e.target.value })}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddLecturerModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Faculty</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD COURSE MODAL */}
      {showAddCourseModal && (
        <div className="modal-overlay" onClick={() => setShowAddCourseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Publish New Course</h3>
              <button className="modal-close" onClick={() => setShowAddCourseModal(false)}>✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Course "${newCourseForm.title}" submitted to catalog!`);
              setShowAddCourseModal(false);
            }}>
              <div className="form-group">
                <label className="form-label">Course Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newCourseForm.title}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newCourseForm.category}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instructor</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newCourseForm.instructor}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, instructor: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddCourseModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ENROLL STUDENT MODAL */}
      {showEnrollModal && (
        <div className="modal-overlay" onClick={() => setShowEnrollModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Enroll Student in Course</h3>
              <button className="modal-close" onClick={() => setShowEnrollModal(false)}>✕</button>
            </div>
            <form onSubmit={handleEnrollSubmit}>
              <div className="form-group">
                <label className="form-label">Select Student</label>
                <select 
                  className="form-select"
                  value={newEnrollForm.studentEmail}
                  onChange={(e) => {
                    const std = studentsList.find(s => s.email === e.target.value);
                    setNewEnrollForm({
                      ...newEnrollForm,
                      studentEmail: e.target.value,
                      studentName: std ? std.name : e.target.value
                    });
                  }}
                >
                  {studentsList.map(s => (
                    <option key={s.id} value={s.email}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Course</label>
                <select 
                  className="form-select"
                  value={newEnrollForm.courseTitle}
                  onChange={(e) => setNewEnrollForm({ ...newEnrollForm, courseTitle: e.target.value })}
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEnrollModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Enrollment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
