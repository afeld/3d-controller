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
  res.render('controller.ejs');
});

app.get('/models', function(req, res){
  res.render('models.ejs', {
    models: models.getList(),
    origin: getOrigin(req)
  });
});

app.get('/trails', function(req, res){
  res.render('trails.ejs', {
    origin: getOrigin(req)
  });
});
