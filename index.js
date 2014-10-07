var net = require('net');

net.createServer(function(socket) {
  
  socket.on('data', function(data) {
    process.stdout.write(data);
  });
  
}).listen(5000);