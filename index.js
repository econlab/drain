/** Dependencies */
var express    = require('express');
var bodyParser = require('body-parser');
var logParser  = require('./lib/logparser.js');


/** Init */
var app = express();


/** 
 * Syslogs
 */
app.post('/syslog/:session', logParser.syslog, function(req, res) {
  req.loglines.forEach(function(line) {
    redis.publish('syslogs', msg.syslog(req.param('session'), line));
  });

  // OK
  res.status(200).end();
});


/** 
 * Records 
 */
app.post('/session/:session', bodyParser.json, function(req, res) {


  // OK
  res.status(200).end();
});


// Start Express
app.listen(process.env.port || 3000);