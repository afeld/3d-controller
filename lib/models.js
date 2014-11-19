var fs = require('fs');

exports.getList = function() {
  var files = fs.readdirSync('models');

  var names = files.map(function(file) {
    return file.replace(/\.stl$/, '');
  });

  return names;
};
