var GameModel = function() {
    console.log("New game initialised");
    
    this.levels = [];
    var i,
        newLevelModel,
        self=this;
    for(i = 0; i < globalLevelData.levels.length; i++) {
        newLevelModel = new LevelModel(globalLevelData.levels[i]);
        this.levels.push(newLevelModel);
    };

    this.currentLevelIndex = 0;
    this.currentLevel = this.levels[this.currentLevelIndex];
    
    this.player = new PlayerModel();
    
    this.initialiseViews = function() {
        this.view = new GameView(this);
        this.view.level.initialise();
        this.view.loop();
    };
    
    this.activateSwitch = function(switchID) {
        if(self.currentLevel.switches[switchID]) {
            var connectedDoors = self.currentLevel.switches[switchID].connectedDoors,
                i,
                currentDoor;
            for(i = 0; i < connectedDoors.length; i++) {
                currentDoor = self.currentLevel.doors[connectedDoors[i]];
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
    
    this.resize = function() {
        console.log("Game resizing!");
        this.view.resize();
    }
},
GameView = function(gameModel) {
    
    this.model = gameModel;
    
    this.initialise = function() {
        console.log("Initialising game view");
        var self = this,
            canvas = document.getElementById('gameCanvas')
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext('2d');
        document.onkeypress = function(event){
            var charCode = event.which || event.keyCode;
            self.model.onKeyPressed(String.fromCharCode(charCode));
        };
        
        canvas.onclick = function(event) {
            var clickedIndex = self.level.getClickedSwitch(event.clientX, event.clientY),
                i = 0;
            if (clickedIndex > -1) {
                i = self.player.model.positionIndex;
                while (i != clickedIndex && i < self.level.model.doors.length) {
                    if(i > clickedIndex) i--;
                    if(self.level.model.doors[i].position == "closed") return;
                    if(i < clickedIndex) i++;
                };
                if(clickedIndex < 99) {
                    self.player.model.moveToPosition(self.level.switchPositions[clickedIndex] - self.height/8, self.model.activateSwitch, clickedIndex);
                } else {
                    self.player.model.moveToPosition(self.width - (self.width/7.7)/2, self.player.model.moveUpstairs, self.model.startNextLevel);
                };
            };
        };
        
        this.player = new PlayerView(this.model.player);
        this.setupLevelView();
        
    };
    
    this.loop = (function() { 
        window.requestAnimFrame(this.loop, this);
        this.render();
    }).bind(this);
    
    this.render = function() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.level.render();
        this.player.render();
        this.level.renderMask();
    };
    
    this.setupLevelView = function() {
        this.level = new LevelView(this.model.currentLevel);
    };
    
    this.resize = function() {
        console.log("Game view resizing");
        var canvas = document.getElementById('gameCanvas');
        this.prevWidth = this.width;
        this.prevHeight = this.height;
        this.height = canvas.height;
        this.width = canvas.width;
        this.pixelSize = canvas.height * 0.02;
        this.sizeMultiple = mapValue(game.view.pixelSize, 0, 4, 0, 1);
        this.level.resize();
        this.player.resize();
    };
    
    this.initialise();
};
