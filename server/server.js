var io = require('socket.io').listen(4242);
io.set('log level', 1);

var getRandomUsername = require('./lib');
var Game = require('./game');
var Player = require('./player');

var gameId = 0;
var standardGameSize = 3;
var games = [];

var DELTA_TIME = 30;

function searchGame(idPlayer){
	var assignat=false;
	for(var game in games){
		if (assignat === true) break;
		if(games[game].players.length < games[game].size){
			assignat = true;
			games[game].players[games[game].players.length] = new Player(idPlayer);
			if(games[game].players.length == games[game].size){
				var seed = Date();
				var names=[];
				for(var pl in games[game].players){
					names[pl] = getRandomUsername();
				}
				for(var pl in games[game].players){
					var sid = games[game].players[pl].id;
					io.sockets.sockets[sid].emit('matchFound', game, pl, games[game].players, seed, names);
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
		game.players[pl].is_active=true;
		io.sockets.sockets[game.players[pl].id].emit('matchStart');
	}
	game.is_active=true;
}

function retrieveGameStatus (game) {
	for (var pl in game.players) {
		io.sockets.sockets[game.players[pl].id].emit('retrieveGameStatus');
	}
}

function fixGameStatus (game) {
	var fixed_status = [];
	for (var pl in game.client_status) {
		fixed_status[pl] = { x:0, y:0 };
	}
	for (var pl in game.client_status) {
		for (var pl2 in game.client_status) {
			fixed_status[pl].x += game.client_status[pl2][pl].x;
			fixed_status[pl].y += game.client_status[pl2][pl].y;
		}
		fixed_status[pl].x /= game.size;
		fixed_status[pl].y /= game.size;
	}
    for (var pl in game.players) {
		io.sockets.sockets[game.players[pl].id].emit('updateGameStatus', fixed_status);
	}
}

function sendAllGameCommands () {
	for (var game in games) {
		if (games[game].is_active) {
			for (var pl in games[game].players) {
				if (games[game].players[pl].is_active) {
					io.sockets.sockets[games[game].players[pl].id].emit('updateDeltatime', DELTA_TIME);
					io.sockets.sockets[games[game].players[pl].id].emit('turnCommands', games[game].commands);
				}
			}
			for (var it in games[game].commands) {
				games[game].commands[it] = "S";
			};
			games[game].turns++;
			if (games[game].turns%2000) {
				retrieveGameStatus(games[game]);
			}
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

	socket.on('sendGameStatus', function (game, pl, players) {
		games[game].client_status[pl] = players;
		games[game].client_status_retrieved[pl] = true;
		var done = true;
		for (var it =0; it < games[game].size; it++) {
			done = (done && games[game].client_status_retrieved[it]);
		}
		if (done) fixGameStatus(games[game]);
	});

	socket.on('disconnect', function () {
		/*console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);*/
	});

});

setInterval(sendAllGameCommands, DELTA_TIME);