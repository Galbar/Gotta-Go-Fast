var ESPAI_MIN_OBS = 100;
var DESNIVELL_MAX = 300;

function Obstacle () {
    this.x = canvas.height;
    this.y = canvas.width;
    this.width = 100;
    //Crec que amb aquest random anira be, s'ha de provar
    //this.height = Math.random()*(canvas.width-2*this.w)+this.w;
    this.color = "red";
    this.speed = 3;
    this.sizeup = 0;
    this.sizedown = 0;
}

Obstacle.prototype.generar = function(prev){
    var y_min_bloc_up = prev.sizeup-DESNIVELL_MAX;
    var y_max_bloc_up = prev.sizeup+DESNIVELL_MAX;

    this.sizeup = Math.floor(rand_num1*(y_max_bloc_up-y_min_bloc_up+1)+y_min_bloc_up);


    var y_min_bloc_down = ESPAI_MIN_OBS
    var mida_bloc_max_down = ESPAI_MIN_OBS_FINAL+this.sizeup-canvas.height;

    this.sizedown = this.sizeup+ESPAI_MIN_OBS_FINAL


    var y_min_bloc_down = 0;
    var y_max_bloc_down; = prev.sizedown + DESNIVELL_MAX;
    if(y_max_bloc_down)
}
Obstacle.prototype.update = function(dt) {
    this.x += -this.speed*dt;
}
Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);

}