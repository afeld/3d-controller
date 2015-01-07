// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var canvas = require('./canvas');
var dots = require('./dots');

var ROTATION_SCALAR = 2.5;
var SPEED_SCALAR = 0.05;


loop();


socket.on('drag', function(evt) {
  if (evt.type === 'zoom') {
    var dot = dots.findOrCreate(evt.sessionId);
    dot.speed += -1 * SPEED_SCALAR * evt.dy;
  }
});

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
    dot.teleportIfOutsideBoundary(canvas.el.width, canvas.el.height);
    canvas.drawDot(dot);
  });

  window.requestAnimationFrame(loop);
}
