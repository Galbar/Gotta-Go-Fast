var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');
var Lib = require('./lib');
var Game = require('./game');

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games && assignat === false){
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[idPlayer] = idPlayer;
			if(games[game].players.length == games[game].size){
				for(var player in games[game].players){
					io.sockets.sockets[player].emit('match_ready');
				}
			}
		}
	}
	if(assignat===false){
		++gameId;
		newGame = new Game(standardGameSize);
		newGame.players[idPlayer] = idPlayer;
		assignat=true;
		games[gameId] = newGame;
	}
}

var gameId = 0;
var standardGameSize = 4;
var games = {};

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

	socket.on('userConnected', function () {
		socket.emit('ok_register');
		searchGame(socket.id);
		socket.emit('match_found');
	});

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