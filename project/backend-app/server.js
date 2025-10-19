'use strict';

const { createServer }  = require('node:http');

const server = createServer((req, res) => {
  console.info(`DATE: [${ new Date().toISOString() }] ${req.headers.host} ${req.method}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

server.listen(4000, '0.0.0.0', () => {
  console.info('Listening on 0.0.0.0:4000');
});
