var socket = require('../shared/socket');

var $info = $('#info');
var timeout;

// use gyro events as a proxy for the controller being connected
socket.on('gyro', function() {
  if (timeout) {
    clearTimeout(timeout);
  } else {
    $info.fadeOut();
  }

  // show instructions if we don't see the gyro event for a while
  timeout = setTimeout(function() {
    $info.fadeIn();
    timeout = null;
  }, 200);
});
