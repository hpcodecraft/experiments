var GoL = (function (gol) {

  gol._cellsX =  50;
  gol._cellsY =  50;
  gol._generation =  1;
  gol._cells = [];
  gol._cell = function( x, y, alive ) {

    this._nextGen = 0;
    this.x = x;
    this.y = y;
    this.alive = alive;

    this.releaseTheKraken = function() {
      var neighbors = [],
          nx = 0,
          ny = 0;

      // collect neighbors

      // top left
      nx = ( this.x === 0 ) ? ( gol._cellsX - 1 ) : ( this.x - 1 );
      ny = ( this.y === 0 ) ? ( gol._cellsY - 1 ) : ( this.y - 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // top center
      nx = this.x;
      ny = ( this.y === 0 ) ? ( gol._cellsY - 1 ) : ( this.y - 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // top right
      nx = ( this.x == ( gol._cellsX - 1 )) ? 0 : this.x + 1;
      ny = ( this.y === 0 ) ? ( gol._cellsY - 1 ) : ( this.y - 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // left
      nx = ( this.x === 0 ) ? ( gol._cellsX - 1 ) : ( this.x - 1 );
      ny = this.y;
      neighbors.push( gol._cells[ nx ][ ny ] );

      // right
      nx = ( this.x == ( gol._cellsX - 1 )) ? 0 : this.x + 1;
      ny = this.y;
      neighbors.push( gol._cells[ nx ][ ny ] );

      // bottom left
      nx = ( this.x === 0 ) ? ( gol._cellsX - 1 ) : ( this.x - 1 );
      ny = ( this.y == ( gol._cellsY - 1 )) ? 0 : ( this.y + 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // bottom center
      nx = this.x;
      ny = ( this.y == ( gol._cellsY - 1 )) ? 0 : ( this.y + 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // bottom right
      nx = ( this.x == ( gol._cellsX - 1 )) ? 0 : this.x + 1;
      ny = ( this.y == ( gol._cellsY - 1 )) ? 0 : ( this.y + 1 );
      neighbors.push( gol._cells[ nx ][ ny ] );

      // count alive neighbors
      var nAlive = 0;
      for( x in neighbors ) {
        if( neighbors[x].alive == 1 ) nAlive++;
      }

      // determine next generation status
      if( this.alive === 0 && nAlive == 3 ) this._nextGen = 1;
      else if( this.alive == 1 ) {
        switch( nAlive ) {
          case 2:
          case 3:
            this._nextGen = 1;
            break;
        }
      }
    };

    this.calcNextGen = function() {
      this.alive = this._nextGen;
      this._nextGen = 0;
    };
  };

  gol.createCell = function( x, y, alive ) {
    if( "undefined" === typeof gol._cells[x] ) gol._cells[x] = [];
    gol._cells[x][y] = new gol._cell( x, y, alive );
  };

  gol._firstGen = function() {

    var random = function( min, max ) {
      return Math.floor(min+(max-min+1)*(Math.random()));
    };

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        gol.createCell( x, y, random(0,1) );
      }
    }
    gol._generation++;
  };

  gol._nextGen = function() {
    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        gol._cells[x][y].releaseTheKraken();
      }
    }

    gol._generation++;

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        gol._cells[x][y].calcNextGen();
      }
    }
  };

  gol.evolve = function() {
    if( gol._generation == 1 ) gol._firstGen();
    else gol._nextGen();
  };

  gol.reset = function() {
    gol._generation = 1;
    gol._cells = [];
  };

	return gol;
}(GoL || {}));
