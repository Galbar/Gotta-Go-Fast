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
	this.speedx = 550;
	this.speedy = -350;
	this.is_active = false;
	//this.image = userIMG;
}

Player.prototype.command = function (c) {
	if (c === 'U') this.vy = this.speedy;
	else if (c === 'L') this.vx = -this.speedx;
	else if (c === 'R') this.vx = this.speedx;
	else if (c === 'S') this.vx = 0;
}

Player.prototype.update = function(dt, wspeed, obstacles) {
	if (!this.is_active) {return;};
	var new_x = this.x + (this.vx+wspeed)*dt;
	var new_y = this.y + this.vy*dt;
	var new_vy = this.vy + 498*dt;

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

	// obs1 y obs2
	var id_r;
	var id_l;
	if (obs2 !== undefined) {
		id_r = (obs2.id+1)%obstacles.length;
	}
	if (obs1 !== undefined) {
		id_l = (obs1.id-1)%obstacles.length;
		if (id_l < 0) id_l = obstacles.length-1;
	}
	if (obs1 !== undefined && new_x < obs1.x && 
		(new_y+this.height > obstacles[id_l].sizedown || new_y < obstacles[id_l].sizeup)) {
		new_x = obs1.x;
	}
	if (obs2 !== undefined && new_x+this.width > obs2.x+obs2.width+(wspeed-1)*dt && 
		(new_y+this.height > obstacles[id_r].sizedown || new_y < obstacles[id_r].sizeup)) {
		new_x = obs2.x+obs2.width-this.width+(wspeed-2)*dt;
	}
	if (obs1 !== undefined && new_y+this.height > obs1.sizedown && this.x > obs1.x && this.x < obs1.x+obs1.width) {
		new_y = obs1.sizedown-this.height;
		new_vy = 0;
	}
	if (obs2 !== undefined && new_y+this.height > obs2.sizedown && this.x+this.width > obs2.x && this.x+this.width < obs2.x+obs2.width) {
		new_y = obs2.sizedown-this.height;
		new_vy = 0;
	}
	if (obs1 !== undefined && new_y < obs1.sizeup && this.x > obs1.x && this.x < obs1.x+obs1.width) {
		new_y = obs1.sizeup;
		new_vy = 0.001;
	}
	if (obs2 !== undefined && new_y < obs2.sizeup && this.x+this.width > obs2.x && this.x+this.width < obs2.x+obs2.width) {
		new_y = obs2.sizeup;
		new_vy = 0.001;
	}

	if (new_x < 0) {
		new_x = 0.1;
	}

	if (new_y > CANVAS_HEIGHT-this.height) {
		new_y = CANVAS_HEIGHT-this.height;
		new_vy = 0;
	}
	if (new_y < -this.width) {
		new_y = -this.width;
		new_vy = 0.001;
	}

	if (new_x > CANVAS_WIDTH) {
		new_x = CANVAS_WIDTH;
	}

	this.x = new_x;
	this.y = new_y;
	this.vy = new_vy;
}

Player.prototype.draw = function(ctx) {
	if (this.is_active) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}