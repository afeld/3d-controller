var express = require('express');
var sass = require('node-sass');
var browserify = require('browserify-middleware');
var ip = require('ip');


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var PORT = 3000;


app.use('/js', browserify('./js'));

app.use(sass.middleware({
  src: __dirname + '/scss',
  dest: __dirname + '/css',
  debug: true,
  prefix: '/css'
}));
app.use(express.static(__dirname));


var getOrigin = function() {
  return ip.address() + ':' + PORT;
};

app.get('/', function(req, res){
  res.render('redirector.ejs');
});

app.get('/controller', function(req, res){
  res.render('controller.ejs');
});

app.get('/viewer', function(req, res){
  res.render('viewer.ejs', {
    origin: getOrigin()
  });
});


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

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
