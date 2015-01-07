var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;


var Dot = function() {
  this.x = 100;
  this.y = 100;
  this.speed = 3;
  this.direction = Math.PI * 2 * Math.random();
};

Dot.prototype.updatePosition = function() {
  var dx = this.x + this.speed * Math.cos(this.direction);
  var dy = this.y + this.speed * Math.sin(this.direction);

  // if a wall is hit, re-enter from opposite position
  if (dx < 0) {
    dx = CANVAS_WIDTH;
    dy = CANVAS_HEIGHT - dy;
  } else if (dx > CANVAS_WIDTH) {
    dx = 0;
    dy = CANVAS_HEIGHT - dy;
  } else if (dy < 0) {
    dx = CANVAS_WIDTH - dx;
    dy = CANVAS_HEIGHT;
  } else if (dy > CANVAS_HEIGHT) {
    dx = CANVAS_WIDTH - dx;
    dy = 0;
  }

  this.x = dx;
  this.y = dy;
};


module.exports = Dot;
