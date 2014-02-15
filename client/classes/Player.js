//var user = new Image();
//userIMG.src = "img/user.png";

function Player (x,y,id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.width = 50;
	this.height = 100;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    this.vx = 0;
    this.vy = 0;
    this.speed = 10;
	//this.image = userIMG;
}

Player.prototype.update = function(dt) {
    // W
    if (e.keyCode === 87) this.y += -this.speed*dt;
    // A
    if (e.keyCode === 65) this.x += -this.speed*dt;
    // S
    if (e.keyCode === 83) this.y += this.speed*dt;
    // D
    if (e.keyCode === 68) this.x += this.speed*dt;
}

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}

document.addEventListener("keydown", function(e) {
    console.log(e.keyCode)
});