var socket = require('../shared/socket');

$(window).on('deviceorientation', function(jqEvent) {
  var event = jqEvent.originalEvent;
  var obj = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  socket.emit('gyro', obj);
});
