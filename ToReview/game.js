var io = require('socket.io').listen(8080);
var http = require('http');

io.sockets.on('connection', function (socket) {
  socket.on('command', function (command) {
    socket.broadcast.to(socket.gameId).emit('command', command);
	console.log('Sending command', command);
  });
  
  socket.on('join', function(gameId) {
	socket.gameId = gameId;
	socket.join(gameId);
	console.log('Joining to game', gameId);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

