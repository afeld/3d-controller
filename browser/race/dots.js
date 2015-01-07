var Dot = require('./dot');

var dotsById = {};


module.exports = {
  all: function() {
    return this.ids().map(function(id) {
      return dotsById[id];
    });
  },

  findOrCreate: function(id) {
    var dot = dotsById[id];
    if (!dot) {
      dot = new Dot();
      dotsById[id] = dot;
    }
    return dot;
  },

  ids: function() {
    return Object.keys(dotsById);
  }
};
