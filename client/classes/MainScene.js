function MainScene (socket) {
    this.socket = socket;
    this.kb = new KeyboardJS(false);

    var self = this;
}

MainScene.prototype.update = function(dt) {
    if (this.kb.keys[13])
        return true;
    else
        return false;
};

MainScene.prototype.draw = function(context) {
    context.font = "bold 70px Arial";
    context.fillStyle = "black";
    context.fillText("Gotta Go Fast",275,(CANVAS_HEIGHT/2)-50);
    context.font = "bold 30px Arial";
    context.fillText("Press [Enter] to play!",360,(CANVAS_HEIGHT/2)+50);
};