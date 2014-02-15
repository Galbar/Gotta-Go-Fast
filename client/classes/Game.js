var MAIN_SCENE = 0;
var MATCH_MAKING_SCENE = 1;
var GAME_SCENE = 2;

function Game () {
    // Control stuff
    this.clock = new Date();
    this.socket = io.connect(SERVER_IP+':'+SERVER_PORT);
    var self = this;
    this.socket.on('connect', function () {
        self.socket.id = self.socket.socket.sessionid;
    });

    // Canvas stuff
    this.canvas = document.getElementById("gameCanvas");
    this.context = this.canvas.getContext('2d');
    this.canvas.style.position = "relative";
    this.canvas.style.backgroundColor = 'white';
    this.canvas.style.display = "block";
    this.canvas.style.width = CANVAS_WIDTH+"px";
    this.canvas.style.height = CANVAS_HEIGHT+"px";
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.margin = "auto";
    
    // Stats stuff
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);

    // Game scenes
    this.scenes = [];
    this.current_scene;

    // Init stuff
    window.onresize = function (canvas) {
        canvas.style.top = (window.innerHeight/2 - CANVAS_HEIGHT/2)+"px";
    }
    window.onresize(this.canvas);

}

Game.prototype.update = function(deltatime) {
    if (this.scenes[this.current_scene].update(deltatime))
    {
        this.current_scene++;
        this.current_scene %= 3;
    }
};

Game.prototype.draw = function() {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.scenes[this.current_scene].draw(this.context);
};

Game.prototype._play = function() {
    this.stats.begin();
    var new_time = new Date();
    this.update(new_time-this.clock);
    this.clock = new_time;
    this.draw();
    this.stats.end();
};

Game.prototype.play = function() {
    // Do some stuff
    this.current_scene = MATCH_MAKING_SCENE;
    this.scenes[MATCH_MAKING_SCENE] = new MatchMakingScene(this.socket);
    this.scenes[GAME_SCENE] = new GameScene(this.socket);
    var self = this;
    requestAnimFrame(gameLoop);
};
