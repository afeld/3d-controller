// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var canvas = require('./canvas');
var dots = require('./dots');

var ROTATION_SCALAR = 2.5;


loop();

socket.on('gyro', function(evt) {
  var dot = dots.findOrCreate(evt.sessionId);
  dot.direction = -1 * ROTATION_SCALAR * degreesToRadians(evt.alpha);
});


function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function loop() {
  canvas.fade();

  dots.all().forEach(function(dot) {
    dot.updatePosition();
    canvas.drawDot(dot);
  });

  window.requestAnimationFrame(loop);
}
