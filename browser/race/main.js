// http://www.growingwiththeweb.com/2012/10/creating-trail-effect-with-canvas.html

var socket = require('../shared/socket');

var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var FPS = 60;

var canvas;
var context;
var dot;
var rotation;

socket.on('gyro', function(event) {
  rotation = event.alpha;
});

init();

function init() {
  canvas = document.getElementById('canvas');

  if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    createTrail();

    setInterval(loop, 1000 / FPS);
  }
}

function createTrail() {
  dot = {
    x: 100,
    y: 100,
    speed: 3,
    direction: Math.PI * 2 * Math.random()
  };
}

function degreesToRadians(deg) {
  return deg / 180 * 2 * Math.PI;
}

function updatePosition() {
  var dx = dot.x + dot.speed * Math.cos(dot.direction);
  var dy = dot.y + dot.speed * Math.sin(dot.direction);

  if (dx < 0 || dx > CANVAS_WIDTH || dy < 0 || dy > CANVAS_HEIGHT) {
    dx = CANVAS_WIDTH / 2;
    dy = CANVAS_HEIGHT / 2;
  }

  dot.x = dx;
  dot.y = dy;

  if (rotation) {
    dot.direction = -1 * degreesToRadians(rotation);
  }
}

function loop() {
  updatePosition();

  // Draw over the whole canvas to create the trail effect
  context.fillStyle = 'rgba(255, 255, 255, .05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the dot
  context.beginPath();
  context.fillStyle = '#ff0000';
  context.moveTo(dot.x, dot.y);
  context.arc(dot.x, dot.y, 3, 0, Math.PI*2, true);
  context.fill();
}
