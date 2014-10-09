/**
 * Log Parser
 */
module.exports = {
  
  syslog: function(req, res, next) {
    req.loglines = [];
    req.setEncoding('utf8');

    req.on('data', function(chunk) {
      var lines = chunk.split('\n').splice(0,-1).map(function(n) {
                    return n.replace(/^\d+ \<\d+\>\w /,'');
                  });
                  
      req.loglines = req.loglines.concat(lines);
    });

    req.on('end', function() {
      next();
    });
  }
  
};