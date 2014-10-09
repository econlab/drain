/** Dependencies */
var util = require('util');


/**
 * Console IO
 * Development use
 *
 * @constructor
 */
var Console = function() {
  // nothing to construct
};

Console.prototype = {
  
  /**
   * Syslog Event
   *
   * @param {string} msg - Event message
   */
  syslog: function(msg) {
    var msg = JSON.parse(msg);
    util.log('[SYSLOG] session=', msg.session, ' ', msg.payload);
  },
  
  
  /**
   * Record Event
   *
   * @param {string} msg - Event message
   */
  syslog: function(msg) {
    var msg = JSON.parse(msg);
    util.log('[RECORD] session=', msg.session, ' name=', msg.name, ' ', msg.payload);
  }
  
};


/** Export */
module.exports = Console;