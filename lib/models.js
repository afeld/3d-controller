var fs = require('fs');

var files = fs.readdirSync('models');

var names = files.map(function(file) {
  return file.replace(/\.stl$/, '');
});

module.exports = names;
