var io = require('socket.io').listen(8080);
var http = require('http');

io.sockets.on('connection', function (socket) {

  socket.on('joinGame', function(gameId) {
	 console.log('Player joining game', gameId);
	 socket.join(gameId);
  });

  socket.on('sendCommand', function (gameId, msg) {
	 socket.broadcast.to(gameId).emit('recieveCommand', msg);
     //io.sockets.in(gameId).emit('recieveCommand', msg);
	 console.log('Sending command', msg, 'to game', gameId);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});