
var ESPAI_MIN_OBS = 100;
var DESNIVELL_MAX = 300;

function Obstacle (id, width, randomGenerator) {
    this.x = CANVAS_HEIGHT;
    this.y = CANVAS_WIDTH;
    this.width = width;
    //Crec que amb aquest random anira be, s'ha de provar
    //this.height = Math.random()*(CANVAS_WIDTH-2*this.w)+this.w;
    this.color = "red";
    this.speed = 3;
    this.sizeup = 0;
    this.sizedown = CANVAS_HEIGHT;
    this.randomGenerator = randomGenerator;
    this.id=id;
}

Obstacle.prototype.generate = function(prev){

    this.x = CANVAS_HEIGHT;
    this.y = CANVAS_WIDTH;
    var y_max_bloc_down = CANVAS_HEIGHT;
    var y_min_bloc_down = prev.sizedown-DESNIVELL_MAX;
    if(y_min_bloc_down<0+ESPAI_MIN_OBS) y_min_bloc_down = 0+ESPAI_MIN_OBS;
    this.sizedown = Math.floor(this.randomGenerator()*(y_max_bloc_down-y_min_bloc_down+1)+y_min_bloc_down);
    
    var y_min_bloc_up = 0;
    var y_max_bloc_up = this.sizedown-ESPAI_MIN_OBS;
    this.sizeup = Math.floor(this.randomGenerator()*(y_max_bloc_up-y_min_bloc_up+1)+y_min_bloc_up);
    
}

Obstacle.prototype.update = function(dt, wspeed, obstacles) {
    this.x += wspeed*dt;
    if (this.x+this.width < 0) this.generate(obstacles[this.id%obstacles.length]);
}

Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
}
