/** Dependencies */
var figaro    = require('figaro').parse();
var redis     = require('redis').createClient();
var express   = require('express');
var LogParser = require('./lib/log_parser.js');


/** Init */
var app = express();



app.post('/test', LogParser.syslog, function(req, res) {
  console.log(req.get('Logplex-Msg-Count'));
  console.log(req.log_lines);
  res.status(200).end();
});

app.listen(3000);