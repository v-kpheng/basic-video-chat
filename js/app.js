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
var SERVER_BASE_URL = 'https://vkpheng-sample-app-2.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json();
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;

  initializeSession();
}).catch(handleError);

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  const publishers = [];
  const NUM_PUBLISHERS = 6;

  for( let i = 0; i < NUM_PUBLISHERS; i++ ) {
    const publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);

    publishers.push(publisher);
  }

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      publishers.forEach(publisher => {
        session.publish(publisher, handleError);
      });
    }
  });
}
