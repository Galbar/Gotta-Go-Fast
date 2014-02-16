
var ESPAI_MIN_OBS = 100;
var DESNIVELL_MAX = 200;

function Obstacle (id, width, randomGenerator) {
    this.x = CANVAS_HEIGHT;
    this.width = width;
    //Crec que amb aquest random anira be, s'ha de provar
    //this.height = Math.random()*(CANVAS_WIDTH-2*this.w)+this.w;
    this.speed = 3;
    this.sizeup = 10;
    this.sizedown = CANVAS_HEIGHT-10;
    this.randomGenerator = randomGenerator;
    this.id=id;
    this.color = '#'+Math.floor(randomGenerator()*16777215).toString(16);
}

Obstacle.prototype.generate = function(prev){

    this.x = CANVAS_WIDTH;
    this.color = '#'+Math.floor(this.randomGenerator()*16777215).toString(16);
    var factor =  this.randomGenerator();
    this.sizedown = Math.floor(factor * (prev.sizedown + DESNIVELL_MAX) + (1-factor) * (prev.sizedown - DESNIVELL_MAX));
    if (this.sizedown < 10+ESPAI_MIN_OBS) this.sizedown = 10+ESPAI_MIN_OBS;
    if (this.sizedown > CANVAS_HEIGHT-10) this.sizedown = CANVAS_HEIGHT-10;
    
    this.sizeup = Math.floor(factor * (prev.sizeup + DESNIVELL_MAX) + (1-factor) * (prev.sizeup - DESNIVELL_MAX));
    if (this.sizeup > CANVAS_HEIGHT-ESPAI_MIN_OBS-10) this.sizeup = CANVAS_HEIGHT-ESPAI_MIN_OBS-10;
    if (this.sizeup < 10) this.sizeup = 10;



}

Obstacle.prototype.update = function(dt, wspeed, obstacles) {
    var prev_id = this.id-1;
    if (prev_id < 0) prev_id = obstacles.length-1;
    if (this.x < -this.width) this.generate(obstacles[prev_id]);
    this.x += wspeed*dt;
}

Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,0,this.width,this.sizeup);
    ctx.fillRect(this.x,this.sizedown,this.width,CANVAS_HEIGHT);
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.fillText(this.id,this.x,CANVAS_HEIGHT);
}