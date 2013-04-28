var express = require('express')
  , http = require('http')
  , path = require('path')
  , simplemessages = require('simplemessages')
  , socketio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
  
server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
  
function dump(points, values)
{
    var l = values.length;
    var result = new Array(l);
    
    for (var k =0; k < l; k++)
        result[k] = [ points[values[k]].x, points[values[k]].y ];
        
    console.log(result);
}

function Controller()
{
	var nclients = 0;
	var clients = {};
	var controller = this;
    var stopped = false;
    var bestpath;
	
	this.newClient = function(client) {
        console.log("New Client");
		client.nclient = nclients++;
		clients[client.nclient] = client;
		client.on('data', function(msg) { controller.processMessage(msg); });
		client.on('end', function() { controller.removeClient(client); });
		client.on('close', function() { controller.removeClient(client); });
	}
	
	this.removeClient = function(client) {
        console.log("Remove Client");
		delete clients[client.nclient];
	}
	
    this.newSectorInfo = function(sectorinfo) {
        var keys = Object.keys(clients);
        
        if (!keys.length)
            return;
            
        var position = Math.floor(Math.random() * keys.length);
        var key = keys[position];
        var client = clients[key];
        
        client.write(sectorinfo);
    }
    
    this.processMessage = function(msg) {
        console.log('process message');
        if (this.socket)
            this.socket.emit('sector', msg);
    }
	
	this.broadcast = function(msg) {
        console.log('broadcast');
        console.dir(msg);
		for (var n in clients)
		{
			var client = clients[n];
			try {
				client.write(msg);
			}
			catch (ex) {
				console.log(ex.toString());
			}
		}
	}
}

var controller = new Controller();

var server = simplemessages.createServer(function(client) { controller.newClient(client); });
server.listen(3001);

io.set('log level', 2);

io.sockets.on('connection', function (socket) {
    controller.socket = socket;
    socket.on('sectorinfo', function (sectorinfo) {
        console.dir(sectorinfo);
        controller.newSectorInfo(sectorinfo);
    });
});
