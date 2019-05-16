// replace these values with those generated in your TokBox Account
let apiKey;
let sessionId;
let token;

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
var SERVER_BASE_URL = 'https://v-kpheng-sample-app.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = "API_KEY_HERE" || res.apiKey;
  sessionId = "SESSION_ID_HERE" || res.sessionId;
  token = "TOKEN_HERE" || res.token;
  initializeSession();
}).catch(handleError);

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  document.getElementById('subscriber').addEventListener('click', function() {
    console.log('clicked on an element on subscriber');
  });

  document.getElementById('dblclick_area').addEventListener('dblclick', function() {
    console.log('you double-clicked');
  });

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
