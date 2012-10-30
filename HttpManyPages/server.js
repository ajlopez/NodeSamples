
var http = require('http');

// a.name = "Adam";
// a['name'] = "Adam";


var mapping = {
    '/index.html': '<h1>Hello Index<h1>',
    '/cart.html': '<h1>Shoppint cart</h1>',
    '/about.html': '<h1>About</h1>'
};

var server = http.createServer(function(req, res) {
    res.writeHeader(200, {'Content-type': 'text/html'});
    
    res.end(mapping[req.url]);
}
);

server.listen(8000);

