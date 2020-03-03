// node 002-http.js

var http = require('http');

var server = http.createServer().listen(8080);
server.on('request', function(request, response) {
  response.writeHead( 200, { 'Content-Type' : 'text/html' } );
  response.end('<h1>Hello HTTP!</h1>');
});

console.log('listening on port 8080');
