function Game (size) {
	this.size=size;
	this.players= [];
    this.commands=[];
    this.is_active=false;
    for (var i = 0; i < size; i++) {
        this.commands[i] = "S";
    };

}

module.exports = Game;