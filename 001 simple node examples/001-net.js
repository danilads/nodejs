//node 000-simpleServer.js &
var net=require('net');

var server=net.createServer( function(socket) {
  соnsоle.lоg('Соединение с '+socket.remoteAddress+':'+socket.remotePort);
} ).listen(8080);

console.log('listening on port 8080');