
var http = require('http');

http.createServer(function (req, res)
{
	res.writeHeader(200, { 'Content-type': 'text/plain' });
	setTimeout(function() {
		res.end(' World');
	}, 2000);
	res.write('Hello,');
}).listen(8000);

