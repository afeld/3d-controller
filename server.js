var app = require('./lib/app');
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./lib/routes');


var broadcastAll = function(socket, channel) {
  socket.on(channel, function(msg) {
    socket.broadcast.emit(channel, msg);
  });
};


io.on('connection', function(socket) {
  console.log('client connected');

  broadcastAll(socket, 'gyro');
  broadcastAll(socket, 'drag');

  socket.on('disconnect', function() {
    console.log('client disconnected');
  });
});


var PORT = 3000;
server.listen(PORT, function() {
  console.log('Listening on http://localhost:' + PORT);
});
