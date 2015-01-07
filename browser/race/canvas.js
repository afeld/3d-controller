var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


module.exports = {
  el: canvas,
  context: context,

  drawDot: function(dot) {
    context.beginPath();
    context.fillStyle = '#ff0000';
    context.moveTo(dot.x, dot.y);
    context.arc(dot.x, dot.y, 3, 0, Math.PI*2, true);
    context.fill();
  },

  fade: function() {
    // Draw over the whole canvas to create the trail effect
    context.fillStyle = 'rgba(255, 255, 255, .05)';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};
