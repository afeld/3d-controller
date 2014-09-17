var express = require('express');
var sass = require('node-sass');
var browserify = require('browserify-middleware');
var ip = require('ip');
var url = require('url');

var app = express();

app.use('/js', browserify('./js'));

app.use(sass.middleware({
  src: process.cwd() + '/scss',
  dest: process.cwd() + '/css',
  debug: true,
  prefix: '/css'
}));
app.use(express.static(process.cwd()));


var getFullUrl = function(req) {
  return req.protocol + '://' + req.get('host') + req.originalUrl;
};

var getOrigin = function(req) {
  var fullUrl = getFullUrl(req);
  var uri = url.parse(fullUrl);
  return ip.address() + ':' + uri.port;
};


app.get('/', function(req, res){
  res.render('redirector.ejs');
});

app.get('/controller', function(req, res){
  res.render('controller.ejs');
});

app.get('/viewer', function(req, res){
  res.render('viewer.ejs', {
    origin: getOrigin(req)
  });
});


module.exports = app;
