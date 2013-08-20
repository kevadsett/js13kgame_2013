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
        if(self.currentLevelIndex + 1 < self.levels.length) {
            self.currentLevelIndex++;
            self.currentLevel = self.levels[self.currentLevelIndex];
            self.player.reset();
            self.view.setupLevelView();
            self.view.level.initialise();
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
                while (i != clickedIndex && i < self.level.model.doors.length) {
                    if(i > clickedIndex) i--;
                    if(self.level.model.doors[i].position == "closed") return;
                    if(i < clickedIndex) i++;
                };
                if(clickedIndex < 99) {
                    self.player.model.moveToPosition(self.level.switchPositions[clickedIndex] - 25, self.model.activateSwitch, clickedIndex);
                } else {
                    console.log("You clicked on the stairs!");
                    self.player.model.moveToPosition(720, self.player.model.moveUpstairs, self.model.startNextLevel);
                };
            };
        };
        
        this.pixelSize = 4;
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