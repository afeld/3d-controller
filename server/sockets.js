var broadcastAll = function(socket, channel) {
  socket.on(channel, function(msg) {
    msg.sessionId = socket.id;
    socket.broadcast.emit(channel, msg);
  });
};

var onConnection = function(socket) {
  console.log('client connected');

  broadcastAll(socket, 'gyro');
  broadcastAll(socket, 'drag');

  socket.on('disconnect', function() {
    console.log('client disconnected');
  });
};


module.exports = function(server) {
  var io = require('socket.io')(server);
  io.on('connection', onConnection);
};
