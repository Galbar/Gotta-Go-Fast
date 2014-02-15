var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Lib = require('./lib');
var Game = require('./game');
var Player = require('./player');

var gameId = 0;
var standardGameSize = 2;
var games = [];

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games){
		if (assignat === true) break;
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[games[game].players.length] = new Player(idPlayer);
			if(games[game].players.length == games[game].size){
				var seed = Date();
				for(var pl in games[game].players){
					var sid = games[game].players[pl].id;
					io.sockets.sockets[sid].emit('matchFound', game, pl, games[game].players, seed);
				}
			}
		}
	}
	if(assignat===false){
		++gameId;
		newGame = new Game(standardGameSize);
		newGame.players[0] = new Player(idPlayer);
		assignat=true;
		games[gameId] = newGame;
	}
}

function consultaGameReady(game){
	for(var pl in game.players){
		if(game.players[pl].ready === false) return false;
	}
	return true;
}

function startGame(game){
	for(var pl in game.players){
		io.sockets.sockets[game.players[pl].id].emit('matchStart');
	}
	game.is_active=true;
}

function sendAllGameCommands () {
	for (var game in games) {
		if (games[game].is_active) {
			for (var pl in games[game].players) {
				io.sockets.sockets[games[game].players[pl].id].emit('updateDeltatime', 30);
				io.sockets.sockets[games[game].players[pl].id].emit('turnCommands', games[game].commands);
			}
			for (var it in games[game].commands) {
				games[game].commands[it] = "S";
			};
		}
	}
}

io.sockets.on('connection', function (socket) {

	socket.on('userRegister', function () {
		socket.emit('okRegister');
		searchGame(socket.id);
	});

	socket.on('userReady', function (game, pl) {
		games[game].players[pl].ready=true;
		if(consultaGameReady(games[game])===true) {
			startGame(games[game]);
		}
	});

	socket.on('userAction', function (c, game, pl) {
		games[game].commands[pl] = c;
	});

	socket.on('disconnect', function () {
		/*
		console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
		*/
	});

});

setInterval(sendAllGameCommands, 30);