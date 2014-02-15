var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Lib = require('./lib');
var Game = require('./game');
var Player = require('./player');

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games && assignat === false){
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[idPlayer] = idPlayer;
			players[idPlayer].game=game;
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
		players[idPlayer].game=gameId;
	}
}

function consultaGameReady(gameId){
	for(var pl in games[gameId].players){
		if(players[pl].ready === false) return false;
	}
	return true;
}

function startGame(gameId){
	for(var pl in games[gameId].players){
		io.sockets.sockets[pl].emit('match_start');
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
		players[socket.id].ready=true;
		if(consultaGameReady(players[socket.id].game)===true) {
			startGame(players[socket.id].game);
		}
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