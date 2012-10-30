
var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHeader(200, {'Content-type': 'text/html'});
    res.write("<h1>");
    res.write(req.url);
    res.end("</h1>");
}
);

server.listen(8000);

