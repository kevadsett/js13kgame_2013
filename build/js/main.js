// shim layer with setTimeout fallback
;window.requestAnimFrame = (function(){
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
    
    instance.onKeyPressed = function(chararcterString) {
        var numberPressed = parseInt(chararcterString) || -1;
        if(numberPressed != -1) {
            if(this.currentLevel.switches[numberPressed - 1]) {
                var connectedDoors = this.currentLevel.switches[numberPressed - 1].connectedDoors;
                for(var i = 0; i < connectedDoors.length; i++) {
                    var currentDoor = this.currentLevel.doors[connectedDoors[i]];
                    currentDoor.position = currentDoor.position == "open" ? "closed" : "open";
                };
            };
        };
    };
    
};

var GameView = function(gameModel) {
    var instance = GameView.prototype;
    
    instance.model = gameModel;
    
    instance.initialise = function() {
        console.log("Initialising game view");
        
        var canvas = $('.gameCanvas')[0];
        instance.height = canvas.height;
        instance.width = canvas.width;
        instance.context = canvas.getContext('2d');
        $(document).on('keypress', $.proxy(function(event){
            var charCode = event.which || event.keyCode;
            this.model.onKeyPressed(String.fromCharCode(charCode));
        }, this));
        
        instance.pixelSize = 5;
        this.level = new LevelView(this.model.currentLevel);
    }
    
    instance.loop = function() { 
        window.requestAnimFrame($.proxy(this.loop, this));
        this.render();
    }
    
    instance.render = function() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.level.render();
        //this.player.render();
    }
    
    instance.initialise();
};

var LevelModel = function(levelData) {
    var instance = LevelModel.prototype;
    instance.initialise = function(levelData) {
        this.switches = levelData.switches;
        this.doors = levelData.doors;
    }
    
    instance.initialise(levelData);
};

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
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.height);
            } else {
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(this.doorPositions[i], game.view.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            }
        }
        for (var i = 0; i < this.model.switches.length; i++) {
            var currentSwitch = this.model.switches[i];
            ctx.fillRect(
                this.switchPositions[i] - game.view.pixelSize, 
                game.view.height/2 - (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize
            );
            ctx.fillRect(
                this.switchPositions[i] - (game.view.pixelSize * 2), 
                game.view.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize
            );
            ctx.fillRect(
                this.switchPositions[i] - (game.view.pixelSize * 2), 
                game.view.height/2, 
                game.view.pixelSize * 4, 
                game.view.pixelSize
            );
            ctx.fillRect(
                this.switchPositions[i] - game.view.pixelSize, 
                game.view.height/2 + game.view.pixelSize, 
                game.view.pixelSize * 2, 
                game.view.pixelSize
            );
        }
    }
    
};

var PlayerView = function() {
};

$(document).ready(function() {
    window.game = new GameModel();
});

function mapValue(value, low1, high1, low2, high2) {
    var range1 = high1 - low1;
    var range2 = high2 - low2;
    return ((value - low1) / range1 * range2 + low2);
}