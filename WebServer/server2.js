 
var http = require('http'),
    url = require('url');

function onRequest(req, res) {
    console.dir(req.method);
    console.dir(req.url);
    var purl = url.parse(req.url);
    console.dir(purl);
    var pathname = purl.pathname;
	res.writeHeader(200, {'Content-type': 'text/html'});
    
    if (pathname === '/')
        res.write('<h1>Home</h1>');
    else if (pathname === '/about')
        res.write('<h1>About</h1>');
    else if (pathname === '/contact')
        res.write('<h1>Contact</h1>');
    else
        res.write('<h1>Unknown</h1>');
	res.end();
}

var server = http.createServer(onRequest);

server.listen(3000);

console.log("Server listening on port 3000");

