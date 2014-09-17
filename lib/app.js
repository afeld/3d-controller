var express = require('express');
var sass = require('node-sass');
var browserify = require('browserify-middleware');

var app = express();

app.use('/js', browserify('./js'));

app.use(sass.middleware({
  src: process.cwd() + '/scss',
  dest: process.cwd() + '/css',
  debug: true,
  prefix: '/css'
}));
app.use(express.static(process.cwd()));


module.exports = app;
