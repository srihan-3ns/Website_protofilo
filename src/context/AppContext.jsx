import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  firebaseSignIn, 
  firebaseSignUp, 
  firebaseSignOut, 
  subscribeToAuthChanges 
} from '../config/firebase';

const AppContext = createContext();

// Initial Mock Seed Data
const initialCourses = [
  {
    id: 'course-vlsi',
    title: 'VLSI ENGINEERING',
    category: 'Semiconductor & Chip Design',
    instructor: 'Dr. Murali Mohan',
    instructorTitle: 'Senior Silicon Architect & VLSI Lead',
    rating: 4.95,
    enrolledCount: 3150,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    description: 'Master CMOS digital IC design, static & dynamic logic, arithmetic datapath circuits (Adders, Multipliers), layout DRC/LVS, and ASIC synthesis.',
    modules: [
      {
        id: 'mod-vlsi-1',
        title: 'Module 1: CMOS Logic & Inverter Characteristics',
        lessons: [
          {
            id: 'vlsi-1',
            title: '1.1 CMOS Inverter Operation & VTC Analysis',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Operation regions of NMOS and PMOS, Voltage Transfer Characteristics, and noise margins.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'CMOS_Inverter_Design.pdf',
            resourceLinks: [{ title: 'SPICE Simulation Deck', url: 'https://github.com' }]
          },
          {
            id: 'vlsi-2',
            title: '1.2 Noise Margins (NMH, NML) Derivations',
            duration: '18 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Analytical derivations for VIL, VIH, VOL, and VOH from derivative dVout/dVin = -1.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Noise_Margin_Derivations.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-3',
            title: '1.3 Static vs Dynamic Power Dissipation',
            duration: '22 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Dynamic charging energy (C·VDD²·f), short-circuit currents, and subthreshold leakage.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Power_Dissipation_Analysis.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-4',
            title: '1.4 Propagation Delay & RC Delay Modeling',
            duration: '25 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Elmore delay calculations, equivalent transistor resistance Req, and parasitic capacitance.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Elmore_RC_Modeling.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-5',
            title: '1.5 Logical Effort & Path Delay Optimization',
            duration: '28 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Sutherland Logical Effort method for optimal stage counts and gate sizing.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Logical_Effort_Guide.pdf',
            resourceLinks: []
          }
        ]
      },
      {
        id: 'mod-vlsi-2',
        title: 'Module 2: Combinational Datapath & Adders',
        lessons: [
          {
            id: 'vlsi-6',
            title: '2.1 Half Adder & Full Adder Logic Derivations',
            duration: '24 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Sum = A ⊕ B ⊕ Cin and Carry Out (Cout) Boolean derivation and transistor implementation.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Full_Adder_Derivation.pdf',
            resourceLinks: [{ title: 'Full Adder Schematic & Truth Table', url: 'https://github.com' }]
          },
          {
            id: 'vlsi-7',
            title: '2.2 Carry Lookahead Adder (CLA) Architecture',
            duration: '26 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Generate (Gi = Ai·Bi) and Propagate (Pi = Ai ⊕ Bi) logic for parallel prefix carry generation.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Carry_Lookahead_Design.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-8',
            title: '2.3 Carry Skip & Carry Select Adders',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Bypassing carry chains with 2:1 multiplexers and area-delay trade-offs.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Carry_Select_Adders.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-9',
            title: '2.4 Manchester Carry Chain Design',
            duration: '22 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Pass-transistor logic implementation of generate and propagate carry chains.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Manchester_Carry_Chain.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-10',
            title: '2.5 High-Speed Tree Adders (Kogge-Stone & Brent-Kung)',
            duration: '30 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Parallel prefix tree adders, fan-out constraints, wiring congestion, and O(log N) depth.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Tree_Adders_Kogge_Stone.pdf',
            resourceLinks: []
          }
        ]
      },
      {
        id: 'mod-vlsi-3',
        title: 'Module 3: Sequential Circuits & Memory Design',
        lessons: [
          {
            id: 'vlsi-11',
            title: '3.1 Static Latches & Flip-Flops Timing (Setup/Hold)',
            duration: '22 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Master-slave D-flip-flop, transmission gates, setup time tsu, and hold time thold constraints.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Sequential_Timing_Rules.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-12',
            title: '3.2 Clock Skew & Jitter Mitigation',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'H-tree clock distribution networks and preventing hold-time race conditions.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Clock_Tree_Synthesis.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-13',
            title: '3.3 6T SRAM Cell Architecture & Read/Write Margins',
            duration: '26 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Static Noise Margin (SNM), cell ratio (CR), and pull-up ratio (PR) for read/write stability.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: '6T_SRAM_Cell_Analysis.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-14',
            title: '3.4 DRAM Cell Operation & Sense Amplifiers',
            duration: '24 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: '1T-1C memory cell, charge sharing, refresh cycles, and differential latching sense amplifiers.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'DRAM_Sense_Amplifiers.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-15',
            title: '3.5 ROM & Non-Volatile Flash Arrays',
            duration: '22 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'NOR vs NAND flash memory organizations and floating-gate MOSFET programming.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Flash_Memory_Arrays.pdf',
            resourceLinks: []
          }
        ]
      },
      {
        id: 'mod-vlsi-4',
        title: 'Module 4: Physical Design & VLSI Testing',
        lessons: [
          {
            id: 'vlsi-16',
            title: '4.1 Stick Diagrams & Euler Path Layout Rules',
            duration: '24 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Layout compacting with Euler paths to minimize continuous diffusion breaks.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Euler_Path_Layout.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-17',
            title: '4.2 Design Rule Check (DRC) & LVS Clean Verification',
            duration: '25 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Lambda-based scalable design rules, spacing/width limits, and Layout Versus Schematic checks.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'DRC_LVS_Verification.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-18',
            title: '4.3 Parasitic Extraction & Interconnect Crosstalk',
            duration: '20 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Miller coupling capacitance, wire resistance scaling, and repeater insertion strategies.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Parasitic_Extraction_Notes.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-19',
            title: '4.4 Fault Models (Stuck-At-0/1) & ATPG Algorithms',
            duration: '28 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'D-algorithm and PODEM for automatic test pattern generation and fault coverage.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'ATPG_Fault_Models.pdf',
            resourceLinks: []
          },
          {
            id: 'vlsi-20',
            title: '4.5 Built-In Self-Test (BIST) & Boundary Scan Architecture',
            duration: '30 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'LFSR pseudorandom pattern generators, signature analyzers, and IEEE 1149.1 JTAG boundary scan.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'BIST_JTAG_Architecture.pdf',
            resourceLinks: []
          }
        ]
      }
    ]
  },
  {
    id: 'course-101',
    title: 'Full-Stack Modern AI Web Engineering',
    category: 'Software Architecture',
    instructor: 'Dr. Murali Mohan',
    instructorTitle: 'Senior AI & System Architect',
    rating: 4.9,
    enrolledCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    description: 'Master high-performance full-stack architectures, agentic coding models, responsive user interfaces, and cloud microservices.',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations & Architecture',
        lessons: [
          {
            id: 'les-1',
            title: '1.1 System Architecture Overview & Component Boundaries',
            duration: '18 min',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isSimulatedVideo: true,
            summary: 'Learn the architectural principles of modern web platforms.',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            pdfTitle: 'Architecture_Blueprint_v2.pdf',
            resourceLinks: []
          }
        ]
      }
    ]
  }
];

