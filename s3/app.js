const http = require('http');
const axios = require('axios'); // For making HTTP requests

const s1Url = 'http://s1:8081'; // Replace 's1' with the hostname of your s1 service container
const s2Url = 'http://s2:8082'; // Replace 's2' with the hostname of your s2 service container

const server = http.createServer(async (req, res) => {
  try {
    // Extract the numbers from the query parameters
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const a = parseFloat(urlParams.searchParams.get('a') || 0);
    const b = parseFloat(urlParams.searchParams.get('b') || 0);

    // Make HTTP requests to s1 and s2
    const [result1, result2] = await Promise.all([
      axios.get(`${s1Url}/?a=${a}&b=${b}`), // Request to s1
      axios.get(`${s2Url}/?a=${a}&b=${b}`), // Request to s2
    ]);

    // Extract the data from the responses
    const data1 = result1.data;
    const data2 = result2.data;

    // Process the results as needed
    const sum = parseFloat(data1.split(' ')[6]);
    const difference = parseFloat(data2.split(' ')[6]);

    // Create a response for s3
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Sum from s1: ${sum}\nDifference from s2: ${difference}`);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error occurred while fetching data from services.');
  }
});

const port = process.env.PORT || 8083;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

