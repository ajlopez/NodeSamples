 
var http = require('http'),
    url = require('url');
    
var routes = { 
    for: function (route, fn) {
        this[route] = fn;
    }
};

routes.for('/', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>Home</h1>');
    res.end();
});

routes.for('/about', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>About</h1>');
    res.end();
});

routes.for('/contact', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>Contact</h1>');
    res.end();
});

function onRequest(req, res) {
    var purl = url.parse(req.url);
    var pathname = purl.pathname;
    console.log(pathname);
    
    if (typeof routes[pathname] === 'function')
        routes[pathname](req, res);
    else {
        res.writeHeader(404);
        res.end();
    }
}

var server = http.createServer(onRequest);

server.listen(3000);

console.log("Server listening on port 3000");

