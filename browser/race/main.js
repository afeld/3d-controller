var canvas = require('./canvas');
var dots = require('./dots');
var listener = require('./listener');


loop();
listener.start();


function loop() {
  canvas.fade();

  dots.all().forEach(function(dot) {
    dot.updatePosition();
    dot.teleportIfOutsideBoundary(canvas.el.width, canvas.el.height);
    canvas.drawDot(dot);
  });

  window.requestAnimationFrame(loop);
}
