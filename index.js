/** Dependencies */
var https      = require('https');
var fs         = require('fs');
var express    = require('express');
var bodyParser = require('body-parser');
var logParser  = require('./lib/logparser.js');
var broker     = require('./lib/broker.js');

/** IO */
var io = {
  console:     require('./lib/io/console.js'),
  orchestrate: require('./lib/io/orchestrate.js'),
  pusher:      require('./lib/io/pusher.js')
};

/** Init */
broker.use(new io.console());
broker.use(new io.orchestrate());
broker.use(new io.pusher());

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
  broker.record(req.param('session'), req.param('name'), req.param('payload'));

  // OK
  res.status(200).end();
});


/**
 * ETC
 */
app.all('*', function(req, res) {
  res.send('You seem to be mistaken...');
});





// Start Express
if (process.env.NODE_ENV==='production') {
  var ssl = {
    key:  fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CRT)
  };
  
  // launch https
  https.createServer(ssl, app).listen(process.env.PORT || 3000);
  
} else {
  
  // do normal app
  app.listen(process.env.PORT || 3000);
}