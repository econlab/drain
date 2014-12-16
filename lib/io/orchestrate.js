/** Dependencies */
var figaro    = require('figaro').parse();
//var orchestra = require('orchestrate');


/**
 * Orchestrate IO
 * Forwards messages to Orchestrate DB
 *
 * @constructor
 */
var Orchestrate = function() {
  this.db = require('orchestrate')(process.env.ORCHESTRATE_TOKEN);
};


Orchestrate.prototype = {
  
  /**
   * Syslog Event
   *
   * @param {string} msg - Event message
   */
  syslog: function(msg) {
    var msg = JSON.parse(msg);
    this.db.newEventBuilder()
    .from('syslogs', msg.session)
    .type('stdout')
    .data({ 'entry': msg.payload })
    .create();
  },
  
  
  /**
   * Record Event
   *
   * @param {string} msg - Event message
   */
  filelog: function(msg) {
    var msg = JSON.parse(msg);
    this.db.newEventBuilder()
    .from('filelogs', msg.session)
    .type(msg.filename)
    .data(msg.payload)
    .create();
  }
  
};


/** Export */
module.exports = Orchestrate;