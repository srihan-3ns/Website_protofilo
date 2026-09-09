const http = require('http');
const url = require('url');

// In-Memory Database / Store for Full-Stack Backend
let backendApplications = [
  {
    id: 'APP-9081',
    applicantName: 'Rahul',
    email: 'student@neexus.org',
    targetCourse: 'VLSI ENGINEERING',
    experience: 'Intermediate (1-3 Yrs)',
    statement: 'Looking to master CMOS digital design and layout to transition into physical design engineering.',
    status: 'Approved',
    submittedAt: '2026-09-07 10:24',
    reviewerNotes: 'Strong prerequisite in Boolean logic and circuit theory. Direct admission granted.'
  },
  {
    id: 'APP-9082',
    applicantName: 'Srihan',
    email: 'srihan@example.com',
    targetCourse: 'VLSI ENGINEERING',
    experience: 'Advanced (3+ Yrs)',
    statement: 'Seeking in-depth expertise in VLSI and Semiconductor hardware architectures.',
    status: 'Approved',
    submittedAt: '2026-09-08 14:15',
    reviewerNotes: 'Excellent academic background. Recommended for advanced VLSI project tracks.'
  }
];

let backendDoubts = [
  {
    id: 'dbt-101',
    courseId: 'course-vlsi',
    lessonId: 'vlsi-6',
    lessonTitle: '2.1 Half Adder & Full Adder Logic Derivations',
    topic: 'Full Adder',
    timestamp: '12:40',
    studentName: 'Rahul',
    question: "I don't understand how Cout is derived in the Full Adder circuit.",
    status: 'Resolved',
    reply: 'Cout is derived from the Full Adder truth table: Cout = A·B + Cin·(A ⊕ B). When any two or more inputs are 1, a carry out bit is generated.',
    repliedAt: '2026-09-08 14:30',
    repliedBy: 'Dr. Murali Mohan'
  }
];

let backendAnnouncements = [
  {
    id: 'anc-1',
    courseId: 'course-vlsi',
    courseTitle: 'VLSI ENGINEERING',
    title: 'Welcome to VLSI Engineering! Semester Kick-off',
    date: 'Sep 08, 2026',
    content: 'Welcome students! Please review Module 1 lecture slides on CMOS Inverter characteristics before our live interactive Q&A session this Thursday.'
  }
];

let contactMessages = [];

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const sendJson = (res, statusCode, data) => {
  setCorsHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const parseBody = (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  // API ROUTES
  if (pathname.startsWith('/api/')) {
    // Health check
    if (pathname === '/api/health') {
      return sendJson(res, 200, {
        status: 'ok',
        service: 'Neexus Academy Full-Stack Backend API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    }

    // Applications API
    if (pathname === '/api/applications') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { success: true, applications: backendApplications });
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newApp = {
          id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
          applicantName: body.name || 'Anonymous Applicant',
          email: body.email || 'applicant@example.com',
          targetCourse: body.targetCourse || 'VLSI ENGINEERING',
          experience: body.experience || 'Beginner',
          statement: body.statement || 'Excited to enroll.',
          status: 'Under Review',
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          reviewerNotes: 'Pending evaluation by admissions team.'
        };
        backendApplications.unshift(newApp);
        return sendJson(res, 201, { success: true, application: newApp });
      }
    }

    // Doubts API
    if (pathname === '/api/doubts') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { success: true, doubts: backendDoubts });
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newDoubt = {
          id: `dbt-${Date.now()}`,
          courseId: body.courseId || 'course-vlsi',
          lessonId: body.lessonId || 'vlsi-1',
          lessonTitle: body.lessonTitle || 'Lesson',
          topic: body.topic || 'General Topic',
          timestamp: body.timestamp || '00:00',
          studentName: body.studentName || 'Student',
          question: body.question || '',
          status: 'Pending',
          reply: '',
          repliedAt: '',
          repliedBy: ''
        };
        backendDoubts.unshift(newDoubt);
        return sendJson(res, 201, { success: true, doubt: newDoubt });
      }
    }

    // Announcements API
    if (pathname === '/api/announcements') {
      if (req.method === 'GET') {
        return sendJson(res, 200, { success: true, announcements: backendAnnouncements });
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newAnc = {
          id: `anc-${Date.now()}`,
          courseId: body.courseId || 'ALL',
          courseTitle: body.courseTitle || 'All Courses',
          title: body.title || 'Announcement',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          content: body.content || ''
        };
        backendAnnouncements.unshift(newAnc);
        return sendJson(res, 201, { success: true, announcement: newAnc });
      }
    }

    // Contact API
    if (pathname === '/api/contact' && req.method === 'POST') {
      const body = await parseBody(req);
      contactMessages.push({ ...body, receivedAt: new Date().toISOString() });
      return sendJson(res, 200, { success: true, message: 'Inquiry received successfully' });
    }

    // 404 for unknown API
    return sendJson(res, 404, { error: 'API route not found' });
  }

  // NON-API: Proxy to Vite frontend server on port 5173
  const options = {
    hostname: '127.0.0.1',
    port: 5173,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: '127.0.0.1:5173'
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>Neexus Academy - Dev Gateway</title></head>
        <body style="font-family: system-ui, sans-serif; background: #080A0D; color: #F4F7FA; padding: 3rem; text-align: center;">
          <h2 style="color: #F1B93E;">Vite Frontend Server Starting...</h2>
          <p style="color: #89929D;">The backend gateway is active on port 8080. Waiting for Vite dev server on port 5173.</p>
          <p style="font-size: 0.9rem; color: #64748B;">Once Vite is active, refresh this page or visit <a href="http://localhost:5173" style="color: #4F46E5;">http://localhost:5173</a> directly.</p>
        </body>
      </html>
    `);
  });

  req.pipe(proxyReq, { end: true });
});

const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` Neexus Academy Full-Stack Backend Gateway Active!`);
  console.log(` - Backend API & Gateway: http://localhost:${PORT}`);
  console.log(` - Healthcheck:           http://localhost:${PORT}/api/health`);
  console.log(` - Frontend Proxy:        http://localhost:${PORT}/ -> http://127.0.0.1:5173`);
  console.log(`=======================================================`);
});
