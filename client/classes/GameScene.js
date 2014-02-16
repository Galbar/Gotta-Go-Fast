function GameScene (socket) {
    this.kb = new KeyboardJS(false);
    this.socket = socket;
    this.match_id;
    this.player_id;
    this.players = [];
    this.obstacles = [];
    this.future_obstacles = {
        list:[],
        iterator:0
    }
    this.match_start = false;
    this.wspeed = 50;
    var self = this;

    this.socket.on('matchStart', function () {
        self.match_start = true; 
    });

    this.socket.on('updateGameStatus', function (new_status, new_obs, obs_it) {
        for (var pl in self.players) {
            self.players[pl].x = new_status[pl].x;
            self.players[pl].y = new_status[pl].y;
        };

        /*for (var id in self.obstacles) {
            self.obstacles[id].x = (id*100+new_obs.x);
            if (self.obstacles[id].x > CANVAS_WIDTH)
                self.obstacles[id].x -= self.obstacles.length*100;
        }*/
        self.future_obstacles.iterator = obs_it;
    });

    this.socket.on('retrieveGameStatus', function() {
        var players = [];
        for (var pl in self.players) {
            players[pl] = { x: self.players[pl].x,
                            y: self.players[pl].y
                          }
        };
        var i = 0;
        while (self.obstacles[i].x < -50) i++;
        var obs = { id: i, x: self.obstacles[i].x , it: self.future_obstacles.iterator};
        self.socket.emit('sendGameStatus', self.match_id, self.player_id, players, obs);
    });

    this.socket.on('matchFound', function (match_id, player_id, players, seed, names, obstacles) {
        self.match_id = match_id;
        self.player_id = player_id;
        var obs_width = 100;
        // Init players
        var x_pos = 500;
        randomGenerator = new Math.seedrandom(seed);
        self.future_obstacles.list = obstacles;
        self.future_obstacles.iterator = 9;

        var n_obs = Math.ceil(CANVAS_WIDTH/obs_width)+1;

        for (var i = 0; i < n_obs; i++) {
            var o = new Obstacle(i, obs_width, self);
            o.x = i*obs_width;
            o.sizeup = 10;
            o.sizedown = CANVAS_HEIGHT-10;
            self.obstacles.push(o);
        }

        for (var it in players) {
            var p = new Player(players[it].id, randomGenerator())
            p.x = x_pos;
            p.y = 300;
            p.is_active = true;
            p.name = names[it];
            self.players.push(p);
            x_pos += 60;
        };

        self.socket.emit('userReady', self.match_id, self.player_id);
    });

    this.socket.on('turnCommands', function (commands) {
        for (var it in commands) {
            self.players[it].command(commands[it]);
        };
    });

    this.socket.on('pl_disconected', function (pl_id) {
        self.players[pl_id].is_active = false;
    });
}

GameScene.prototype.sendCommand = function(c) {
    this.socket.emit('userAction', c, this.match_id, this.player_id);
};

GameScene.prototype.update = function(deltatime) {
    if (!this.match_start) {return;};
    if ((this.players[this.player_id].vy === 0 ) && ( this.kb.char("W") || this.kb.char(" ") || this.kb.char("&")))
        this.sendCommand("U");
    else if (this.kb.char("A") || this.kb.char("%"))
        this.sendCommand("L");
    else if (this.kb.char("D") || this.kb.char("'"))
        this.sendCommand("R");

    for (var it in this.players) this.players[it].update(deltatime, -this.wspeed,this.obstacles);
    for (var it in this.obstacles) this.obstacles[it].update(deltatime, -this.wspeed, this.obstacles, this.future_obstacles);

    if (this.wspeed < this.players[0].speedx*0.80)
        this.wspeed++;
};

GameScene.prototype.draw = function(context) {
    context.fillStyle = "white";
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
    if (!this.match_start) {return;};
    for (var it in this.obstacles) this.obstacles[it].draw(context);
    for (var it in this.players) {
        this.players[it].draw(context);
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, 250, (15*this.players.length)+11);
    context.fillStyle = "white";
    context.fillRect(1, 1, 248, (15*this.players.length)+9);
    context.fillStyle = "black";
    for (var it = 0; it < this.players.length; it++) {
        context.font = "bold 12px Arial";
        context.fillStyle = this.players[it].color;
        context.fillText(this.players[it].name,20,(15*it)+18);
        if (!this.players[it].is_active) {
            context.moveTo(12,(15*it)+15);
            context.lineTo(225,(15*it)+15);
            context.stroke();
        }
        if (it == this.player_id)
        {
            context.fillStyle = "red";
            context.fillText("▶",7,(15*it)+17);
        }
    }
};
