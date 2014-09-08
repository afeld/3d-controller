var socket = io();

$(window).on('deviceorientation', function(jqEvent) {
  var event = jqEvent.originalEvent;
  var obj = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  // $('.output').text(JSON.stringify(obj, null, 2));
  socket.emit('gyro', obj);
});


$(function(){
  var lastX = null;
  var lastY = null;

  var resetLast = function() {
    lastX = null;
    lastY = null;
  };

  var $doc = $(document);
  $doc.on('touchend', resetLast);
  resetLast();

  var handleDrag = function(touch, type){
    if (lastX) {
      var dx = touch.screenX - lastX;
      var dy = touch.screenY - lastY;

      // check if it actually moved
      if (dx || dy) {
        var drag = {
          dx: dx,
          dy: dy,
          type: type
        };
        socket.emit('drag', drag);
      }
    }
  };

  $doc.on('touchmove', function(event){
    var touches = event.originalEvent.touches;
    var touch = touches[0];
    var $target = $(event.target);
    var type = $target.attr('class');

    handleDrag(touch, type);

    lastX = touch.screenX;
    lastY = touch.screenY;

    // don't scroll
    event.preventDefault();
  });
});
