var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket) {
	socket.on('join', function(username) {
		socket.username = username;
		socket.broadcast.emit('connected', username+" just connected");
	});

	socket.on('disconnect',function () {
		io.emit('dis connected', 'User just disconnected');
	});

	socket.on('chat message', function(msg){
		var username = socket.username 
	    io.emit('chat message', username+": "+msg);
	});

});

server.listen(8080, function() {
	console.log('listening on *:8080');
});