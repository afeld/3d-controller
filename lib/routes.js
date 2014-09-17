var ip = require('ip');
var url = require('url');
var app = require('./app');


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
