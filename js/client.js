var socket = io();

window.addEventListener('deviceorientation', function(event) {
  var obj = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  document.body.innerHTML = '<pre><code>' + JSON.stringify(obj, null, 2) + '</code></pre>';
  socket.emit('gyro', obj);
}, false);


var lastX = null;
var lastY = null;

var resetLast = function() {
  lastX = null;
  lastY = null;
};

document.addEventListener('touchend', resetLast, false);
resetLast();

var handleSingleDrag = function(touch){
  if (lastX) {
    var dx = touch.screenX - lastX;
    var dy = touch.screenY - lastY;

    // check if it actually moved
    if (dx || dy) {
      var drag = {
        dx: dx,
        dy: dy
      };
      socket.emit('drag', drag);
    }
  }
};

document.addEventListener('touchmove', function(event){
  var touch = event.touches[0];
  if (event.touches.length === 1) {
    handleSingleDrag(touch);
  } else {
    console.log('multi');
  }

  lastX = touch.screenX;
  lastY = touch.screenY;

  // don't scroll
  event.preventDefault();
}, false);
