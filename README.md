drain
=====

Append-only log drain / file writer endpoint for active experiments.


### Output Streams ###

* EconLab Pusher instance
* EconLab Orchestrate.io drain database
* console.log()


## API ##

* **Base:** ```https://drain.econlab.io```
* **Method:** ```POST```
* **Content-Type:** ```application/json```


#### Authenticating ####

EconLab Drain maintains a hash of the current squid session ids -> its session token. To authorize session log drain post requests, ensure your POST requires HTTP Basic Auth:

* **Username field:** ```my_session_id```
* **Password field:** ```my_session_token```

If a POST is received with a missing auth or invalid token compared to ID, it wil return a 401 response.


### Endpoints  ###

#### /filelog ####

This is generally intended to be sent one line at a time.

**request body:**
```javascript
{
  filename: 'my_stats_file.csv',
  payload:  'a,b,c,1,2,3'
}
```

**response**

* HTTP 200
```json
{
  "status": "OK"
}
```


#### /syslog/:session_id ####

** NOT FOR USE **

Currently this is configured automatically on deploy.

This endpoint is for collecting the raw session server logs for later debug, and is the log drain directly from your heroku instance.