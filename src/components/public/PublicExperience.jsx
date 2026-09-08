import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationModal } from './ApplicationModal';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Video, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Star, 
  Play, 
  GraduationCap,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Clock,
  Layers,
  Code,
  Terminal,
  Cpu,
  Target,
  Award
} from 'lucide-react';

export const PublicExperience = ({ isApplyModalOpen, setIsApplyModalOpen, isContactModalOpen, setIsContactModalOpen }) => {
  const { courses, setCurrentExperience, setCurrentRole, submitContactInquiry } = useApp();
  const [selectedCourseForApp, setSelectedCourseForApp] = useState(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Course Admissions', message: '' });
  const [contactSentMsg, setContactSentMsg] = useState(false);

  const handleApplyCourse = (courseTitle) => {
    setSelectedCourseForApp(courseTitle);
    setIsApplyModalOpen(true);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    submitContactInquiry(contactForm);
    setContactSentMsg(true);
    setContactForm({ name: '', email: '', subject: 'Course Admissions', message: '' });
    setTimeout(() => {
      setContactSentMsg(false);
      if (setIsContactModalOpen) setIsContactModalOpen(false);
    }, 3500);
  };

  const faqs = [
    {
      q: "How does the admission application and evaluation process work?",
      a: "Click [ APPLY NOW ] anywhere on the platform to submit your prospective student details. A unique tracking code (e.g. APP-9081) is immediately generated. The Host / Admin evaluates your background in the Admin Panel and grants 1-click admission access."
    },
    {
      q: "How does 'Mark as Read' and progress tracking work in the Student Portal?",
      a: "As students stream lecture videos and review the attached PDF notes, clicking 'Mark as Read / Completed' instantly updates the overall course progress bar, completion records, and unlocks the verified digital Certificate of Completion once 100% is reached."
    },
    {
      q: "How does a student ask doubts on specific video lessons?",
      a: "Students can submit timestamped doubts directly below any lecture. The question is tagged to the exact minute of the video and automatically dispatched to the Lecturer's Doubt Resolution Queue."
    },
    {
      q: "What capabilities do Lecturers have in their portal?",
      a: "Lecturers can publish new video lessons, upload PDF lecture slides, attach external reference links, broadcast announcements, and answer student questions with timestamped explanations."
    },
    {
      q: "What controls are available in the Host / Admin Control Panel?",
      a: "Admins oversee the entire platform: evaluating incoming applications, modifying user roles (Student, Lecturer, Admin), governing published courses, and inspecting live activity audit trails."
    }
  ];

  const studentProjects = [
    {
      title: "Distributed Agentic Web Engine",
      category: "Full-Stack AI Architecture",
      description: "Production event-driven architecture with reactive state synchronization, background worker pools, and automated telemetry logging.",
      techStack: ["React 18", "Vite", "Node.js", "WebSockets"],
      impact: "Simulates 10,000+ concurrent student sessions with sub-millisecond sync latency."
    },
    {
      title: "Cloud Native Telemetry & Container Orchestrator",
      category: "DevOps & Infrastructure",
      description: "Automated Kubernetes cluster provisioning with zero-downtime CI/CD deployment pipelines, Docker containerization, and Prometheus telemetry.",
      techStack: ["Kubernetes", "Docker", "Go", "Prometheus"],
      impact: "Maintains 99.99% availability across multi-region edge nodes."
    },
    {
      title: "Timestamped Video Doubt Resolution System",
      category: "Interactive EdTech",
      description: "Microservice platform linking video timecodes directly to instructor resolution queues with real-time push notifications.",
      techStack: ["HTML5 Video API", "REST API", "LocalStorage Engine"],
      impact: "Reduced student doubt turnaround latency by 85%."
    }
  ];

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section id="home" style={{ textAlign: 'center', padding: '3.5rem 1rem 3rem 1rem', position: 'relative' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '1.25rem', padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}>
          <Sparkles size={14} /> ONE PLATFORM • THREE EXPERIENCES
        </div>

        {/* EXACT PROMPT HEADLINE: HERO Build skills. Build your future. */}
        <h1 style={{ 
          fontSize: '3.8rem', 
          fontWeight: 900, 
          letterSpacing: '-0.035em', 
          lineHeight: 1.1,
          maxWidth: '960px',
          margin: '0 auto 1.25rem auto'
        }}>
          Build skills. <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Build your future.</span>
        </h1>

        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-muted)', 
          maxWidth: '780px', 
          margin: '0 auto 2.25rem auto',
          lineHeight: 1.6
        }}>
          From public exploration and cohort admissions to hands-on learning with active lecturers: experience the unified platform engineered for <strong>Students</strong>, <strong>Lecturers</strong>, and <strong>Platform Admins</strong>.
        </p>

        {/* EXACT PROMPT BUTTONS: [ APPLY NOW ] [ EXPLORE PROGRAMS ] */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.9rem 2.25rem', fontSize: '1.05rem', fontWeight: 800 }} 
            onClick={() => setIsApplyModalOpen(true)}
          >
            [ APPLY NOW ] <ArrowRight size={18} />
          </button>
          
          <button 
            className="btn btn-secondary" 
            style={{ padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 700 }} 
            onClick={() => scrollToSection('programs')}
          >
            <BookOpen size={18} /> [ EXPLORE PROGRAMS ]
          </button>
        </div>

        {/* METRICS BANNER */}
        <div className="stats-grid" style={{ marginTop: '3.75rem' }}>
          <div className="glass-panel-glow stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}>
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">2,310+</div>
              <div className="stat-label">Enrolled Cohort Learners</div>
            </div>
          </div>

          <div className="glass-panel-glow stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)' }}>
              <Video size={24} />
            </div>
            <div>
              <div className="stat-value">180+</div>
              <div className="stat-label">HD Video Modules & PDFs</div>
            </div>
          </div>

          <div className="glass-panel-glow stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)' }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <div className="stat-value">99.4%</div>
              <div className="stat-label">Doubt Resolution Rate</div>
            </div>
          </div>

          <div className="glass-panel-glow stat-card">
            <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="stat-value">3 Roles</div>
              <div className="stat-label">Student • Lecturer • Admin</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAMS SECTION */}
      <section id="programs" style={{ padding: '4rem 0 2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>CURATED CURRICULA</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Academic Programs</h2>
            <p style={{ color: 'var(--text-muted)' }}>Deep technical specializations taught by senior practitioners.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsApplyModalOpen(true)}>
            Apply for any Program <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {courses.map((course) => (
            <div key={course.id} className="glass-panel-glow" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  background: 'rgba(0,0,0,0.75)', 
                  backdropFilter: 'blur(8px)',
                  padding: '0.25rem 0.65rem', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.8rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <Star size={14} color="var(--accent-warning)" fill="var(--accent-warning)" /> {course.rating} ({course.enrolledCount})
                </div>
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem' }} className="badge badge-indigo">
                  {course.category}
                </div>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{course.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {course.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                      {course.instructor.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{course.instructor}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.instructorTitle}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleApplyCourse(course.title)}>
                      Apply Now
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedCourseDetail(course)}>
                      Curriculum Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY US SECTION */}
      <section id="why-us" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>WHY NEEXUS ACADEMY</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Built for Serious Learners & Faculty</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
            Traditional LMS platforms isolate students. We unite discovery, admission tracking, and interactive faculty resolution into one synchronized engine.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Terminal size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Direct Faculty Resolution</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Ask questions tagged to exact video timestamps. Dr. Murali Mohan and our instructors resolve doubts directly from their dedicated cockpit.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified Progress & Reading Logs</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Maintain precise accountability with the "Mark as Read / Completed" pipeline, dynamic progress bars, and verifiable digital certificates.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified PDFs & Class Content</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Lecturers distribute accompanying lecture slide PDFs, official cheat sheets, and external code repository links alongside video content.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Transparent Admissions Tracker</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Track your prospective student application in real-time from Submitted → Review → 1-Click LMS Admission unlock.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LEARNING METHOD SECTION */}
      <section id="learning-method" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>PEDAGOGICAL ARCHITECTURE</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Our 4-Stage Learning Method</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Engineered to turn theoretical knowledge into verified production execution.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel-glow" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--grad-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              01
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Interactive Video Lecture</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Master architectural patterns and component boundaries through HD simulated or embedded video walkthroughs.
            </p>
          </div>

          <div className="glass-panel-glow" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--grad-success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              02
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Mark Read & Document Review</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Download PDF blueprints and cheat sheets, then click "Mark as Read" to register your lesson progress.
            </p>
          </div>

          <div className="glass-panel-glow" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--grad-warning)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              03
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Timestamped Doubts</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Submit doubts tied to the exact second of the lecture. Lecturers resolve questions directly with full video context.
            </p>
          </div>

          <div className="glass-panel-glow" style={{ padding: '1.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--grad-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
              04
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Verified Certification</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Upon 100% module completion, unlock your cryptographic digital Certificate of Completion for resume sharing.
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>PORTFOLIO CAPSTONES</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Production Projects You Will Build</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Hands-on systems engineered during the program to establish real engineering credibility.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {studentProjects.map((project, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>{project.category}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', color: 'var(--text-subtle)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', fontSize: '0.82rem', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={14} /> {project.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SUCCESS STORIES SECTION */}
      <section id="success-stories" style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>PROVEN CAREER OUTCOMES</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Student Success Stories</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Real outcomes from cohort alumni who advanced their engineering careers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', color: 'var(--accent-warning)', marginBottom: '0.75rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent-warning)" />)}
            </div>
            <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              "The ability to attach doubts directly to video timestamps and receive answers from Dr. Murali within hours completely accelerated my comprehension of reactive architectures."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                AR
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Alex Rivera</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloud Architect • Alumnus</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', color: 'var(--accent-warning)', marginBottom: '0.75rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent-warning)" />)}
            </div>
            <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              "The seamless transition between public application tracking, reading logs, and progress tracking allowed me to earn my certification smoothly while working full-time."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                SC
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Samantha Chen</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Senior DevOps Engineer</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', gap: '0.35rem', color: 'var(--accent-warning)', marginBottom: '0.75rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent-warning)" />)}
            </div>
            <p style={{ fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              "Having class content publishing, PDF distribution, and a real-time doubt resolution center in one cockpit makes faculty mentorship radically more effective."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                MM
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Dr. Murali Mohan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lead Course Instructor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" style={{ padding: '4rem 0', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Platform & Admissions FAQ</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-panel"
              style={{ padding: '1.25rem', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{faq.q}</div>
                <div>{expandedFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
              </div>

              {expandedFaq === index && (
                <p style={{ marginTop: '0.85rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>GET IN TOUCH</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Contact Admissions & Support</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Have questions about program admission, curriculum, or institutional access?</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Contact Info */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>Admissions Office</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="var(--accent-primary)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Admissions Email</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>admissions@neexusacademy.org</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MapPin size={18} color="var(--accent-primary)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Main Academic Campus</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Innovation Hub, Bangalore, India</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} color="var(--accent-primary)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Admissions Desk Hours</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Monday – Saturday: 9:00 AM – 6:30 PM IST</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>Ready to enroll?</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Click below to submit your prospective student application form.</p>
                <button className="btn btn-primary btn-sm" onClick={() => setIsApplyModalOpen(true)}>
                  [ APPLY NOW ]
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel-glow" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Send an Inquiry</h3>

              {contactSentMsg ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--accent-success)" style={{ margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Inquiry Received!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    Thank you. Our admissions counselor will review your inquiry and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Alex Rivera" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="alex@example.com" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select 
                      className="form-select"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    >
                      <option value="Course Admissions">Course Admissions & Cohort Intake</option>
                      <option value="Curriculum Syllabus">Curriculum & Syllabus Inquiries</option>
                      <option value="Faculty & Lecturers">Faculty & Lecturer Collaborations</option>
                      <option value="Technical Support">Platform Access & Technical Support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details *</label>
                    <textarea 
                      className="form-textarea" 
                      rows="3" 
                      placeholder="Write your question or request..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={15} /> Send Inquiry Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL APPLY SECTION (PROGRAMS → WHY US → LEARNING METHOD → PROJECTS → SUCCESS STORIES → FAQ → CONTACT → APPLY) */}
      <section id="apply" style={{ padding: '4rem 1rem 5rem 1rem', textAlign: 'center' }}>
        <div className="glass-panel-glow" style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '1rem' }}>ADMISSION DEADLINE APPROACHING</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Build Your Skills. Launch Your Engineering Career.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Submit your application in less than 2 minutes. Once approved by the Host / Admin, get full access to HD lectures, PDF materials, and direct lecturer doubt resolution.
          </p>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.95rem 2.5rem', fontSize: '1.1rem', fontWeight: 800 }}
            onClick={() => setIsApplyModalOpen(true)}
          >
            [ APPLY NOW FOR ADMISSION ] <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* CURRICULUM PREVIEW MODAL */}
      {selectedCourseDetail && (
        <div className="modal-overlay" onClick={() => setSelectedCourseDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">{selectedCourseDetail.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Instructor: {selectedCourseDetail.instructor} • {selectedCourseDetail.category}
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedCourseDetail(null)}>✕</button>
            </div>

            <div style={{ margin: '1rem 0' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Syllabus & Included Modules</h4>
              {selectedCourseDetail.modules.map((mod) => (
                <div key={mod.id} className="glass-panel" style={{ padding: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    {mod.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {mod.lessons.map(les => (
                      <div key={les.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Play size={12} color="var(--accent-primary)" /> {les.title}
                        </span>
                        <span>{les.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedCourseDetail(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => { setSelectedCourseDetail(null); handleApplyCourse(selectedCourseDetail.title); }}>
                Apply for Admission to Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMISSION APPLICATION MODAL */}
      <ApplicationModal 
        isOpen={isApplyModalOpen} 
        onClose={() => setIsApplyModalOpen(false)} 
        preselectedCourse={selectedCourseForApp}
      />
    </div>
  );
};
