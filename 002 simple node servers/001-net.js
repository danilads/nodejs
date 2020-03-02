// node 001-net.js

var net = require('net');
var server = net.createServer(function(socket) { 
   console.log('Соединение с '+socket.remoteAddress+':'+socket.remotePort);
}).listen(8080);

console.log('listening on port 8080');