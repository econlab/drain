/** Dependencies */
var pusher = require('pusher');


/**
 * Pusher IO
 *
 * @constructor
 */
var Pusher = function() {
  this.ps = new pusher({
    appId:     process.env.PUSHER_APP_ID,
    key:       process.env.PUSHER_KEY,
    secret:    process.env.PUSHER_SECRET,
    encrypted: true
  });
};


Pusher.prototype = {
  
  /**
   * Syslog Event
   *
   * @param {string} msg - Event message
   */
  syslog: function(msg) {
    var msg = JSON.parse(msg);
    this.ps.trigger('session-' + msg.session, 'syslog', { stdout: msg.payload });
  },
  
  
  /**
   * Record Event
   *
   * @param {string} msg - Event message
   */
  filelog: function(msg) {
    var msg = JSON.parse(msg);
    this.ps.trigger('session-' + msg.session, 'filelog', msg.payload);
  }
  
};


/** Export */
module.exports = Pusher;