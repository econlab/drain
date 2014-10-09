/**
 * Log Parser
 */
module.exports = {
  
  syslog: function(req, res, next) {
    req.log_lines = [];
    req.setEncoding('utf8');

    req.on('data', function(chunk) {
      var lines = chunk.split('\n').splice(0,-1).map(function(n) {
                    return n.replace(/^\d+ \<\d+\>\w /,'');
                  });
                  
      req.log_lines = req.log_lines.concat(lines);
    });

    req.on('end', function() {
      next();
    });
  }
  
};