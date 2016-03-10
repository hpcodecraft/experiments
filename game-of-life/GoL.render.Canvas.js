GoL.render = (function (gol) {
  var render = {},
      timeout;

  render.init = function() {

    document.getElementById('gol').innerHTML = '';

    var e = document.createElement('canvas');
    e.id = 'board';
    e.width = 500;
    e.height = 500;
    document.getElementById('gol').appendChild(e);

    clearCanvas();
    drawGrid();
  };

  render.draw = function() {

    var canvas = document.getElementById('board'),
        c      = canvas.getContext('2d'),
        width  = 10,
        height = 10,
        l      = 0,
        top    = 0,
        left   = l;

    c.lineWidth = 1;
    c.fillStyle = "green";

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {

        if( gol._cells[x][y].alive == 1) {
          c.beginPath();
          c.arc( left+5, top+5, 4, 0, 2*Math.PI, true );
          c.fill();
        }
        left = left + width;
      }
      left = l;
      top = top + height;
    }

    document.getElementById('generation').innerHTML = gol._generation;
  };

  render.reset = function() {

    cancelAnimationFrame( timeout );
    gol.reset();

    clearCanvas();
    drawGrid();

    document.getElementById('generation').innerHTML = gol._generation;
  };

  render.evolve = function() {
    gol.evolve();
    clearCanvas();
    drawGrid();
    gol.render.draw();
    timeout = requestAnimationFrame( gol.render.evolve );
  };

  clearCanvas = function() {
    var canvas = document.getElementById('board'),
        c      = canvas.getContext('2d');
    c.clearRect(0,0,500,500);
  };

  drawGrid = function() {

    var canvas = document.getElementById('board'),
        c      = canvas.getContext('2d'),
        width  = 10,
        height = 10,
        l      = 0,
        top    = 0,
        left   = l;

    c.lineWidth = 1;
    c.strokeStyle = '#d9d9d9';

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        c.strokeRect(left, top, height, width);
        left = left + width;
      }
      left = l;
      top = top + height;
    }
  };

  return render;
}(GoL || {}));
