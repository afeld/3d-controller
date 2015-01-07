var canvas = require('./canvas');


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
    dx = canvas.el.width;
    dy = canvas.el.height - dy;
  } else if (dx > canvas.el.width) {
    dx = 0;
    dy = canvas.el.height - dy;
  } else if (dy < 0) {
    dx = canvas.el.width - dx;
    dy = canvas.el.height;
  } else if (dy > canvas.el.height) {
    dx = canvas.el.width - dx;
    dy = 0;
  }

  this.x = dx;
  this.y = dy;
};


module.exports = Dot;
