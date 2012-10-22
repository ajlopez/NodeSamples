var net = require('net');
var server = net.createServer(function (c) {
  c.write('hello\r\n');
  c.pipe(c);
});
server.listen(8124, 'localhost');