var app = require('./lib/app');
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./lib/routes');


var pipe = function(socket, channel) {
  socket.on(channel, function(msg) {
    socket.broadcast.emit(channel, msg);
  });
};


io.on('connection', function(socket){
  console.log('a user connected');

  pipe(socket, 'gyro');
  pipe(socket, 'drag');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


var PORT = 3000;
server.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
