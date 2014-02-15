//var user = new Image();
//userIMG.src = "img/user.png";

function Player (id, n) {
	this.x;
	this.y;
	this.id = id;
    this.name;
	this.width = 50;
	this.height = 50;
    this.color = '#'+Math.floor(n*16777215).toString(16);
    this.vx = 0;
    this.vy = 0;
    this.speedx = 100;
    this.speedy = -100;
	//this.image = userIMG;
}

Player.prototype.command = function (c) {
    this.vx = 0;
    if (c === 'U') this.vy = this.speedy;
    else if (c === 'L') this.vx = -this.speedx;
    else if (c === 'R') this.vx = this.speedx;
    //else if (c === 'S') this.vx = 0;
}

Player.prototype.update = function(dt) {
    this.x += this.vx*dt;
    this.y += this.vy*dt;

    this.vy += 70*dt;

    if (this.y > 450) {
        this.y = 450;
        this.vy = 0;
    }
}

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
}