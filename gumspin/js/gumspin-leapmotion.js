// canvas setup
var canvas = document.getElementById('canvas'),
    c =  canvas.getContext( '2d' ),
    width = canvas.width,
    height = canvas.height;

// helper function
function leapToScene( frame , leapPos ){

  if("undefined" === typeof leapPos) return;

  var iBox = frame.interactionBox;

  var top = iBox.center[1] + iBox.size[1]/2;
  var left = iBox.center[0] - iBox.size[0]/2;

  var x = leapPos[0] - left;
  var y = leapPos[1] - top;

  x /= iBox.size[0];
  y /= iBox.size[1];

  x *= width;
  y *= height;

  return [ x , -y ];
}

// leap event handlers
var controller = new Leap.Controller({ enableGestures: true });

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

controller.on('deviceConnected', setConnected);
controller.on('ready', setConnected);
controller.on('deviceDisconnected', setDisconnected);

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

  // draw fingers
  c.clearRect(0, 0, width, height);

  for( var i=0; i < frame.hands.length; i++ ){

    var hand = frame.hands[i];

    for( var j = 0; j < hand.fingers.length; j++ ){

      var finger = hand.fingers[j];

      // Getting our finger position
      var fingerPos = leapToScene( frame , finger.tipPosition );
      //if(!fingerPos) continue;

      // Setting up the style for the stroke
      c.fillStyle = "#01ac5e";
      //c.lineWidth = 5;

      // Draw a circle
      c.beginPath();
      c.arc(fingerPos[0], fingerPos[1], 8, 0, Math.PI*2);
      c.closePath();
      c.fill();
    }
  }
});

controller.connect();