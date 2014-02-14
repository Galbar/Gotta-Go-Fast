var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');

var players = {};

io.sockets.on('connection', function (socket) {

	// Envía la llista dels players actuals al nou jugador
	/*for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}

	// Crea el nou player i l'envia a tothom
	var player = new Player(new Pos(0,0),socket.id);
	players[socket.id] = player;
	io.sockets.emit('playerUpdate',player);
*/
	socket.on('playerUpdate', function (playerData) {
		/*var player = players[socket.id];
		if (player !== undefined) player.updateWithPlayerData(playerData);
		socket.broadcast.emit('playerUpdate', player);*/
	});

	socket.on('disconnect', function () {
		/*
		console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
		*/
	});

});