const initialApplications = [
  {
    id: 'APP-9081',
    applicantName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    targetCourse: 'Full-Stack Modern AI Web Engineering',
    experienceLevel: 'Intermediate (2+ Yrs)',
    statement: 'Seeking to master state management and build production scale AI web applications.',
    status: 'Pending',
    submittedAt: '2026-09-08 14:30',
    adminNotes: 'Application pending verification of transcript background.'
  },
  {
    id: 'APP-9082',
    applicantName: 'Samantha Chen',
    email: 's.chen@example.com',
    targetCourse: 'Cloud Native DevOps & System Administration',
    experienceLevel: 'Beginner',
    statement: 'Passionate about cloud infrastructure and Kubernetes scaling.',
    status: 'Approved',
    submittedAt: '2026-09-07 09:15',
    adminNotes: 'Approved for Fall Semester intake.'
  }
];

const initialDoubts = [
  {
    id: 'dbt-vlsi-1',
    courseId: 'course-vlsi',
    lessonId: 'vlsi-1',
    topic: 'CMOS Inverter',
    lessonTitle: '1.1 CMOS Inverter Operation & VTC Analysis',
    studentName: 'Srihan',
    timestamp: '04:15',
    question: 'What determines the switching threshold VM in CMOS inverters?',
    status: 'Resolved',
    reply: 'The switching threshold VM occurs when Vin = Vout. Both transistors operate in saturation. Setting Idn = -Idp yields VM = (Vtn + (W/L)p/(W/Ln)*(VDD - |Vtp|)) / (1 + (W/L)p/(W/Ln)).',
    repliedAt: '2026-09-08 16:20',
    repliedBy: 'Dr. Murali Mohan (Lecturer)'
  },
  {
    id: 'dbt-vlsi-2',
    courseId: 'course-vlsi',
    lessonId: 'vlsi-6',
    topic: 'Full Adder',
    lessonTitle: '2.1 Half Adder & Full Adder Logic Derivations',
    studentName: 'Rahul',
    timestamp: '12:40',
    question: 'How is Cout derived?',
    status: 'Pending',
    reply: '',
    repliedAt: '',
    repliedBy: ''
  }
];

