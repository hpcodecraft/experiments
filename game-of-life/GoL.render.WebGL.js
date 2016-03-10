GoL.render = (function (gol) {
  var render = {
        spheres: []
      },
      timeout,
      canvas,
      scene,
      cam,
      renderer,
      mouseX = 0,
      mouseY = 0,
      mouseZ = 0;

  var sphereGeom     = new THREE.SphereGeometry( 4, 8, 8 );
  var sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0x9ed7f0
  });

  render.init = function() {

    document.getElementById('gol').innerHTML = '';

    // setup canvas
    canvas = document.createElement('canvas');
    canvas.id = 'board';
    canvas.width = 500;
    canvas.height = 500;
    document.getElementById('gol').appendChild( canvas );

    // setup scene
    scene = new THREE.Scene();

    // setup camera
    cam = new THREE.PerspectiveCamera(
      50, // viewing angle
      canvas.width/canvas.height, // aspect ratio
      1, // minimum clipping threshold
      10000 // maximum clipping threshold
    );

    // cam starts at center, move it back
    cam.position.z = 540;
    cam.lookAt(new THREE.Vector3(0, 0, 0));
    // add cam to scene
    scene.add( cam );

    // ambient light
    var aLight = new THREE.AmbientLight( 0x006400 );
    scene.add( aLight );

    // pointlight
    var pLight = new THREE.PointLight( 0x008000 );
    pLight.position.set(0,0,100);
    scene.add( pLight );

    // setup renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas });
    // set renderer size
    renderer.setSize( canvas.width, canvas.height );

    // draw the grid
    drawGrid();

    // render everything
    renderer.render(scene, cam);

    // bind mousemove to camera movement
    function onDocumentMouseMove(event) {
      mouseX = ( event.clientX - (window.innerWidth/2) );
      mouseY = ( event.clientY - (window.innerHeight/2) );
    }

    function onDocumentMouseWheel( event ) {
      var delta = event.wheelDelta || event.detail;

      if( delta == 120 || delta == -3 ) { // zoom in
        mouseZ = 50;
      }
      else if( delta == -120 || delta == 3 ) { // zoom out
        mouseZ =  -50;
      }
    }

    var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

    document.addEventListener(mousewheelevt, onDocumentMouseWheel, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
  };

  render.draw = function() {

    document.getElementById('generation').innerHTML = gol._generation;

    var height = 10,
        width = 10,
        l = -250,
        top = -250,
        left = l;

    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {

        if( "undefined" === typeof gol.render.spheres[x] ) {
          gol.render.spheres[x] = [];
        }

        if( gol._cells[x][y].alive == 1) {

          if( gol.render.spheres[x][y] ) {
            gol.render.spheres[x][y].visible = true;
          }
          else {
            // draw sphere
            var sphere = new THREE.Mesh(
              sphereGeom.clone(),
              sphereMaterial
            );
            sphere.position.set( left+5, top+5, 0);
            scene.add( sphere );

            gol.render.spheres[x][y] = sphere;
          }
        }
        else {
          if( gol.render.spheres[x][y] ) {
            gol.render.spheres[x][y].visible = false;
          }
        }

        left = left + width;
      }

      left = l;
      top = top + height;
    }

    // update camera position
    cam.position.x += ( mouseX/2 - cam.position.x ) * 1.2;
    cam.position.y += ( - mouseY/2 - cam.position.y ) * 1.2;
    cam.position.z += mouseZ;
    cam.lookAt( scene.position );
    mouseZ = 0;

    renderer.render(scene, cam);
  };

  render.reset = function() {

    cancelAnimationFrame( timeout );
    gol.reset();

    // reset the camera
    cam.position.x = 0;
    cam.position.y = 0;
    cam.position.z = 540;
    cam.lookAt(new THREE.Vector3(0, 0, 0));

    // clear cells
    for( var y = 0; y < gol._cellsY; y++ ) {
      for( var x = 0; x < gol._cellsX; x++ ) {
        if( gol.render.spheres[x][y] ) {
          gol.render.spheres[x][y].visible = false;
        }
      }
    }

    renderer.render(scene, cam);

    document.getElementById('generation').innerHTML = gol._generation;
  };

  render.evolve = function() {
    gol.evolve();
    gol.render.draw();
    timeout = requestAnimationFrame( gol.render.evolve );
  };

  var drawGrid = function() {

    // draw the grid
    var material = new THREE.LineBasicMaterial({
      color: 0xd9d9d9
    });

    var geometry = new THREE.Geometry();

    var height  = 10,
        width   = 10,
        left    = -250,
        top     = -250,
        line;

    for( var x = 0; x <= gol._cellsX; x++ ) {

      geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(left, -250, 0));
      geometry.vertices.push(new THREE.Vector3(left, 250, 0));

      line = new THREE.Line(geometry, material);
      scene.add(line);

      left = left + width;
    }

    for( var y = 0; y <= gol._cellsY; y++ ) {

      geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-250, top, 0));
      geometry.vertices.push(new THREE.Vector3(250, top, 0));

      line = new THREE.Line(geometry, material);
      scene.add(line);

      top = top + height;
    }

  };

  return render;
}(GoL || {}));