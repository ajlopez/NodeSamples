
var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.send('Hello, world');
});

var server = app.listen();

console.log('Express server started on port %s', server.address().port);

