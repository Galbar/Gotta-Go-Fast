function GameScene (socket) {
    this.socket = socket;
    this.players = [];
    this.obstacles = [];
    this.ready_emit = false;
    this.match_start = false;

    this.socket.on('matchStart', function () {
       // Init players

       this.match_start = true; 
    });
}

GameScene.prototype.update = function(deltatime) {
    if (!this.ready_emit) {
        this.socket.emit('userReady');
        this.ready_emit = true;
    }
    if (!this.match_start) {return;};
    for (var it in players) players[it].update(deltatime);
    for (var it in obstacles) obstacles[it].update(deltatime);
};

GameScene.prototype.draw = function(context) {
    if (!this.match_start) {return;};
    context.fillStyle = "#855C33";
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
    //for (var it in players) players[it].draw(context);
    //for (var it in obstacles) obstacles[it].draw(context);
};
