// node 003-net.js

let net = require('net');
net.createServer(function(socket) { 
   console.log('Соединение с '+socket.remoteAddress+':'+socket.remotePort);
}).listen(8080);

console.log('listening on port 8080');