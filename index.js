/** Dependencies */
var express    = require('express');
var bodyParser = require('body-parser');
var logParser  = require('./lib/logparser.js');
var broker     = require('./lib/broker.js');

/** IO */
var io = {
  console:     require('./lib/io/console.js'),
  orchestrate: require('./lib/io/orchestrate.js')
};

/** Init */
broker.use(new io.console());
broker.use(new io.orchestrate());

var app = express();


/** 
 * Syslogs
 */
app.post('/syslog/:session', logParser.syslog, function(req, res) {
  req.loglines.forEach(function(line) {
    broker.syslog(req.param('session'), line);
  });

  // OK
  res.status(200).end();
});


/** 
 * Records 
 */
app.post('/session/:session', bodyParser.json, function(req, res) {
  broker.record(req.param('session'), 'test.txt', 'sdfsdfsdfsdfsdf');

  // OK
  res.status(200).end();
});


// Start Express
app.listen(process.env.port || 3000);