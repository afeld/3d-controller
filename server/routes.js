var ip = require('ip');
var url = require('url');
var app = require('./app');
var models = require('./models');


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
  res.render('3d/controller.ejs');
});

app.get('/viewer', function(req, res){
  res.render('3d/viewer.ejs', {
    models: models.getList(),
    origin: getOrigin(req)
  });
});

app.get('/race', function(req, res){
  res.render('race.ejs', {
    origin: getOrigin(req)
  });
});
