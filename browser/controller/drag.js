var socket = require('../shared/socket');


var lastPosByTouchId;

var resetLast = function() {
  lastPosByTouchId = {};
};

var $doc = $(document);
$doc.on('touchend', resetLast);
resetLast();

var handleDrag = function(touch, type) {
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


$(function() {
  // assume zoom area is full height on the left hand side of the screen
  var zoomWidth = $('.zoom').width();

  $doc.on('touchmove', function(event) {
    $.each(event.originalEvent.changedTouches, function(i, touch) {
      // check which area this event happened in
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
