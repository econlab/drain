/** Dependencies */
var figaro  = require('figaro').parse();
var redis   = require('redis').createClient();
var express = require('express');


/** Init */
var app = express();

/** Log parser */
function parseLines(chunk) {
  return chunk.split('\n')
    .splice(0,-1)
    .map(function(n) {
      return n.replace(/^\d+ \<\d+\>\w /,'');
    });
}

app.use(function(req, res, next) {
  req.logLines = [];
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.logLines = req.logLines.concat(parseLines(chunk));
  });

  req.on('end', function() {
    next();
  });
});

app.post('/test', function(req, res) {
  console.log(req.get('Logplex-Msg-Count'));
  console.log(req.logLines);
  res.status(200).end();
});

app.listen(3000);