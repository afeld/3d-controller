var Dot = require('./dot');

var dotsById = {};


function values(obj) {
  var keys = Object.keys(obj);
  return keys.map(function(key) {
    return obj[key];
  });
}


module.exports = {
  all: function() {
    return values(dotsById);
  },

  findOrCreate: function(id) {
    var dot = dotsById[id];
    if (!dot) {
      dot = new Dot();
      dotsById[id] = dot;
    }
    return dot;
  }
};
