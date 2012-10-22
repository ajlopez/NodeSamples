var net = require('net');

var clients = [];

var server = net.createServer(function (c) {
	console.log('client connected');
	c.setEncoding('ascii');
	addClient(c);
	c.on('data', function(data) {
		console.log(data);
		broadcast(data, c);
	}
  );
   c.on('close', function() {
	console.log('client disconnected');
	removeClient(c);
   });
});

function addClient(client)
{
	clients.push(client);
}

function removeClient(client)
{
    for (var n in clients) {
	if (clients[n] == client) {
	    clients.splice(n,1);
	    return;
	}
    }
}

function broadcast(data, sender)
{
    for (var n in clients) {
	var client = clients[n];
	if (client == sender)
		continue;
	try {
		client.write(data);
	}
	catch (err) {
		console.log("Error Sending Message");
	}	
    }
}

server.listen(8124, 'localhost');