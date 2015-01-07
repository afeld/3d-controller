// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var canvas = require('./canvas');
var Dot = require('./dot');
var dots = require('./dots');

var ROTATION_SCALAR = 2.5;
var SPEED_SCALAR = 0.05;
var JITTER_SCALAR = 3;


loop();


socket.on('drag', function(evt) {
  var dot = dots.findOrCreate(evt.sessionId);
  if (evt.type === 'zoom') {
    dot.speed += -1 * SPEED_SCALAR * evt.dy;
  } else {
    jitter(dot, evt);
  }
});

socket.on('gyro', function(evt) {
  var dot = dots.findOrCreate(evt.sessionId);
  dot.direction = -1 * ROTATION_SCALAR * degreesToRadians(evt.alpha);
});


function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function jitter(dot, dragEvent) {
  var newDot = new Dot();
  newDot.x = dot.x + (dragEvent.dx * JITTER_SCALAR);
  newDot.y = dot.y + (dragEvent.dy * JITTER_SCALAR);
  canvas.drawDot(newDot);
}

function loop() {
  canvas.fade();

  dots.all().forEach(function(dot) {
    dot.updatePosition();
    dot.teleportIfOutsideBoundary(canvas.el.width, canvas.el.height);
    canvas.drawDot(dot);
  });

  window.requestAnimationFrame(loop);
}
