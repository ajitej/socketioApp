/*
	*This a first try f a basic chat app
	*Basic example of socket.io using node.js
	*Created by Ajitej Kaushik
*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var _dirname = '/chatApp/app/html';
/*var _dirname = require('./app/html');
*/
app.get('/', function(req, res){
	//res.send('<h1>Hello World</h1>');
	res.sendFile(_dirname + '/index.html');
});

io.on('connection', function(socket){
  	console.log('user connected');
  	socket.on('chat message', function(msg){
  		//console.log('message: ', msg);
  		io.emit('chat message', msg);
  	});

  	socket.on('typing', function () {
    		socket.broadcast.emit('typing', {
    		});
  	});
  	/*socket.on('disconnect', function(){
    		console.log('user disconnected');
  	});*/
});

io.on('disconnect', function(){
	socket.on('chat message', function(msg){
		io.emit('chat message', 'User disconnected');
	})
})

http.listen(3000, function(){
	console.log(('Server listening : 3000'));
});