// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var canvas = require('./canvas');
var Dot = require('./dot');

var ROTATION_SCALAR = 2.5;
var dot;


socket.on('gyro', function(event) {
  if (!dot) {
    dot = new Dot();
    loop();
  }

  dot.direction = -1 * ROTATION_SCALAR * degreesToRadians(event.alpha);
});

function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function loop() {
  dot.updatePosition();
  canvas.fade()
  canvas.drawDot(dot);

  window.requestAnimationFrame(loop);
}
