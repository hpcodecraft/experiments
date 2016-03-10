var slider = document.getElementById('animation-speed');
var speed = 'medium';
var paused = false;

slider.onchange = function() {
  switch( +this.value ) {
    case 1: speed = 'slow'; break;
    case 3: speed = 'fast'; break;
    default: speed = 'medium'; break;
  }
  document.getElementById('animation').className = speed;
  document.getElementById('animation-pause').innerHTML = 'pause';
  paused = false;
};

document.getElementById('animation-pause').onclick = function() {
  if( paused ) {
    document.getElementById('animation').className = speed;
    this.innerHTML = 'pause';
    paused = false;
  }
  else {
    document.getElementById('animation').className = speed + ' paused';
    this.innerHTML = 'play';
    paused = true;
  }
};