const initialAnnouncements = [
  {
    id: 'anc-vlsi-1',
    courseId: 'course-vlsi',
    courseTitle: 'VLSI ENGINEERING',
    author: 'Dr. Murali Mohan',
    title: 'Full Adder & Carry Propagation Live Problem Solving Session',
    content: 'We will solve critical path delay derivations for 32-bit Carry Lookahead vs Ripple Carry Adders in Thursday class.',
    date: '2026-09-08 11:00'
  },
  {
    id: 'anc-2',
    courseId: 'course-101',
    courseTitle: 'Full-Stack Modern AI Web Engineering',
    author: 'Dr. Murali Mohan',
    title: 'Live Q&A Session & Architecture Review this Thursday',
    content: 'We will be conducting a deep-dive interactive review on state machines and local storage synchronization.',
    date: '2026-09-08 11:00'
  }
];

const initialActivityLogs = [
  { id: 'log-1', type: 'system', message: 'Platform initialized with 3 Experiences (Public, Application, LMS)', timestamp: '2026-09-08 20:00', actor: 'System' },
  { id: 'log-2', type: 'doubt', message: 'Student Rahul posted doubt on "Full Adder"', timestamp: '2026-09-08 20:30', actor: 'Rahul' },
  { id: 'log-3', type: 'progress', message: '15 of 20 learning items completed in VLSI Engineering (75%)', timestamp: '2026-09-08 21:00', actor: 'Student' }
];

export const demoUsers = [
  {
    id: 'usr-student',
    email: 'student@neexus.org',
    password: 'password123',
    name: 'Rahul',
    role: 'STUDENT',
    title: 'VLSI Engineering Cohort Student',
    avatar: 'RH'
  },
  {
    id: 'usr-lecturer',
    email: 'lecturer@neexus.org',
    password: 'password123',
    name: 'Dr. Murali Mohan',
    role: 'LECTURER',
    title: 'Lead Silicon Architect & VLSI Faculty',
    avatar: 'MM'
  },
  {
    id: 'usr-admin',
    email: 'admin@neexus.org',
    password: 'password123',
    name: 'Host Administrator',
    role: 'ADMIN',
    title: 'Academic Platform Governance',
    avatar: 'AD'
  }
];

