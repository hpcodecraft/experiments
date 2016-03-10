<?php
  $r = array('DOM','Canvas','WebGL');
  if( isset( $_GET['r'] ) and in_array($_GET['r'], $r)) {
    $renderer = $_GET['r'];
  }
  else $renderer = 'DOM';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Conway's Game of Life</title>
    <link href="https://fonts.googleapis.com/css?family=Sue+Ellen+Francisco|Open+Sans+Condensed:300" rel="stylesheet" type="text/css">
    <link href="https://hpcodecraft.me/assets/styles/styles.css" rel="stylesheet" type="text/css">
    <style>
      body { width: 100%; margin: 0; }
      .content { margin-top: 0; }

      nav {
        float: none;
        width: 100%;
        text-align: left;
        top: 0;
        margin-bottom: .5rem;
      }

			#gol {
        width: 500px;
        height: 500px;
        position: relative;
        margin-top: 1rem;
      }
		</style>
		<link href="GoL.render.<?=$renderer?>.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="content" onload='parent.resizeIframe(document.body.scrollHeight)'>

    <nav>
      Choose a renderer:
      <a class="DOM <?=($renderer=='DOM'?'active':'')?>" href="./?r=DOM">DOM</a>
      <a class="Canvas <?=($renderer=='Canvas'?'active':'')?>" href="./?r=Canvas">Canvas</a>
      <a class="WebGL <?=($renderer=='WebGL'?'active':'')?>" href="./?r=WebGL">WebGL</a>
    </nav>

    <div id="stats">
      <button type="button" id="gol-start">start</button>
      <button type="button" id="gol-reset" disabled>reset</button>
      <span style="margin-left: 2em;">
        Generation:
        <span id="generation">1</span>
      </span>
    </div>

    <div id="gol">loading, please wait...</div>

		<!-- JS -->

    <script>
      // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
      // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

      // requestAnimationFrame polyfill by Erik Möller
      // fixes from Paul Irish and Tino Zijdel

      (function() {
          var lastTime = 0;
          var vendors = ['ms', 'moz', 'webkit', 'o'];
          for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
              window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
              window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                         || window[vendors[x]+'CancelRequestAnimationFrame'];
          }

          if (!window.requestAnimationFrame)
              window.requestAnimationFrame = function(callback, element) {
                  var currTime = new Date().getTime();
                  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                  var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                  lastTime = currTime + timeToCall;
                  return id;
              };

          if (!window.cancelAnimationFrame)
              window.cancelAnimationFrame = function(id) {
                  clearTimeout(id);
              };
      }());
    </script>

    <?php if( $renderer == 'WebGL' ): ?>
    <script src="three.min.js"></script>
    <?php endif; ?>

    <script src="GoL.js"></script>
    <script src="GoL.render.<?=$renderer?>.js"></script>
    <script>
      // bind the UI buttons
      document.getElementById('gol-start').onclick = function() {
      	this.disabled = true;
      	document.getElementById('gol-reset').disabled = false;
      	GoL.render.evolve();
      }

      document.getElementById('gol-reset').onclick = function() {
      	this.disabled = true;
      	document.getElementById('gol-start').disabled = false;
      	GoL.render.reset();
      }

      GoL.render.init();
    </script>
	</body>
</html>
