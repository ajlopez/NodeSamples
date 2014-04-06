 
var http = require('http'),
    url = require('url');
    
var routes = { 
    get: function (route, fn) {
        this['GET:' + route] = fn;
    },
    post: function (route, fn) {
        this['POST:' + route] = fn;
    }
};

routes.get('/', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>Home</h1>');
    res.end();
});

routes.get('/about', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>About</h1>');
    res.end();
});

routes.get('/contact', function (req, res) {
	res.writeHeader(200, {'Content-type': 'text/html'});
    res.write('<h1>Contact</h1>');
    res.end();
});

function onRequest(req, res) {
    var purl = url.parse(req.url);
    var pathname = purl.pathname;
    console.log(pathname);
    
    var key = req.method + ':' + pathname;
    
    console.dir(key);
    
    if (typeof routes[key] === 'function')
        routes[key](req, res);
    else {
        res.writeHeader(404);
        res.end();
    }
}

var server = http.createServer(onRequest);

server.listen(3000);

console.log("Server listening on port 3000");