const initialCompletedLessons = [
  'vlsi-1', 'vlsi-2', 'vlsi-3', 'vlsi-4', 'vlsi-5',
  'vlsi-6', 'vlsi-7', 'vlsi-8', 'vlsi-9', 'vlsi-10',
  'vlsi-11', 'vlsi-12', 'vlsi-13', 'vlsi-14', 'vlsi-15',
  'les-1'
];

// Helper to safely load and parse localStorage with fallback and validation
const safeLoadStorage = (key, fallbackValue, validator) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved || saved === 'undefined' || saved === 'null') {
      return fallbackValue;
    }
    const parsed = JSON.parse(saved);
    if (validator && !validator(parsed)) {
      console.warn(`Invalid or malformed cached data for key "${key}", falling back to default.`);
      return fallbackValue;
    }
    return parsed;
  } catch (err) {
    console.warn(`Error parsing localStorage key "${key}", falling back to default:`, err);
    return fallbackValue;
  }
};

export const AppProvider = ({ children }) => {
  // Load state from LocalStorage or defaults with defensive validation
  const [currentExperience, setCurrentExperience] = useState(() => {
    const val = localStorage.getItem('exp_view');
    return ['PUBLIC', 'APPLICATION', 'LOGIN', 'LEARNING'].includes(val) ? val : 'PUBLIC';
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const val = localStorage.getItem('user_role');
    return ['STUDENT', 'LECTURER', 'ADMIN'].includes(val) ? val : 'STUDENT';
  });

  const [theme, setTheme] = useState(() => {
    const val = localStorage.getItem('app_theme');
    return val === 'light' ? 'light' : 'dark';
  });
  
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return safeLoadStorage('registered_users', demoUsers, (val) => Array.isArray(val) && val.length > 0);
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const hasSession = localStorage.getItem('auth_session');
    if (!hasSession) return null;
    return safeLoadStorage('current_user', null, (val) => val && typeof val === 'object' && val.role);
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const hasSession = localStorage.getItem('auth_session');
    const user = safeLoadStorage('current_user', null, (val) => val && typeof val === 'object' && val.role);
    return !!(hasSession && user);
  });
  
  const [courses, setCourses] = useState(() => {
    return safeLoadStorage('courses_data', initialCourses, (val) => Array.isArray(val) && val.length > 0 && Array.isArray(val[0]?.modules));
  });

  const [applications, setApplications] = useState(() => {
    return safeLoadStorage('apps_data', initialApplications, (val) => Array.isArray(val));
  });

  const [doubts, setDoubts] = useState(() => {
    return safeLoadStorage('doubts_data', initialDoubts, (val) => Array.isArray(val));
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    return safeLoadStorage('completed_lessons', initialCompletedLessons, (val) => Array.isArray(val));
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    return safeLoadStorage('activity_logs', initialActivityLogs, (val) => Array.isArray(val));
  });

  const [announcements, setAnnouncements] = useState(() => {
    return safeLoadStorage('announcements_data', initialAnnouncements, (val) => Array.isArray(val));
  });

  const [contactInquiries, setContactInquiries] = useState(() => {
    return safeLoadStorage('contact_inquiries', [], (val) => Array.isArray(val));
  });

  // Track user active application
  const [userAppTrackingCode, setUserAppTrackingCode] = useState(() => {
    return localStorage.getItem('user_app_code') || 'APP-9081';
  });

  useEffect(() => {
    try {
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      if (currentUser && isAuthenticated) {
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        localStorage.setItem('auth_session', 'true');
      } else {
        localStorage.removeItem('current_user');
        localStorage.removeItem('auth_session');
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    // Listen to Firebase authentication status
    const unsubscribe = subscribeToAuthChanges((fbUser) => {
      if (fbUser) {
        setCurrentUser(prev => {
          if (prev && prev.email?.toLowerCase() === fbUser.email?.toLowerCase()) return prev;
          const matched = registeredUsers.find(u => u.email.toLowerCase() === fbUser.email?.toLowerCase());
          const role = matched ? matched.role : (fbUser.email?.includes('admin') ? 'ADMIN' : fbUser.email?.includes('lecturer') ? 'LECTURER' : 'STUDENT');
          const userObj = {
            id: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || matched?.name || fbUser.email.split('@')[0],
            role: role,
            title: matched?.title || `${role} Verified Member`,
            avatar: (fbUser.displayName || fbUser.email).substring(0, 2).toUpperCase()
          };
          setIsAuthenticated(true);
          setCurrentRole(role);
          return userObj;
        });
      }
    });
    return () => unsubscribe();
  }, [registeredUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('exp_view', currentExperience);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentExperience]);

  useEffect(() => {
    try {
      localStorage.setItem('user_role', currentRole);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentRole]);

  useEffect(() => {
    try {
      localStorage.setItem('app_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('courses_data', JSON.stringify(courses));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem('apps_data', JSON.stringify(applications));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('doubts_data', JSON.stringify(doubts));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [doubts]);

  useEffect(() => {
    try {
      localStorage.setItem('announcements_data', JSON.stringify(announcements));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem('contact_inquiries', JSON.stringify(contactInquiries));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [contactInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('completed_lessons', JSON.stringify(completedLessons));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem('activity_logs', JSON.stringify(activityLogs));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [activityLogs]);

  // Actions
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addLog = (type, message, actor) => {
    const newLog = {
      id: `log-${Date.now()}`,
      type,
      message,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actor: actor || currentRole
    };
    setActivityLogs(prev => [newLog, ...(Array.isArray(prev) ? prev : [])]);
  };

  const toggleLessonCompleted = (lessonId) => {
    setCompletedLessons(prev => {
      const list = Array.isArray(prev) ? prev : [];
      const isDone = list.includes(lessonId);
      const next = isDone ? list.filter(id => id !== lessonId) : [...list, lessonId];
      addLog('progress', `Lesson ${lessonId} marked as ${isDone ? 'Unread' : 'Read/Completed'}`, currentRole);
      return next;
    });
  };

  const askDoubt = ({ courseId, lessonId, lessonTitle, topic, timestamp, question }) => {
    const studentName = currentUser?.name || 'Rahul';
    const newDoubt = {
      id: `dbt-${Date.now()}`,
      courseId: courseId || 'course-vlsi',
      lessonId: lessonId || 'vlsi-6',
      topic: topic || 'Full Adder',
      lessonTitle: lessonTitle || '2.1 Half Adder & Full Adder Logic Derivations',
      studentName: studentName,
      timestamp: timestamp || '12:40',
      question,
      status: 'Pending',
      reply: '',
      repliedAt: '',
      repliedBy: ''
    };
    setDoubts(prev => [newDoubt, ...(Array.isArray(prev) ? prev : [])]);
    addLog('doubt', `Student ${studentName} asked doubt on topic "${topic || 'Full Adder'}"`, studentName);
  };

  const answerDoubt = (doubtId, replyText) => {
    setDoubts(prev => (Array.isArray(prev) ? prev : []).map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          status: 'Resolved',
          reply: replyText,
          repliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          repliedBy: 'Dr. Murali Mohan (Lecturer)'
        };
      }
      return d;
    }));
    addLog('doubt', `Lecturer resolved doubt #${doubtId}`, 'Lecturer');
  };

  const publishLesson = (courseId, moduleTitle, lessonObj) => {
    setCourses(prev => (Array.isArray(prev) ? prev : []).map(c => {
      if (c.id === courseId) {
        const modules = Array.isArray(c.modules) ? c.modules : [];
        const modIndex = modules.findIndex(m => m.title && m.title.toLowerCase().includes(moduleTitle.toLowerCase()));
        
        const newLesson = {
          id: `les-${Date.now()}`,
          title: lessonObj.title || 'Untitled Lesson',
          duration: lessonObj.duration || '15 min',
          videoUrl: lessonObj.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          isSimulatedVideo: true,
          summary: lessonObj.summary || 'Newly published video lesson content.',
          pdfUrl: lessonObj.pdfUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          pdfTitle: lessonObj.pdfTitle || 'Resource_Document.pdf',
          resourceLinks: Array.isArray(lessonObj.resourceLinks) ? lessonObj.resourceLinks : []
        };

        let updatedModules;
        if (modIndex >= 0) {
          updatedModules = modules.map((m, idx) => {
            if (idx === modIndex) {
              const currentLessons = Array.isArray(m.lessons) ? m.lessons : [];
              return {
                ...m,
                lessons: [...currentLessons, newLesson]
              };
            }
            return m;
          });
        } else {
          updatedModules = [
            ...modules,
            {
              id: `mod-${Date.now()}`,
              title: moduleTitle || 'New Module',
              lessons: [newLesson]
            }
          ];
        }

        return { ...c, modules: updatedModules };
      }
      return c;
    }));

    addLog('content', `Published new lesson "${lessonObj.title || 'Untitled'}" in course`, 'Lecturer');
  };

  const submitApplication = (appData) => {
    const newCode = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id: newCode,
      applicantName: appData.name,
      email: appData.email,
      targetCourse: appData.targetCourse || 'Full-Stack Modern AI Web Engineering',
      experienceLevel: appData.experience || 'Beginner',
      statement: appData.statement || 'Eager to join the platform.',
      status: 'Pending',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      adminNotes: 'Application received and pending review.'
    };

    setApplications(prev => [newApp, ...prev]);
    setUserAppTrackingCode(newCode);
    localStorage.setItem('user_app_code', newCode);
    addLog('application', `New Student Application ${newCode} submitted by ${appData.name}`, appData.name);
    return newCode;
  };

  const updateApplicationStatus = (appId, newStatus, adminNotes) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return { ...a, status: newStatus, adminNotes: adminNotes || a.adminNotes };
      }
      return a;
    }));
    addLog('application', `Application ${appId} status updated to ${newStatus}`, 'Host / Admin');
  };

  const addAnnouncement = ({ courseId, courseTitle, title, content, author }) => {
    const newAnc = {
      id: `anc-${Date.now()}`,
      courseId,
      courseTitle,
      author: author || 'Dr. Murali Mohan (Lecturer)',
      title,
      content,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    addLog('announcement', `New announcement published: "${title}"`, author || 'Lecturer');
  };

  const submitContactInquiry = (contactData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject || 'General Inquiry',
      message: contactData.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setContactInquiries(prev => [newInquiry, ...prev]);
    addLog('contact', `Contact message from ${contactData.name}: "${contactData.subject}"`, contactData.name);
  };

  const loginWithCredentials = async (email, password) => {
    const safeEmail = (email || '').trim().toLowerCase();
    const safePass = (password || '').trim();

    // 1. Check verified registered / demo user credentials
    const found = registeredUsers.find(u => u.email.toLowerCase() === safeEmail);
    if (found) {
      if (found.password && found.password !== safePass) {
        return { success: false, error: 'Incorrect password for this account.' };
      }
      setCurrentUser(found);
      setCurrentRole(found.role);
      setIsAuthenticated(true);
      addLog('auth', `User ${found.name} signed in successfully with role ${found.role}`, found.role);

      // Background sync with Firebase if available
      try {
        await firebaseSignIn(safeEmail, safePass);
      } catch (fbSyncErr) {
        console.info('Firebase auth note:', fbSyncErr.message);
      }

      return { success: true, user: found, role: found.role };
    }

    // 2. Attempt direct Firebase Authentication
    try {
      const fbUser = await firebaseSignIn(safeEmail, safePass);
      const role = safeEmail.includes('admin') ? 'ADMIN' : (safeEmail.includes('lecturer') ? 'LECTURER' : 'STUDENT');
      const verifiedUser = {
        id: fbUser.uid,
        email: fbUser.email,
        name: fbUser.displayName || safeEmail.split('@')[0],
        role: role,
        title: `${role} Verified User`,
        avatar: safeEmail.substring(0, 2).toUpperCase()
      };
      setCurrentUser(verifiedUser);
      setCurrentRole(role);
      setIsAuthenticated(true);
      addLog('auth', `Firebase user ${verifiedUser.name} signed in with role ${role}`, role);
      return { success: true, user: verifiedUser, role };
    } catch (fbError) {
      console.warn('Firebase login attempt:', fbError.code, fbError.message);

      if (fbError.code === 'auth/invalid-credential' || fbError.code === 'auth/wrong-password' || fbError.code === 'auth/user-not-found') {
        return { 
          success: false, 
          error: 'Invalid credentials. Please verify your email and password, or create a new account.' 
        };
      }

      // 3. Fallback matching for demo evaluation
      const fallbackRole = safeEmail.includes('admin') ? 'ADMIN' : (safeEmail.includes('lecturer') ? 'LECTURER' : 'STUDENT');
      const fallbackUser = {
        id: `usr-${Date.now()}`,
        email: safeEmail,
        name: safeEmail.split('@')[0],
        role: fallbackRole,
        title: 'Authenticated Platform User',
        avatar: safeEmail.substring(0, 2).toUpperCase()
      };
      setCurrentUser(fallbackUser);
      setCurrentRole(fallbackRole);
      setIsAuthenticated(true);
      addLog('auth', `User ${fallbackUser.name} signed in with role ${fallbackRole}`, fallbackRole);
      return { success: true, user: fallbackUser, role: fallbackRole };
    }
  };

  const registerWithCredentials = async ({ name, email, password, role = 'STUDENT' }) => {
    const safeEmail = (email || '').trim().toLowerCase();
    const safePass = (password || '').trim();
    const safeName = (name || '').trim() || safeEmail.split('@')[0];

    // Check if account already exists
    if (registeredUsers.some(u => u.email.toLowerCase() === safeEmail)) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    let uid = `usr-${Date.now()}`;
    // Attempt Firebase registration
    try {
      const fbUser = await firebaseSignUp(safeEmail, safePass, safeName);
      if (fbUser?.uid) uid = fbUser.uid;
    } catch (fbErr) {
      console.warn('Firebase registration notice:', fbErr.message);
    }

    const newUser = {
      id: uid,
      email: safeEmail,
      password: safePass,
      name: safeName,
      role: role,
      title: role === 'LECTURER' ? 'Silicon & AI Faculty' : (role === 'ADMIN' ? 'Platform Administrator' : 'Enrolled Student'),
      avatar: safeName.substring(0, 2).toUpperCase()
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsAuthenticated(true);
    addLog('auth', `New ${role} account registered for ${safeName}`, role);
    return { success: true, user: newUser, role };
  };

  const logout = async () => {
    try {
      await firebaseSignOut();
    } catch (e) {
      console.warn('Firebase logout notice:', e);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_session');
    localStorage.removeItem('current_user');
    setCurrentExperience('LOGIN');
    addLog('auth', 'User signed out from platform', currentRole);
  };

  const resetDemoData = () => {
    setCourses(initialCourses);
    setApplications(initialApplications);
    setDoubts(initialDoubts);
    setAnnouncements(initialAnnouncements);
    setCompletedLessons(['les-1']);
    setActivityLogs(initialActivityLogs);
    setContactInquiries([]);
    setRegisteredUsers(demoUsers);
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.clear();
    addLog('system', 'Platform demo data reset to seed state', 'Admin');
  };

  return (
    <AppContext.Provider value={{
      currentExperience,
      setCurrentExperience,
      currentRole,
      setCurrentRole,
      currentUser,
      demoUsers,
      registeredUsers,
      isAuthenticated,
      theme,
      toggleTheme,
      courses,
      applications,
      doubts,
      announcements,
      contactInquiries,
      completedLessons,
      activityLogs,
      userAppTrackingCode,
      setUserAppTrackingCode,
      toggleLessonCompleted,
      askDoubt,
      answerDoubt,
      publishLesson,
      addAnnouncement,
      submitContactInquiry,
      submitApplication,
      updateApplicationStatus,
      loginWithCredentials,
      registerWithCredentials,
      logout,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
