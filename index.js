const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.Server(app);

server.listen(port, () => {
  console.log('Server running!');
});

