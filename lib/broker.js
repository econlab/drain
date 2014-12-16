/** Dependencies */
var events = require('events');
var msg    = require('./msg.js');


/**
 * Broker
 * Publish messages to IO listeners
 *
 * @constructor
 */
var Broker = function() {
  this._events = new events.EventEmitter();
};


Broker.prototype = {
  
  /**
   * Add an IO listener
   *
   * @param {Object} io - An IO object
   */
  use: function(io) {
    this._events.addListener('syslog',  io.syslog.bind(io));
    this._events.addListener('filelog', io.filelog.bind(io));
  },
  
  
  /**
   * Publish a syslog message
   *
   * @param {string} session - Session UUID
   * @param {string} payload - Log payload
   */
  syslog: function(session, payload) {
    this._events.emit('syslog', msg.syslog(session, payload));
  },
  
  
  /**
   * Publish a record message
   *
   * @param {string} session  - Session UUID
   * @param {string} filename - File name
   * @param {string} payload  - Log payload
   */
  filelog: function(session, filename, payload) {
    this._events.emit('filelog', msg.filelog(session, filename, payload));
  }
  
  
};



/** Export */
module.exports = Broker = new Broker();