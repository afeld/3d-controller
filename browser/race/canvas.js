var el = document.getElementById('canvas');
var context = el.getContext('2d');
el.width = window.innerWidth;
el.height = window.innerHeight;


module.exports = {
  el: el,
  context: context,

  drawDot: function(dot) {
    context.beginPath();
    context.fillStyle = dot.color;
    context.moveTo(dot.x, dot.y);
    context.arc(dot.x, dot.y, 3, 0, Math.PI*2, true);
    context.fill();
  },

  fade: function() {
    // Draw over the whole canvas to create the trail effect
    context.fillStyle = 'rgba(255, 255, 255, .05)';
    context.fillRect(0, 0, el.width, el.height);
  }
};
