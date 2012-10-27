var io = require('socket.io').listen(8080);
var http = require('http');

io.sockets.on('connection', function (socket) {
  socket.on('command', function (command) {
    socket.broadcast.to(socket.room).emit('command', command);
    console.log('Sending command', command);
  });
  
  socket.on('join', function(room) {
	socket.room = room;
	socket.join(room);
	console.log('Joining', room);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
