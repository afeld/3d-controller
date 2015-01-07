// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');
var Dot = require('./dot');

var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var canvas;
var context;
var dot;
var rotation;


init();

socket.on('gyro', function(event) {
  rotation = event.alpha;

  if (!dot) {
    dot = new Dot();
    loop();
  }

  dot.direction = -2.5 * degreesToRadians(rotation);
});

function init() {
  canvas = document.getElementById('canvas');

  if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }
}

function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function loop() {
  dot.updatePosition();

  // Draw over the whole canvas to create the trail effect
  context.fillStyle = 'rgba(255, 255, 255, .05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the dot
  context.beginPath();
  context.fillStyle = '#ff0000';
  context.moveTo(dot.x, dot.y);
  context.arc(dot.x, dot.y, 3, 0, Math.PI*2, true);
  context.fill();

  window.requestAnimationFrame(loop);
}
