var socket = require('../shared/socket');


var lastPosByTouchId;
var zoomWidth;

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

var dispatchTouchEvents = function(touches) {
  touches.forEach(function(touch) {
    // check which area this event happened in
    if (touch.clientX > zoomWidth) {
      handleDrag(touch, 'pan');
    } else {
      handleDrag(touch, 'zoom');
    }
  });
};

var recordTouchPositions = function(touches) {
  touches.forEach(function(touch) {
    lastPosByTouchId[touch.identifier] = {
      x: touch.screenX,
      y: touch.screenY
    };
  });
};

var onTouchMove = function(event) {
  dispatchTouchEvents(event.originalEvent.changedTouches);
  recordTouchPositions(event.originalEvent.touches);
  // don't scroll
  event.preventDefault();
};


$(function() {
  // assume zoom area is full height on the left hand side of the screen
  zoomWidth = $('.zoom').width();
  $doc.on('touchmove', onTouchMove);
});
