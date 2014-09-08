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
  var lastPosByTouchId;

  var resetLast = function() {
    lastPosByTouchId = {}
  };

  var $doc = $(document);
  $doc.on('touchend', resetLast);
  resetLast();

  var handleDrag = function(touch, type){
    var lastPos = lastPosByTouchId[touch.identifier];
    if (lastPos) {
      var dx = touch.screenX - lastPos.x;
      var dy = touch.screenY - lastPos.y;

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

  var zoomWidth = $('.zoom').width();

  $doc.on('touchmove', function(event){
    $.each(event.originalEvent.changedTouches, function(i, touch) {
      if (touch.clientX > zoomWidth) {
        handleDrag(touch, 'pan');
      } else {
        handleDrag(touch, 'zoom');
      }
    });

    $.each(event.originalEvent.touches, function(i, touch) {
      lastPosByTouchId[touch.identifier] = {
        x: touch.screenX,
        y: touch.screenY
      };
    });

    // don't scroll
    event.preventDefault();
  });
});
