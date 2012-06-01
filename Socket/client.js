
// Adapted from http://coffeescriptcookbook.com/chapters/networking/bi-directional-client

var net = require('net');

var domain = 'localhost';
var port = 9001;

function ping(socket, delay)
{
    console.log('Pinging server');
    socket.write('Ping');
    var nextPing = function() { ping(socket, delay); }
    setTimeout(nextPing, delay);    
}

var connection = net.createConnection(port, domain);

connection.on('connect', function() {
    console.log('Opened connection to ' + domain + ':' + port);
    ping(connection, 2000);
});

connection.on('data', function(data) {
    console.log('Received: ' + data);
});

connection.on('end', function() {
    console.log('Connection closed');
    process.exit();
});

