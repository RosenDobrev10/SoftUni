const { createServer } = require('http');
const { handleRequest } = require('./main.js');

const server = createServer(handleRequest);

server.listen(3000);
