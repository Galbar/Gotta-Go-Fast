function Player (x,y,id) {
	this.x = x;
	this.y = y;
	this.id = id;
}


Player.prototype = {
	w: 50,
	h: 100
}

Player.prototype.render = function(ctx) {
}