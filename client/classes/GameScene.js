function GameScene (socket) {
    this.kb = new KeyboardJS(true);
    this.socket = socket;
    this.match_id;
    this.player_id;
    this.players = [];
    this.obstacles = [];
    this.ready_emit = false;
    this.match_start = false;
    var self = this;

    this.socket.on('matchStart', function () {
       // Init players

       self.match_start = true; 
    });


    this.socket.on('matchFound', function (match_id, player_id) {
        self.match_id = match_id;
        self.player_id = player_id;
    });
}

GameScene.prototype.sendCommand = function(c) {
    this.socket.emit('command', c);
};

GameScene.prototype.update = function(deltatime) {
    if (!this.ready_emit) {
        this.socket.emit('userReady');
        this.ready_emit = true;
    }
    console.log("match_id: "+this.match_id);
    console.log("player_id: "+this.player_id);
    if (!this.match_start) {return;};
    for (var it in players) players[it].update(deltatime);
    for (var it in obstacles) obstacles[it].update(deltatime);
};

GameScene.prototype.draw = function(context) {
    context.fillStyle = "#855C33";
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
    if (!this.match_start) {return;};
    //for (var it in players) players[it].draw(context);
    //for (var it in obstacles) obstacles[it].draw(context);
};
