// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var canvas = require('./canvas');
var Dot = require('./dot');

var ROTATION_SCALAR = 2.5;
var dots = {};


loop();

socket.on('gyro', function(evt) {
  var dot = findOrCreateDot(evt.sessionId);
  dot.direction = -1 * ROTATION_SCALAR * degreesToRadians(evt.alpha);
});

function findOrCreateDot(sessionId) {
  var dot = dots[sessionId];
  if (!dot) {
    dot = new Dot();
    dots[sessionId] = dot;
  }
  return dot;
}

function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function loop() {
  canvas.fade();

  Object.keys(dots).forEach(function(sessionId) {
    var dot = dots[sessionId];
    dot.updatePosition();
    canvas.drawDot(dot);
  });

  window.requestAnimationFrame(loop);
}
