
var ESPAI_MIN_OBS = 400;
var DESNIVELL_MAX = 200;

function Obstacle (id, width) {
    this.x = CANVAS_HEIGHT;
    this.width = width;
    this.speed = 3;
    this.sizeup = 10;
    this.sizedown = CANVAS_HEIGHT-10;
    this.id=id;
    this.color = '#'+Math.floor(randomGenerator()*16777215).toString(16);
}

Obstacle.prototype.update = function(dt, wspeed, obstacles, future) {
    this.x += wspeed*dt;
    if (this.x >= -this.width) {return;};
    this.x = CANVAS_WIDTH+this.x+this.width;
    this.sizeup = future.list[future.iterator].sizeup;
    this.sizedown = future.list[future.iterator].sizedown;
    this.color = future.list[future.iterator].color;
    future.iterator = (future.iterator+1)%future.list.length;
}

Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,0,this.width,this.sizeup);
    ctx.fillRect(this.x,this.sizedown,this.width,CANVAS_HEIGHT);
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.fillText(this.id,this.x,CANVAS_HEIGHT);
}