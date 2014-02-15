//var user = new Image();
//userIMG.src = "img/user.png";

function Player (id) {
	this.x;
	this.y;
	this.id = id;
    this.name;
	this.width = 50;
	this.height = 100;
    this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    this.vx = 0;
    this.vy = 0;
    this.speedx = 10;
    this.speedy = 3;
	//this.image = userIMG;
}

function command (c) {
    if (c === "U") this.vy = this.speedy;
    else if (c === "L") this.vx = -this.speedx;
    else if (c === "R") this.vx = this.speedx; 
}

Player.prototype.update = function(dt) {
    this.x += this.vx*dt;
    this.y += this.vy*dt;

    if (vy > 0) vy += -3*dt;
    if (vy < 0) vy = 0;

    if (this.y < 0) this.y = 0;

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