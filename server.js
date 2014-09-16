var express = require('express');
var sass = require('node-sass');
var browserify = require('browserify-middleware');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/js', browserify('./js'));

app.use(sass.middleware({
  src: __dirname + '/scss',
  dest: __dirname + '/css',
  debug: true,
  prefix: '/css'
}));
app.use(express.static(__dirname));


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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
