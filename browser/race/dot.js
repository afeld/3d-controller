var generateRandomColor = function() {
  // http://www.paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+Math.floor(Math.random()*16777215).toString(16);
};


var Dot = function() {
  this.x = 100;
  this.y = 100;
  this.speed = 3;
  this.direction = Math.PI * 2 * Math.random();
  this.color = generateRandomColor();
};

Dot.prototype.teleportIfOutsideBoundary = function(width, height) {
  var dx = this.x;
  var dy = this.y;

  // if a wall is hit, re-enter from opposite position
  if (dx < 0) {
    dx = width;
    dy = height - dy;
  } else if (dx > width) {
    dx = 0;
    dy = height - dy;
  } else if (dy < 0) {
    dx = width - dx;
    dy = height;
  } else if (dy > height) {
    dx = width - dx;
    dy = 0;
  }

  this.x = dx;
  this.y = dy;
};

Dot.prototype.updatePosition = function() {
  this.x = this.x + this.speed * Math.cos(this.direction);
  this.y = this.y + this.speed * Math.sin(this.direction);
};


module.exports = Dot;
