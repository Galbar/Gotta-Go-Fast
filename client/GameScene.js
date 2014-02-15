function Slot () {
    // Asigno una altura random
    this.x = Math.random()*(canvas.width-2*this.w)+this.w;
    this.y = 100;
    this.posx = canvas.height;
    this.posy = canvas.width;
}

function update (dt) {

}

function draw (ctx) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Poso 8 perque hi hagi 8 slots posibles en pantalla
    for (var i = 0; i < 8; ++i) {

    }


    for (var obj in players) players[obj].render(ctx);


}