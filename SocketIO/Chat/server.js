
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  
app.use('/scripts', express.static(__dirname + '/scripts'))
  
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(8000);

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

