/**
 * Generate publish messages
 */
module.exports = {
  
  syslog: function(session, payload) {
    return JSON.stringify({ session: session, payload: payload });
  },
  
  record: function(session, name, payload) {
    return JSON.stringify({ session: session, name: name, payload: payload });
  }
  
};