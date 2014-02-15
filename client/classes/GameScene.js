function update (dt) {
    for (var obj in players) players[obj].update(dt);
}

function draw (ctx) {
    for (var obj in players) players[obj].draw(ctx);
    for (var obj in obstacles) obstacles[obj].render(ctx);
}