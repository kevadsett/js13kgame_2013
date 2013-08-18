// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var GameModel = function() {
    var instance = GameModel.prototype;
    console.log("New game initialised");
    
    $.getJSON("data/levelData.json", function(data){
        instance.levelData = data.levels;
        instance.currentLevel = new LevelModel(instance.levelData[0]);
        instance.view = new GameView(instance);
        instance.view.level.initialise();
        instance.view.loop();
    });
}

var GameView = function(gameModel) {
    var instance = GameView.prototype;
    
    instance.model = gameModel;
    
    instance.initialise = function() {
        console.log("Initialising game view");
        
        var canvas = $('.gameCanvas')[0];
        instance.height = canvas.height;
        instance.width = canvas.width;
        instance.context = canvas.getContext('2d');
        this.level = new LevelView(this.model.currentLevel);
    }
    
    instance.loop = function() { 
        window.requestAnimFrame($.proxy(this.loop, this));
        this.context.clearRect(0, 0, this.height, this.width);
        this.render();
    }
    
    instance.render = function() {
        this.level.render();
        //this.player.render();
    }
    
    instance.initialise();
}

var LevelModel = function(levelData) {
    var instance = LevelModel.prototype;
    instance.initialise = function(levelData) {
        this.switches = levelData.switches;
        this.doors = levelData.doors;
    }
    
    instance.initialise(levelData);
}

var LevelView = function(model) {
    var instance = LevelView.prototype;
    instance.model = model;
    
    instance.initialise = function() {
        this.doorPositions = [];
        this.switchPositions = [];
        for (var i = 0; i < this.model.doors.length; i++) {
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, 0, game.view.width));
        }
        for (var i = 0; i < this.model.switches.length; i++) {
            this.switchPositions.push(this.doorPositions[this.model.switches[i].position] - 50);
        }
    }
    
    instance.render = function() {
        var ctx = game.view.context;
        ctx.fillStyle = "#111111";
        
        for (var i = 0; i < this.model.doors.length; i++) {
            var currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(this.doorPositions[i], 0, 10, game.view.height);
            } else {
                ctx.fillRect(this.doorPositions[i], 0, 10, 10);
                ctx.fillRect(this.doorPositions[i], game.view.height - 10, 10, 10);
            }
        }
        for (var i = 0; i < this.model.switches.length; i++) {
            var currentSwitch = this.model.switches[i];
            
            ctx.beginPath();
            ctx.arc(this.switchPositions[i], game.view.height/2, 10, 0, 2*Math.PI);
            ctx.fill();
        }
    }
    
}

var PlayerView = function() {
}

$(document).ready(function() {
    window.game = new GameModel();
});

function mapValue(value, low1, high1, low2, high2) {
    var range1 = high1 - low1;
    var range2 = high2 - low2;
    return ((value - low1) / range1 * range2 + low2);
}