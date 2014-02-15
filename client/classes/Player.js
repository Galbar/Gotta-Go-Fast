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
	this.speedx = 300;
	this.speedy = -500;
	this.is_active = false;
	//this.image = userIMG;
}

Player.prototype.command = function (c) {
	this.vx = 0;
	if (c === 'U') this.vy = this.speedy;
	else if (c === 'L') this.vx = -this.speedx;
	else if (c === 'R') this.vx = this.speedx;
	//else if (c === 'S') this.vx = 0;
}

Player.prototype.update = function(dt, wspeed, obstacles) {
	this.x += (this.vx+wspeed)*dt;
	this.y += this.vy*dt;

	this.vy += 500*dt;

	var obs1 = undefined;
	var obs2 = undefined;
	for (var it in obstacles) {
		if (obs1 !== undefined && obs2 !== undefined) break;
		var obs = obstacles[it];
		if (obs1 === undefined && this.x >= obs.x && this.x <= obs.x+obs.width) {
			obs1 = obs;
		}
		if (obs2 === undefined && this.x+this.width >= obs.x && this.x+this.width <= obs.x+obs.width) {
			obs2 = obs;
		}
	}

	if (obs1.sizeup > this.y) {
		// Colision arriba a la izquierda
		this.x = obs1.sizeup;
	}
	else if (obs1.sizedown < this.y+this.height) {
		// Colision abajo a la izquierda
		this.x = obs1.sizedown-this.height;
	}

	if (obs2.sizeup > this.y) {
		// Colision arriba a la derecha
		this.x = obs2.sizeup;
	}
	else if (obs2.sizedown < this.y+this.height) {
		// Colision abajo a la derecha
		this.x = obs2.sizedown-this.height;
	}
}

Player.prototype.draw = function(ctx) {
	if (this.is_active) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = "black";
		ctx.font = "10px Arial";
		ctx.fillText(this.name,this.x-20,this.y-10);
	}
}

Player.prototype.collision = function(obstacle) {

}