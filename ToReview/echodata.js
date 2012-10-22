var net = require('net');

var server = net.createServer(function (c) {
	console.log('client connected');
  c.setEncoding('ascii');
  c.write('hello\r\n');
  c.on('data', function(data) {
	console.log(data);
	c.write(data);
	}
  );
   c.on('close', function() {
	console.log('client disconnected');
   });
});

server.listen(8124, 'localhost');