var io = require('socket.io').listen(8080);
var http = require('http');

io.sockets.on('connection', function (socket) {
  socket.on('sendMessage', function (msg) {
    socket.broadcast.emit('chatMessage', socket.nickname, msg);
	console.log('Sending message', msg);
  });
  
  socket.on('nickname', function(nickname) {
	socket.nickname = nickname;
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

