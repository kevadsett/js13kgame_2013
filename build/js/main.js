// shim layer with setTimeout fallback
;window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function startGame(){
    window.game = new GameModel();
    game.initialiseViews();
    window.touchRadius = 42;
};

var GameModel = function() {
    console.log("New game initialised");
    
    this.levels = [];
    for(var i = 0; i < globalLevelData.levels.length; i++) {
        var newLevelModel = new LevelModel(globalLevelData.levels[i]);
        this.levels.push(newLevelModel);
    };

    this.currentLevelIndex = 0;
    this.currentLevel = this.levels[this.currentLevelIndex];
    
    this.player = new PlayerModel();
    
    var self = this;
    
    this.initialiseViews = function() {
        this.view = new GameView(this);
        this.view.level.initialise();
        this.view.loop();
    };
    
    this.activateSwitch = function(switchID) {
        if(self.currentLevel.switches[switchID]) {
            var connectedDoors = self.currentLevel.switches[switchID].connectedDoors;
            for(var i = 0; i < connectedDoors.length; i++) {
                var currentDoor = self.currentLevel.doors[connectedDoors[i]];
                currentDoor.position = currentDoor.position == "open" ? "closed" : "open";
            };
        };
    };
    
    this.onKeyPressed = function(characterString) {
        var numberPressed = parseInt(characterString) || -1;
        if(numberPressed != -1) {
            this.activateSwitch(numberPressed -1);
        } else {
            if(characterString == "u") {
                this.startNextLevel()
            }
        };
    };
    
    this.startNextLevel = function() {
        if(this.currentLevelIndex + 1 < this.levels.length) {
            this.currentLevelIndex++;
            this.currentLevel = this.levels[this.currentLevelIndex];
            this.player.reset();
            this.view.setupLevelView();
            this.view.level.initialise();
        }
    }
    
    this.checkLevelComplete = function() {
    }
};

var GameView = function(gameModel) {
    
    this.model = gameModel;
    
    this.initialise = function() {
        console.log("Initialising game view");
        var self = this;
        
        var canvas = document.getElementById('gameCanvas');
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext('2d');
        document.onkeypress = function(event){
            var charCode = event.which || event.keyCode;
            self.model.onKeyPressed(String.fromCharCode(charCode));
        };
        
        canvas.onclick = function(event) {
            var offsetX = canvas.offsetLeft;
            var clickedIndex = self.level.getClickedSwitch(event.clientX - offsetX, event.clientY);
            if (clickedIndex > -1) {
                var i = self.player.model.positionIndex;
                while (i != clickedIndex) {
                    if(i > clickedIndex) i--;
                    console.log("i: " + i + ", clickedIndex: " + clickedIndex);
                    console.log(self.level.model.doors[i].position);
                    if(self.level.model.doors[i].position == "closed") return;
                    if(i < clickedIndex) i++;
                }
                
                self.player.model.moveToPosition(self.level.switchPositions[clickedIndex] - 25, self.model.activateSwitch, clickedIndex);
            };
        };
        
        this.pixelSize = 5;
        this.player = new PlayerView(this.model.player);
        this.setupLevelView();
        
    };
    
    this.loop = (function() { 
        window.requestAnimFrame(this.loop, this);
        this.render();
    }).bind(this);
    
    this.render = function() {
        var levelNumberDiv = document.getElementById('levelNumber');
        levelNumberDiv.innerHTML = (this.model.currentLevelIndex + 1);
        this.context.clearRect(0, 0, this.width, this.height);
        this.level.render();
        this.player.render();
    };
    
    this.setupLevelView = function() {
        this.level = new LevelView(this.model.currentLevel);
    };
    
    this.initialise();
};

var LevelModel = function(levelData) {
    this.initialise = function(levelData) {
        this.switches = levelData.switches;
        this.doors = levelData.doors;
    }
    
    this.initialise(levelData);
};

