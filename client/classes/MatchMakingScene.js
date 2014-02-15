function MatchMakingScene (socket) {
    this.socket = socket;
    this.match_found = false;
    this.register_emit = false;
    this.ok_register = false;

    var self = this;
    this.socket.on('ok_register', function () {
        self.ok_register = true;
    });

    this.socket.on('matchFound', function () {
        self.match_found = true; 
    });
}

MatchMakingScene.prototype.update = function(deltatime) {
    if (!this.register_emit) {
        this.socket.emit('userRegister');
        this.register_emit = true;
    };
    return this.match_found;
};

MatchMakingScene.prototype.draw = function(context) {
    context.font="15px Courier";
    if (this.register_emit) {
        context.fillText("Registering on server...",50,50);
    };
    if (this.ok_register) {
        context.fillText("Done.",50,67);
        context.fillText("Waiting for match...",50,84);
    };
    if (this.match_found) {
        context.fillText("Match found!",50,101);
    };
};
