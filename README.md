drain
=====

Log drain for experiments.


session (PK uuid):
 - token

POST:
/syslog/:uuid
/session/:uuid/:name

INPUT:
 - name: 'asdf.csv'
 - data: {...}

OUTPUT:
 - orchestrate: event(type: name, data: data)
 - file -> s3:  csv? raw logs
 - pusher