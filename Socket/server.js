
// Adapted from http://coffeescriptcookbook.com/chapters/networking/bi-directional-server

var net = require('net');

var domain = '0.0.0.0';
var port = 9001;

var server = net.createServer(function(socket) {
	console.log('New connection from ' + socket.remoteAddress);
    socket.on('data', function(data) {
        console.log(socket.remoteAddress + ' sent: ' + data);
        var others = server.connections - 1;
        socket.write('You have ' + others + ' ' + (others == 1 ? 'peer' : 'peers') + ' on this server');
    });
});

console.log('Listening to ' + domain + ':' + port);
server.listen(port, domain);

