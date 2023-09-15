// difference.js

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { a, b } = parsedUrl.query;

  if (a && b) {
    const result = parseFloat(a) - parseFloat(b);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Difference of ${a} and ${b} is ${result}`);
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid input. Please provide two numbers as query parameters.');
  }
});

const port = 8082;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
