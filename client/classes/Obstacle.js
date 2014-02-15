function Obstacle (randomGenerator) {
    this.x = canvas.height;
    this.y = canvas.width;
    this.width = 100;
    //Crec que amb aquest random anira be, s'ha de provar
    this.height = Math.random()*(canvas.width-2*this.w)+this.w;
    this.color = "red";
    this.randomGenerator = randomGenerator;
}

Obstacle.prototype.update = function(dt, wspeed) {
    this.x += wspeed*dt;
    if (this.x < 0) this.generar();
}

Obstacle.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
}
