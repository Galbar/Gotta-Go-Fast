function Obstacle () {
    this.x = canvas.height;
    this.y = canvas.width;
    this.width = 100;
    //Crec que amb aquest random anira be, s'ha de provar
    this.height = Math.random()*(canvas.width-2*this.w)+this.w;
    this.color = "red";
    this.speed = 3;
    this.sizeup = 0;
    this.sizedown = 0;
}

Obstacle.prototype.generar = function(prev){
    
}
Obstacle.prototype.update = function(dt) {
    this.x += -this.speed*dt;
}
Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
}