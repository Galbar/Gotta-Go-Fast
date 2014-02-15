function GameScene (socket) {
    this.kb = new KeyboardJS(false);
    this.socket = socket;
    this.match_id;
    this.player_id;
    this.players = [];
    this.obstacles = [];
    this.match_start = false;
    this.randomGenerator;
    var self = this;

    this.socket.on('matchStart', function () {
        self.match_start = true; 
    });


    this.socket.on('matchFound', function (match_id, player_id, players, seed) {
        self.match_id = match_id;
        self.player_id = player_id;

        // Init players
        var x_pos = 50;
        self.randomGenerator = new Math.seedrandom(seed);
        for (var it in players) {
            self.players[it] = new Player(players[it].id, self.randomGenerator());
            self.players[it].x = x_pos;
            self.players[it].y = 300;
            x_pos += 60;
        };

        self.socket.emit('userReady', self.match_id, self.player_id);
    });

    this.socket.on('turnCommands', function (commands) {
        for (var it in commands) {
            self.players[it].command(commands[it]);
        };
    });
}

GameScene.prototype.sendCommand = function(c) {
    this.socket.emit('userAction', c, this.match_id, this.player_id);
};

GameScene.prototype.update = function(deltatime) {
    if (!this.match_start) {return;};

    if (this.kb.char("W") || this.kb.char(" ") || this.kb.char("&"))
        this.sendCommand("U");
    else if (this.kb.char("A") || this.kb.char("%"))
        this.sendCommand("L");
    else if (this.kb.char("D") || this.kb.char("'"))
        this.sendCommand("R");

    for (var it in this.players) this.players[it].update(deltatime);
    for (var it in this.obstacles) this.obstacles[it].update(deltatime);
};

GameScene.prototype.draw = function(context) {
    context.fillStyle = "#855C33";
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
    if (!this.match_start) {return;};
    for (var it in this.players) this.players[it].draw(context);
    for (var it in this.obstacles) this.obstacles[it].draw(context);
};
