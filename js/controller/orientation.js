var io = require('socket.io/node_modules/socket.io-client');
var socket = io();


$(window).on('deviceorientation', function(jqEvent) {
  var event = jqEvent.originalEvent;
  var obj = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };

  socket.emit('gyro', obj);
});
