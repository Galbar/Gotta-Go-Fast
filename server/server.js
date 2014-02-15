var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');
var Lib = require('./lib');
var Game = require('./game');
var Player = require('./player');

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games && assignat === false){
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[idPlayer] = idPlayer;
			if(games[game].players.length == games[game].size){
				for(var pl in games[game].players){
					io.sockets.sockets[pl].emit('match_found');
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
var standardGameSize = 1;
var games = {};
var players = {};

io.sockets.on('connection', function (socket) {

	socket.on('userRegister', function () {
		var player = new Player(socket.id);
		players[socket.id] = player;
		socket.emit('ok_register');
		searchGame(socket.id);
	});

	socket.on('userReady', function () {
		
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