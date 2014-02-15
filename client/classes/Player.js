var user = new Image();
userIMG.src = "img/user.png";

function Player (x,y,id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.width = 50;
	this.height = 100;
	this.image = userIMG;
}

Player.prototype.render = function(ctx) {
	ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

}

Player.prototype.updateWithPlayerData = function (data) {
	if (data === undefined) return;
	if (data.id !== undefined) this.id = data.id;
	if (data.x !== undefined) this.x = data.x;
	if (data.y !== undefined) this.y = data.y;
}