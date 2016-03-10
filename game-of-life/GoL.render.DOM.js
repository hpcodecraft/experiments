GoL.render = (function (gol) {
  var render = {},
      timeout;

  render.init = function() {

    document.getElementById('gol').innerHTML = '';

    var top = 0, left = 0;

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        var field = document.createElement("div");
        field.style.top = top + "px";
        field.style.left = left + "px";
        field.id = 'cell_'+x+'_'+y;
        field.className = 'cell';
        left = left + 10;
        document.getElementById('gol').appendChild(field);
      }
      left = 0;
      top = top +10;
    }
  };

  render.draw = function() {
    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        if( gol._cells[x][y].alive == 1)
          document.getElementById('cell_'+x+'_'+y).style.backgroundColor = "green";
        else
          document.getElementById('cell_'+x+'_'+y).style.backgroundColor = "transparent";
      }
    }
    document.getElementById('generation').innerHTML = gol._generation;
  };

  render.reset = function() {
    cancelAnimationFrame( timeout );
    gol.reset();
    var c = document.getElementsByClassName('cell');
    for( var x in c ) {
      if( "object" == typeof c[x] ) {
        c[x].style.backgroundColor = 'transparent';
      }
    }
    document.getElementById('generation').innerHTML = gol._generation;
  };

  render.evolve = function() {
    gol.evolve();
    gol.render.draw();
    timeout = requestAnimationFrame( gol.render.evolve );
  };

  return render;
}(GoL || {}));
