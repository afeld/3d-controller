var socket = io();

$(window).on('deviceorientation', function(jqEvent) {
  var event = jqEvent.originalEvent;
  var obj = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  $(document.body).html('<pre><code>' + JSON.stringify(obj, null, 2) + '</code></pre>');
  socket.emit('gyro', obj);
});


var lastX = null;
var lastY = null;

var resetLast = function() {
  lastX = null;
  lastY = null;
};

var $doc = $(document);
$doc.on('touchend', resetLast);
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

$doc.on('touchmove', function(event){
  var touches = event.originalEvent.touches;
  var touch = touches[0];
  if (touches.length === 1) {
    handleSingleDrag(touch);
  } else {
    console.log('multi');
  }

  lastX = touch.screenX;
  lastY = touch.screenY;

  // don't scroll
  event.preventDefault();
});
