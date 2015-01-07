var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


module.exports = {
  el: canvas,
  context: canvas.getContext('2d')
};
