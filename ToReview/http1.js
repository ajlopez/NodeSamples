
var http = require('http');

http.createServer(function (req, res)
{
	res.writeHeader(200, { 'Content-type': 'text/plain' });
	res.write('Hello,');
	res.end(' World');
}).listen(8000);

