var io = require('socket.io').listen(4242);
io.set('log level', 1);

var getRandomUsername = require('./lib');
var Game = require('./game');
var Player = require('./player');

var gameId = 0;
var standardGameSize = 1;
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
		if (standardGameSize === 1) {
			var seed = Date();
			var sid = games[gameId].players[0].id;
			var names=[];
			names[0] = getRandomUsername();
			io.sockets.sockets[sid].emit('matchFound', gameId, 0, games[gameId].players, seed, names);
		};
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
	for (var pl in game.client_status.players) {
		fixed_status[pl] = { x:0, y:0 };
	}
	for (var pl in game.client_status.players) {
		for (var pl2 in game.client_status.players) {
			fixed_status[pl].x += game.client_status.players[pl2][pl].x;
			fixed_status[pl].y += game.client_status.players[pl2][pl].y;
		}
		fixed_status[pl].x /= game.size;
		fixed_status[pl].y /= game.size;
	}

	var obs_ref_id = game.client_status.obs[0].id;
	var fixed_obs = {
		id: 0,
		x: 0
	};
	for (var id in game.client_status.obs) {
		fixed_obs.x += game.client_status.obs[id].x-(game.client_status.obs[id].id*100);
	}
	fixed_obs.x /= game.client_status.obs.length;

    for (var pl in game.players) {
		io.sockets.sockets[game.players[pl].id].emit('updateGameStatus', fixed_status, fixed_obs);
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
			if (games[game].turns%50 == 0) {
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
		if(games[game].commands[pl] !== 'U') games[game].commands[pl] = c;
	});

	socket.on('sendGameStatus', function (game, pl, players, obs) {
		games[game].client_status.players[pl] = players;
		games[game].client_status.obs[pl] = obs;
		games[game].client_status_retrieved[pl] = true;
		var done = true;
		for (var it =0; it < games[game].size; it++) {
			done = (done && games[game].client_status_retrieved[it]);
		}
		if (done === true) {
			fixGameStatus(games[game]);
			for (var it =0; it < games[game].size; it++) {
				games[game].client_status_retrieved[it] = false;
			}
		}
	});

	socket.on('disconnect', function () {
		for(var gam in games){
			for(var pl_dis in games[gam].players){
				if(games[gam].players[pl_dis].id===socket.id) {
					games[gam].players[pl_dis].is_active=false;
					for (var pl in games[gam].players) {
						io.sockets.sockets[games[gam].players[pl].id].emit('pl_disconected', pl_dis);
					}
				}
			}
		}
	});

});

setInterval(sendAllGameCommands, DELTA_TIME);