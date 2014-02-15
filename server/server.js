var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Lib = require('./lib');
var Game = require('./game');
var Player = require('./player');

var gameId = 0;
var standardGameSize = 2;
var games = [];
var players = [];

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games){
		if (assignat === true) break;
		console.log(games[game].numPlayers());
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[games[game].players.length] = idPlayer;
			if(games[game].players.length == games[game].size){
				for(var pl in games[game].players){
					var sid = games[game].players[pl];
					io.sockets.sockets[sid].emit('matchFound', game, pl);
				}
			}
		}
	}
	if(assignat===false){
		++gameId;
		newGame = new Game(standardGameSize);
		newGame.players[0] = idPlayer;
		assignat=true;
		games[gameId] = newGame;
	}
	console.log(games);
}

io.sockets.on('connection', function (socket) {

	socket.on('userRegister', function () {
		var player = new Player(socket.id);
		players[socket.id] = player;
		socket.emit('okRegister');
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