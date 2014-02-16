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
	while (this.color === '#FFFFFF')
	{
		this.color = '#'+Math.floor(n*16777215).toString(16);	
	}
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

	var dist_y;
	var pos_y;
	var vel_y = 0.001;
	var dist_x;
	if (obs1 !== undefined) {
		if (obs1.sizeup > this.y) {
			// Colision arriba a la izquierda
			dist_y = Math.abs(this.y - obs1.sizeup);
			pos_y = obs1.sizeup;
		}
		else if (obs1.sizedown < this.y+this.height) {
			// Colision abajo a la izquierda
			dist_y = Math.abs(obs1.sizedown-this.height);
			pos_y = obs1.sizedown-this.height;
			vel_y = 0;
		}
	}

	if (obs2 !== undefined) {
		if (obs2.sizeup > this.y) {
			// Colision arriba a la derecha
			if (dist_y === undefined || dist_y > Math.abs(this.y - obs2.sizeup)) {
				dist_y = Math.abs(this.y - obs2.sizeup);
				pos_y = obs2.sizeup;
			}
		}
		else if (obs2.sizedown < this.y+this.height) {
			// Colision abajo a la derecha
			if (dist_y === undefined || dist_y > Math.abs(this.y - obs2.sizeup)) {
				dist_y = Math.abs(obs2.sizedown-this.height);
				pos_y = obs2.sizedown-this.height;
				vel_y = 0;
			}
		}
		if (pos_y !== undefined) {
			this.y = pos_y;
			this.vy = vel_y;
		}
	}

	if (this.y > CANVAS_HEIGHT-this.height) {
		this.y = CANVAS_HEIGHT-this.height;
		this.vy = 0;
	}
	if (this.x < 0) {
		this.x = 0;
	}
}

Player.prototype.draw = function(ctx) {
	if (this.is_active) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}