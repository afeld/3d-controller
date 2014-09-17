var app = require('./lib/app');
var server = require('http').Server(app);
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('gyro', function(msg){
    socket.broadcast.emit('gyro', msg);
  });

  socket.on('drag', function(msg){
    socket.broadcast.emit('drag', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


var PORT = 3000;
server.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
