var socket = require('../shared/socket');
var canvas = require('./canvas');
var Dot = require('./dot');
var dots = require('./dots');


var ROTATION_SCALAR = 2.5;
var SPEED_SCALAR = 0.05;
var JITTER_SCALAR = 3;


function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function jitter(dot, dragEvent) {
  var newDot = new Dot();
  newDot.x = dot.x + (dragEvent.dx * JITTER_SCALAR);
  newDot.y = dot.y + (dragEvent.dy * JITTER_SCALAR);
  canvas.drawDot(newDot);
}

var onDragEvent = function(evt) {
  var dot = dots.findOrCreate(evt.sessionId);
  if (evt.type === 'zoom') {
    dot.speed += -1 * SPEED_SCALAR * evt.dy;
  } else {
    jitter(dot, evt);
  }
};

var onGyroEvent = function(evt) {
  var dot = dots.findOrCreate(evt.sessionId);
  dot.direction = -1 * ROTATION_SCALAR * degreesToRadians(evt.alpha);
};


exports.start = function() {
  socket.on('drag', onDragEvent);
  socket.on('gyro', onGyroEvent);
};
