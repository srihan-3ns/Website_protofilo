const http = require('http');

const server = http.createServer((req, res) => {
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
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Waiting for Vite dev server on port 5173...');
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Bridge active on http://localhost:8080 -> http://127.0.0.1:5173');
});
