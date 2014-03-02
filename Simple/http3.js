 
var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
	res.write('<h1>Hello ');
	res.end('World</h1>');
});

server.listen(8000);

