// var net = require('net');
//
// net.createServer(function(socket) {
//
//   socket.on('data', function(data) {
//     process.stdout.write(data);
//   });
//
// }).listen(5000);

var express = require('express');
var app = express();

app.get('/test', function(req, res){
  console.log(req);
  res.status(200).end();
});

app.listen(3000);