var LevelView = function(model) {
    this.model = model;
    
    this.initialise = function() {
        this.doorPositions = [];
        this.switchPositions = [];
        for (var i = 0; i < this.model.doors.length; i++) {
            this.doorPositions.push(mapValue(i+1, 0, this.model.doors.length+1, 0, game.view.width));
        }
        for (var i = 0; i < this.model.switches.length; i++) {
            this.switchPositions.push(this.doorPositions[this.model.switches[i].position] - 50);
        }
    };
    
    this.getClickedSwitch = function(x, y) {
        for(var i = 0; i < this.switchPositions.length; i++) {
            currentX = this.switchPositions[i];
            if (currentX < (x + touchRadius) && currentX > (x - touchRadius)) {
                return i;
            };
        };
        return -1;
    };
    
    this.render = function() {
        var ctx = game.view.context;
        ctx.fillStyle = "#111111";
        
        for (var i = 0; i < this.model.doors.length; i++) {
            var currentDoor = this.model.doors[i];
            if(currentDoor.position == "closed"){
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.height);
            } else {
                ctx.fillRect(this.doorPositions[i], 0, game.view.pixelSize * 3, game.view.pixelSize * 3);
                ctx.fillRect(this.doorPositions[i], game.view.height - game.view.pixelSize * 3, game.view.pixelSize * 3, game.view.pixelSize * 3);
            };
        };
        for (var i = 0; i < this.model.switches.length; i++) {
            var currentSwitch = this.model.switches[i];
            ctx.fillRect(
                this.switchPositions[i] - (game.view.pixelSize * 2), 
                game.view.height/2 - game.view.pixelSize, 
                game.view.pixelSize * 4, 
                game.view.pixelSize * 2
            );
            ctx.fillRect(
                this.switchPositions[i] - game.view.pixelSize, 
                game.view.height/2- (game.view.pixelSize * 2), 
                game.view.pixelSize * 2, 
                game.view.pixelSize * 4
            );
        };
    };
    
};

var PlayerModel = function() {
    this.x = this.targetX = 50;
    this.width = 50;
    this.height = 160;
    this.moveSpeed = 10;
    this.moveDirection = "none";
    this.positionIndex = 0;
    
    new PlayerView(this);

    this.moveToPosition = function(newPosition, callback, switchIndex) {
        if(this.x < newPosition) this.moveDirection = "right";
        if(this.x > newPosition) this.moveDirection = "left";
        this.targetX = newPosition;
        this.destinationReachedCallback = callback;
        this.destinationReachedCallbackArgs = switchIndex;
        this.positionIndex = switchIndex;
    }
    
    this.reset = function() {
        this.x = 50;
        this.positionIndex = 0;
        this.moveDirection = "none";
    }
};

var PlayerView = function(model) {
    this.model = model;
    this.render = function() {
        if(this.model.moveDirection == "right") {
            if(this.model.x < this.model.targetX) {
                this.model.x += this.model.moveSpeed;
            } else {
                this.model.moveDirection = "none";
                this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else if(this.model.moveDirection == "left") {
            if(this.model.x > this.model.targetX) {
                this.model.x -= this.model.moveSpeed;
            } else {
                this.model.moveDirection = "none";
                this.model.destinationReachedCallback(this.model.destinationReachedCallbackArgs);
            }
        } else {
            // no movement
        }
        var ctx = game.view.context;
        ctx.fillStyle = "#444444";
        ctx.fillRect(this.model.x - this.model.width/2, game.view.height - this.model.height, this.model.width, this.model.height);
    }
};

function mapValue(value, low1, high1, low2, high2) {
    var range1 = high1 - low1;
    var range2 = high2 - low2;
    return ((value - low1) / range1 * range2 + low2);
};

var globalLevelData = {
    levels:[
        {
            switches:[
                {
                    connectedDoors: [0],
                    position: 0
                }
            ],
            doors:[
                {
                    position: "closed"
                }
            ]
        },
        {
            switches:[
                {
                    connectedDoors: [0, 1],
                    position: 0
                },
                {
                    connectedDoors: [0, 1],
                    position: 1
                }
            ],
            doors:[
                {
                    position: "closed"
                },
                {
                    position: "open"
                }
            ]
        },
        {
            switches:[
                {
                    connectedDoors: [0, 1, 2],
                    position: 0
                },
                {
                    connectedDoors: [1],
                    position: 1
                }
            ],
            doors:[
                {
                    position: "closed"
                },
                {
                    position: "open"
                },
                {
                    position: "closed"
                }
            ]
        },
        {
            switches:[
                {
                    connectedDoors: [1, 2],
                    position: 0
                },
                {
                    connectedDoors: [1],
                    position: 1
                }
            ],
            doors:[
                {
                    position: "open"
                },
                {
                    position: "closed"
                },
                {
                    position: "closed"
                }
            ]
        }
    ]
};