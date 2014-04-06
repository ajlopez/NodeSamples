 
var http = require('http');

function onRequest(req, res) {
    console.dir(req.method);
    console.dir(req.url);
	res.writeHeader(200, {'Content-type': 'text/html'});
	res.write('<h1>Home</h1>');
	res.end();
}

var server = http.createServer(onRequest);

server.listen(3000);

console.log("Server listening on port 3000");

