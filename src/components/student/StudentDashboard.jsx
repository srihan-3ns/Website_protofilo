import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  Award, 
  Clock, 
  BookOpen, 
  Send, 
  Sparkles,
  HelpCircle,
  Video,
  Download,
  Bell,
  ArrowRight,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export const StudentDashboard = () => {
  const { 
    courses, 
    completedLessons, 
    toggleLessonCompleted, 
    doubts, 
    announcements,
    askDoubt,
    currentUser
  } = useApp();

  const safeCourses = Array.isArray(courses) ? courses : [];
  const [activeCourseId, setActiveCourseId] = useState(safeCourses[0]?.id || 'course-vlsi');
  const activeCourse = safeCourses.find(c => c?.id === activeCourseId) || safeCourses[0] || null;

  // Active lesson inside selected course - defensively calculated
  const allCourseLessons = (activeCourse?.modules || []).flatMap(m => Array.isArray(m?.lessons) ? m.lessons : []);
  const [activeLessonId, setActiveLessonId] = useState(allCourseLessons[0]?.id || 'vlsi-1');
  const activeLesson = allCourseLessons.find(l => l?.id === activeLessonId) || allCourseLessons[0] || null;

  // Tab navigation inside Student view
  const [activeTab, setActiveTab] = useState('LEARN'); // 'LEARN' | 'DOUBTS' | 'ANNOUNCEMENTS' | 'PROGRESS'

  // Exact Student Doubt form state matching prompt: Topic: [ Full Adder ] Question: [ I don't understand how Cout is derived. ]
  const [doubtTopic, setDoubtTopic] = useState('Full Adder');
  const [doubtQuestion, setDoubtQuestion] = useState("I don't understand how Cout is derived.");
  const [doubtSubmittedMsg, setDoubtSubmittedMsg] = useState(false);

  // Exact Formula: Completion % = (Read Items ÷ Total Published Items) × 100
  const safeCompleted = Array.isArray(completedLessons) ? completedLessons : [];
  const totalLessonsCount = allCourseLessons.length;
  const completedInThisCourse = allCourseLessons.filter(l => l?.id && safeCompleted.includes(l.id)).length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedInThisCourse / totalLessonsCount) * 100) : 0;
  const isLessonDone = activeLesson ? safeCompleted.includes(activeLesson.id) : false;

  const courseAnnouncements = (Array.isArray(announcements) ? announcements : []).filter(a => a?.courseId === activeCourse?.id);
  const courseDoubts = (Array.isArray(doubts) ? doubts : []).filter(d => d?.courseId === activeCourse?.id);

  const handleAskDoubtSubmit = (e) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    askDoubt({
      courseId: activeCourse?.id || 'course-vlsi',
      lessonId: activeLesson?.id || 'vlsi-6',
      lessonTitle: activeLesson?.title || '2.1 Half Adder & Full Adder Logic Derivations',
      topic: doubtTopic || 'Full Adder',
      timestamp: '12:40',
      question: doubtQuestion
    });

    setDoubtSubmittedMsg(true);
    setTimeout(() => setDoubtSubmittedMsg(false), 4000);
  };

  const handleContinueLearning = () => {
    // Jump to the first uncompleted lesson
    const nextUnread = allCourseLessons.find(l => !safeCompleted.includes(l.id));
    if (nextUnread) {
      setActiveLessonId(nextUnread.id);
    }
    setActiveTab('LEARN');
  };

  return (
    <div>
      {/* STUDENT HEADER & COURSE SELECTOR */}
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-indigo">🎓 STUDENT LEARNING PORTAL</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Logged in as <strong>{currentUser?.name || 'Rahul'}</strong>
            </span>
          </div>
          <h1 className="page-title">{activeCourse?.title}</h1>
        </div>

        {/* Course selection dropdown */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select 
            className="form-select" 
            value={activeCourseId}
            onChange={(e) => {
              setActiveCourseId(e.target.value);
              const selectedC = safeCourses.find(c => c?.id === e.target.value);
              const firstLes = (selectedC?.modules || []).flatMap(m => Array.isArray(m?.lessons) ? m.lessons : [])[0];
              if (firstLes?.id) {
                setActiveLessonId(firstLes.id);
              }
            }}
            style={{ width: '280px' }}
          >
            {safeCourses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* EXACT USER SPECIFICATION: PROGRESS BANNER & FORMULA BREAKDOWN */}
      <div className="glass-panel-glow" style={{ padding: '1.5rem', marginBottom: '1.75rem', borderLeft: '4px solid var(--learning-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Cpu size={22} color="var(--learning-blue)" />
              <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                {activeCourse?.title}
              </span>
              <span className="badge badge-blue" style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                {progressPercent}% complete
              </span>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontFamily: 'monospace' }}>
              {/* ASCII & Fill Representation: ███████████████░░░░░ 15 of 20 learning items completed */}
              <span style={{ color: 'var(--learning-blue)', fontWeight: 700, letterSpacing: '0.05em' }}>
                {'█'.repeat(Math.round(progressPercent / 5))}{'░'.repeat(20 - Math.round(progressPercent / 5))}
              </span>
              <span style={{ marginLeft: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {completedInThisCourse} of {totalLessonsCount} learning items completed
              </span>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleContinueLearning}
            style={{ padding: '0.55rem 1.35rem', fontWeight: 800, fontSize: '0.88rem' }}
          >
            [ CONTINUE LEARNING ] <ArrowRight size={16} />
          </button>
        </div>

        {/* EXACT FORMULA DISPLAY: Completion % = (Read Items ÷ Total Published Items) × 100 */}
        <div style={{ 
          background: 'var(--bg-tertiary)', 
          padding: '0.65rem 1rem', 
          borderRadius: 'var(--radius-sm)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>Formula:</strong> Completion % = (Read Items ÷ Total Published Items) × 100
          </div>
          <div style={{ color: 'var(--learning-blue)', fontWeight: 700, fontFamily: 'monospace' }}>
            {completedInThisCourse} Read / {totalLessonsCount} Total = {progressPercent}%
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button 
          className={`exp-tab ${activeTab === 'LEARN' ? 'active' : ''}`}
          onClick={() => setActiveTab('LEARN')}
        >
          <Video size={16} /> Course Player & Materials
        </button>

        <button 
          className={`exp-tab ${activeTab === 'DOUBTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('DOUBTS')}
        >
          <HelpCircle size={16} /> Doubts & Q&A Forum ({courseDoubts.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'ANNOUNCEMENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ANNOUNCEMENTS')}
        >
          <Bell size={16} /> Announcements ({courseAnnouncements.length})
        </button>

        <button 
          className={`exp-tab ${activeTab === 'PROGRESS' ? 'active' : ''}`}
          onClick={() => setActiveTab('PROGRESS')}
        >
          <Award size={16} /> Progress & Certificates ({progressPercent}%)
        </button>
      </div>

      {/* TAB 1: VIDEO PLAYER & LESSON MATERIALS */}
      {activeTab === 'LEARN' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '1.5rem' }}>
          {/* Main Video & Content Column */}
          <div>
            {/* Video Player */}
            <div className="glass-panel" style={{ padding: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="video-player-wrapper">
                <iframe 
                  className="video-player-iframe" 
                  src={activeLesson?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                  title={activeLesson?.title || 'Lesson Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              {/* Lesson Toolbar & Mark Read Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{activeLesson?.title}</h2>
                    {isLessonDone && (
                      <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                        <CheckCircle2 size={13} color="var(--learning-blue)" /> BLUE TICK: Read & Verified
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <Clock size={14} /> Duration: {activeLesson?.duration} • Instructor: {activeCourse?.instructor}
                  </div>
                </div>

                {/* Mark as Read Button */}
                <button 
                  className={`btn ${isLessonDone ? 'btn-secondary' : 'btn-learning'}`}
                  onClick={() => toggleLessonCompleted(activeLesson?.id)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    border: isLessonDone ? '1px solid var(--learning-blue)' : undefined
                  }}
                >
                  {isLessonDone ? (
                    <>
                      <CheckCircle2 size={18} color="var(--learning-blue)" /> 
                      <span style={{ color: 'var(--learning-blue)', fontWeight: 700 }}>Marked as Read ✓ (Blue Tick)</span>
                    </>
                  ) : (
                    <>
                      <BookOpen size={18} /> Mark as Read (Complete)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Lesson Summary & Attachments */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lesson Information & Overview</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {activeLesson?.summary}
              </p>

              {/* PDF Documents & Attachments */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} color="var(--accent-primary)" /> Attached Lesson PDFs & Resources
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {activeLesson?.pdfUrl && (
                  <div className="glass-panel" style={{ padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{activeLesson.pdfTitle}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>PDF Document • Verified Course Asset</div>
                      </div>
                    </div>
                    <a href={activeLesson.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                      <Download size={14} /> Download PDF
                    </a>
                  </div>
                )}

                {activeLesson?.resourceLinks && activeLesson.resourceLinks.length > 0 && (
                  activeLesson.resourceLinks.map((link, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{link.title}</div>
                      <a href={link.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        Open Link <ExternalLink size={12} />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Curriculum Sidebar */}
          <div>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Curriculum & Modules</h3>
                <span className="badge badge-emerald">{progressPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="progress-bar-bg" style={{ marginBottom: '1.25rem' }}>
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>

              {/* Modules List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' }}>
                {(activeCourse?.modules || []).map((mod) => (
                  <div key={mod.id}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                      {mod.title}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {(mod?.lessons || []).map((les) => {
                        const isDone = completedLessons.includes(les.id);
                        const isActive = les.id === activeLessonId;

                        return (
                          <div 
                            key={les.id}
                            onClick={() => setActiveLessonId(les.id)}
                            style={{
                              padding: '0.6rem 0.8rem',
                              borderRadius: 'var(--radius-md)',
                              background: isActive ? 'rgba(75, 141, 255, 0.12)' : 'var(--bg-tertiary)',
                              border: isActive ? '1px solid var(--learning-blue)' : '1px solid transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all var(--transition-fast)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                              {isDone ? (
                                <CheckCircle size={15} color="var(--learning-blue)" style={{ flexShrink: 0 }} />
                              ) : (
                                <Play size={13} color={isActive ? 'var(--learning-blue)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
                              )}
                              <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                {les.title}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>{les.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXACT STUDENT DOUBTS VIEW SPECIFIED BY USER */}
      {/* Topic: [ Full Adder ] Question: [ I don't understand how Cout is derived. ] [ SUBMIT DOUBT ] Q1 ✓ Answered Q2 ○ Waiting for lecturer */}
      {activeTab === 'DOUBTS' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 400px) 1fr', gap: '1.75rem' }}>
          {/* Ask Doubt Form */}
          <div className="glass-panel-glow" style={{ padding: '1.75rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} color="var(--accent-primary)" /> Ask Doubt to Lecturer
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Tag your technical doubt with topic and lesson for direct faculty resolution.
            </p>

            <form onSubmit={handleAskDoubtSubmit}>
              <div className="form-group">
                <label className="form-label">Topic:</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Full Adder"
                  value={doubtTopic}
                  onChange={(e) => setDoubtTopic(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Question:</label>
                <textarea 
                  className="form-textarea" 
                  rows="4" 
                  placeholder="I don't understand how Cout is derived."
                  value={doubtQuestion}
                  onChange={(e) => setDoubtQuestion(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Exact Submit Button text: [ SUBMIT DOUBT ] */}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontWeight: 800, padding: '0.75rem' }}>
                <Send size={15} /> [ SUBMIT DOUBT ]
              </button>

              {doubtSubmittedMsg && (
                <div style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: 'var(--accent-success)', textAlign: 'center', fontWeight: 600 }}>
                  ✓ Doubt submitted! Lecturer Dr. Murali Mohan has been notified.
                </div>
              )}
            </form>
          </div>

          {/* Doubts List with Exact Status: Q1 ✓ Answered, Q2 ○ Waiting for lecturer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                My Submitted Doubts & Resolution
              </h3>
              <span className="badge badge-indigo">{courseDoubts.length} Doubts Recorded</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {courseDoubts.map((doubt, index) => {
                const qNumber = `Q${index + 1}`;
                const isAnswered = doubt.status === 'Resolved';

                return (
                  <div key={doubt.id} className="glass-panel" style={{ padding: '1.35rem', borderLeft: isAnswered ? '4px solid var(--accent-success)' : '4px solid var(--accent-warning)' }}>
                    {/* Header Row: Q Number + Status Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>{qNumber}</span>
                        {isAnswered ? (
                          <span className="badge badge-emerald" style={{ fontWeight: 700 }}>
                            ✓ Answered
                          </span>
                        ) : (
                          <span className="badge badge-amber" style={{ fontWeight: 700 }}>
                            ○ Waiting for lecturer
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        Topic: <strong style={{ color: 'var(--accent-primary)' }}>{doubt.topic || 'Full Adder'}</strong>
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', marginBottom: '0.4rem' }}>
                      Lesson: {doubt.lessonTitle}
                    </div>

                    {/* Question Content */}
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', margin: '0.4rem 0 0.8rem 0' }}>
                      "{doubt.question}"
                    </p>

                    {/* Lecturer Reply Block */}
                    {isAnswered && doubt.reply ? (
                      <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid var(--accent-success)', padding: '0.85rem 1rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-success)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>👨‍🏫 {doubt.repliedBy || 'Dr. Murali Mohan (Lecturer)'}</span>
                          <span>{doubt.repliedAt || 'Recently'}</span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                          {doubt.reply}
                        </p>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', background: 'var(--bg-tertiary)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
                        Waiting for lecturer response. Dr. Murali Mohan resolves doubts during daily architecture clinics.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANNOUNCEMENTS */}
      {activeTab === 'ANNOUNCEMENTS' && (
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} color="var(--accent-primary)" /> Official Class Announcements
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courseAnnouncements.length === 0 ? (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No active announcements for this course yet.
              </div>
            ) : (
              courseAnnouncements.map((anc) => (
                <div key={anc.id} className="glass-panel-glow" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{anc.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{anc.date}</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, margin: '0.5rem 0' }}>
                    {anc.content}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}>
                    <span>Posted by: <strong>{anc.author}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PROGRESS TRACKER & CERTIFICATE */}
      {activeTab === 'PROGRESS' && (
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="glass-panel-glow" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <Award size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Course Progress & Achievement Certificate</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Mark lessons as read to complete 100% of the curriculum and unlock your verified digital certificate.
            </p>

            <div style={{ margin: '2rem 0' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{progressPercent}%</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {completedInThisCourse} of {totalLessonsCount} Lessons Completed
              </div>
              <div className="progress-bar-bg" style={{ height: '12px', maxWidth: '400px', margin: '0 auto' }}>
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {progressPercent >= 100 ? (
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-success)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', margin: '1.5rem 0' }}>
                <Sparkles size={32} color="var(--accent-success)" style={{ margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-success)' }}>
                  Certificate of Completion Unlocked!
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem 0' }}>
                  This certifies that <strong>{currentUser?.name || 'Rahul'}</strong> has successfully completed all coursework for <strong>{activeCourse?.title}</strong>.
                </p>
                <button className="btn btn-success" onClick={() => alert('Certificate PDF generated for download!')}>
                  <Download size={16} /> Download Official Certificate PDF
                </button>
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
                Complete {totalLessonsCount - completedInThisCourse} more lesson(s) to unlock your certificate.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
