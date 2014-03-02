 
var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/json'});
	res.write('{ "name": "Adam", ');
	res.end(' "age": 800 }');
});

server.listen(8000);

