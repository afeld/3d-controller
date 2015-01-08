var app = require('./server/app');
var server = require('http').Server(app);

require('./server/routes');
require('./server/sockets')(server);

var PORT = 3000;
server.listen(PORT, function() {
  console.log('Listening on http://localhost:' + PORT);
});
