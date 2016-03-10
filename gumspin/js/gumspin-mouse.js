// JS for recognizing circle mouse gestures
// original found at http://bradfitz.com/hacks/gestures
//
// Usage:
//
//    var el = document.getElementById("foo");
//    Gestures.listen(el, function (type) { alert("saw gesture "+type+" on "+this); });
//

var Gestures = new Object ();

Gestures.debug = function(txt) { console.log(txt); }

Gestures.listen = function(element, onGesture) {
  var el = element;
  var history = [];

  el.onmousemove = function(e) {
    var pos = { x: e.offsetX, y: e.offsetY };
    history.push(pos);
    var gest = Gestures._determineGesture(history);
    if (onGesture && gest) {
      //console.log("gest = " + gest);
      onGesture.apply(el, [ gest ]);
      history = [];
    }
  }

  el.onmouseleave = function(e) {
    history = [];
  }
};

Gestures._determineGesture = function (pts) {
  if (!pts || pts.length < 50) return;
  var origin = pts[0];

  var prev_angle;
  var inc_count = 0;
  var dec_count = 0;

  for (var i=1; i<pts.length; i++) {
    var dx = pts[i].x - origin.x;
    var dy = pts[i].y - origin.y;
    var angle = Math.atan2(dx, dy);

    if ("undefined" !== typeof prev_angle) {
      if (angle > prev_angle)
        inc_count++;
      else
        dec_count++;
    }
    prev_angle = angle;
  }

  //Gestures.debug("inc: "+inc_count+", dec: "+dec_count);

  var ambiguous_point = pts.length / 3;
  if (inc_count > ambiguous_point &&
      dec_count > ambiguous_point) { return; }

  return (inc_count > dec_count) ? "counter-clockwise" : "clockwise";
};



function kellyOnGesture(gest) {
  clockwise = (gest == "clockwise")?true:false;
  if(!animationRunning) animateKelly();
}

Gestures.listen(kelly, kellyOnGesture);