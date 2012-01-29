
var http_port = 8124;

var http = require('http');
var htutil = require('./htutil.js');

var mapping = {};

mapping['/'] = require('./home-node');
mapping['/square'] = require('./square-node');
mapping['/mult'] = require('./mult-node');
mapping['/fact'] = require('./fact-node');
mapping['/fibo'] = require('./fibo-node');
mapping['/fiboa'] = require('./fiboa-node');

var server = http.createServer(function (req, res) {
    htutil.loadParams(req, res, undefined);
    
    var page = mapping[req.requrl.pathname];
    
    if (page)
        page.get(req,res);
    else {
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end("bad URL " + req.url);
    }
    
}).listen(http_port);

console.log('listening to http://localhost:' + http_port);