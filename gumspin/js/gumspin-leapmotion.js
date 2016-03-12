// leap event handlers
var controller = new Leap.Controller({ enableGestures: true }).use('riggedHand');

function setConnected() {
  document.querySelector('.leapmotion-status').setAttribute('class','leapmotion-status connected');
  document.querySelector('.instructions').innerHTML = '<em>Hint: Draw circles with your finger.</em>';
  device = 'Leapmotion';
}

function setDisconnected() {
  document.querySelector('.leapmotion-status').setAttribute('class','leapmotion-status');
  document.querySelector('.instructions').innerHTML = '<em>Hint: Draw circles on Kelly with your mouse.</em>';
  device = 'Mouse';
}

controller.on('streamingStarted', setConnected);
controller.on('ready', setConnected);
controller.on('streamingStopped', setDisconnected);

controller.on('animationFrame', function(frame) {

  if(!frame.valid) return false;

  // handle circle gesture
  for( var i =  0; i < frame.gestures.length; i++){

    var gesture  = frame.gestures[i];

    if(gesture.type == 'circle') {
        clockwise = false;

        if( gesture.normal[2]  <= 0 ){
          clockwise = true;
        }

        if(!animationRunning) animateKelly();
    }
  }
});

controller.connect();
