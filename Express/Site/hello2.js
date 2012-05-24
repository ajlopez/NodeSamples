var express = require('express');
var app = express.createServer(
    express.logger()
);
app.get('/', function(req, res) {
res.send('Hello, world!');
});
app.listen(3000);