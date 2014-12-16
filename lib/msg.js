/**
 * Generate publish messages
 */
module.exports = {
  
  syslog: function(session, payload) {
    return JSON.stringify({ session: session, payload: payload });
  },
  
  filelog: function(session, filename, payload) {
    return JSON.stringify({ session: session, filename: filename, payload: payload });
  }
  
};